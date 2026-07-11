"use client";

import { useMemo, useRef, useState } from "react";
import type { Persona } from "@anime-forge/config";
import {
  CLASSES,
  ELEMENTS,
  EYES,
  FACES,
  HAIRS,
  PALETTES,
  RARITY_FRAME,
  RARITY_TABLE,
  emptyDraft,
  forgeCard,
  trackForge,
  type CharacterDraft,
  type ForgedCard,
  type FaceId,
  type HairId,
  type EyesId,
  type PaletteId,
  type ElementId,
  type ClassId,
} from "../lib/forge";
import { useLocale, useT } from "../lib/i18n";
import { AvatarSvg } from "./AvatarSvg";
import { Photocard } from "./Photocard";

type Props = {
  archetypes: Persona[];
  appName: string;
  disclaimer: string;
  shareHooks: string[];
};

type Phase = "intro" | "wizard" | "reveal" | "result";

const STEPS = 6;

const ARCANA_DIAMOND = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="af-arcana-diamond">
    <defs>
      <linearGradient id="afArcDeck" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#22d3ee" />
        <stop offset="1" stopColor="#c44dff" />
      </linearGradient>
    </defs>
    <path d="M12 1 L23 12 L12 23 L1 12 Z" fill="url(#afArcDeck)" />
  </svg>
);

const SHARE_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const SPARKLE_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" />
  </svg>
);

function ChipGrid<T extends string>({
  options,
  value,
  onChange,
  locale,
}: {
  options: { id: T; label: { pt: string; en: string }; color?: string }[];
  value: T;
  onChange: (id: T) => void;
  locale: "pt" | "en";
}) {
  return (
    <div className="af-chip-grid" role="listbox">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="option"
          aria-selected={value === o.id}
          className={`af-chip ${value === o.id ? "on" : ""}`}
          style={o.color ? { ["--chip" as string]: o.color } : undefined}
          onClick={() => onChange(o.id)}
        >
          {locale === "en" ? o.label.en : o.label.pt}
        </button>
      ))}
    </div>
  );
}

/** export DOM node → PNG via SVG foreignObject + canvas (zero deps) */
async function downloadNodeAsPng(node: HTMLElement, filename: string): Promise<void> {
  const width = 360;
  const height = 640;
  const clone = node.cloneNode(true) as HTMLElement;
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.maxWidth = "none";
  clone.style.margin = "0";
  clone.style.transform = "none";
  clone.style.animation = "none";

  const serializer = new XMLSerializer();
  const xhtml = serializer.serializeToString(clone);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;font-family:Outfit,system-ui,sans-serif;background:#0b0614;">
      ${xhtml}
    </div>
  </foreignObject>
</svg>`;

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("img"));
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.scale(2, 2);
    ctx.fillStyle = "#0b0614";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    await new Promise<void>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (!b) {
          reject(new Error("blob"));
          return;
        }
        const a = document.createElement("a");
        const href = URL.createObjectURL(b);
        a.href = href;
        a.download = filename;
        a.click();
        setTimeout(() => URL.revokeObjectURL(href), 2000);
        resolve();
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function AnimaDeckApp({ archetypes, appName, disclaimer, shareHooks }: Props) {
  const [locale, setLocale] = useLocale();
  const t = useT(locale);
  const en = locale === "en";

  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CharacterDraft>(() => emptyDraft());
  const [card, setCard] = useState<ForgedCard | null>(null);
  const [shareNote, setShareNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revealTick, setRevealTick] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const progress = useMemo(() => {
    if (phase === "intro") return 0;
    if (phase === "wizard") return ((step + 1) / STEPS) * 80;
    if (phase === "reveal") return 90;
    return 100;
  }, [phase, step]);

  const pName = (p: Persona) => (en && p.en ? p.en.displayName : p.displayName);
  const pStarter = (p: Persona) => (en && p.en ? p.en.starter : p.starter);

  function patch(partial: Partial<CharacterDraft>) {
    setDraft((d) => ({ ...d, ...partial }));
    setError(null);
  }

  function start() {
    setDraft(emptyDraft());
    setCard(null);
    setShareNote(null);
    setError(null);
    setStep(0);
    setPhase("wizard");
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (!draft.archetypeId || !draft.name.trim()) {
        setError(draft.archetypeId ? t("needName") : t("needArchetype"));
        return false;
      }
    }
    if (step === 5) {
      if (!draft.power.trim() || !draft.catchphrase.trim()) {
        setError(t("needPower"));
        return false;
      }
    }
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    if (step + 1 >= STEPS) {
      doForge();
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    setError(null);
    if (step === 0) {
      setPhase("intro");
      return;
    }
    setStep((s) => s - 1);
  }

  function doForge() {
    const forged = forgeCard(draft);
    trackForge();
    setCard(forged);
    setRevealTick((n) => n + 1);
    setPhase("reveal");
    // curto WOW → result (respeita reduced-motion via CSS; timeout ainda avança)
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => setPhase("result"),
      reduced ? 80 : 900,
    );
  }

  async function shareCard() {
    if (!card) return;
    const rar = RARITY_TABLE.find((r) => r.id === card.rarity);
    const rarLabel = rar ? (en ? rar.label.en : rar.label.pt) : card.rarity;
    const hook = en
      ? `Forged my photocard on ${appName}: ${card.name} — ${rarLabel} ${card.serial}`
      : (shareHooks[0]
          ?.replace("{rarity}", rarLabel)
          ?.replace("{persona}", card.name) ??
        `Forjei minha photocard no ${appName}: ${card.name} — ${rarLabel}`);
    const text = [
      hook,
      `“${card.catchphrase}”`,
      `#anime #photocard #${card.rarity}`,
      "deck.gbbragadev.com",
    ].join("\n");

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: appName, text });
        setShareNote(t("shared"));
        return;
      }
    } catch {
      /* cancel / fallback */
    }

    try {
      await navigator.clipboard.writeText(text);
      setShareNote(t("copied"));
    } catch {
      setShareNote(t("copyManual"));
    }
  }

  async function downloadCard() {
    if (!cardRef.current || !card) return;
    try {
      const safe = card.name.replace(/[^\w\-]+/g, "_").slice(0, 24) || "card";
      await downloadNodeAsPng(cardRef.current, `anima-deck-${safe}-${card.serial.replace("#", "")}.png`);
      setShareNote(t("dlOk"));
    } catch {
      setShareNote(t("dlFail"));
    }
  }

  const header = (
    <header className="af-hero">
      <div className="af-hero-top">
        <span className="af-brandmark af-brandmark-sm">
          {ARCANA_DIAMOND}
          ARCANA
        </span>
        <div className="af-lang" role="group" aria-label="Idioma / Language">
          <button
            type="button"
            className={locale === "pt" ? "on" : ""}
            aria-pressed={locale === "pt"}
            onClick={() => setLocale("pt")}
          >
            PT
          </button>
          <button
            type="button"
            className={locale === "en" ? "on" : ""}
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </div>
      </div>
      <h1>{appName}</h1>
      <p>{t("heroSub")}</p>
    </header>
  );

  const seal = (
    <p className="af-seal-row">
      <span className="af-seal">by @otaku_sincero69</span>
    </p>
  );

  if (phase === "intro") {
    return (
      <>
        {header}
        <section className="af-panel af-quiz-intro">
          <span className="af-episode-badge af-mono-badge">
            <span className="af-dot" />
            {t("episodeBadge")}
          </span>
          <div className="af-manga-scene">
            <span className="af-sparkle af-sparkle--1" aria-hidden="true">
              {SPARKLE_ICON}
            </span>
            <span className="af-sparkle af-sparkle--2" aria-hidden="true">
              {SPARKLE_ICON}
            </span>
            <span className="af-sparkle af-sparkle--3" aria-hidden="true">
              {SPARKLE_ICON}
            </span>
            <AvatarSvg face="oval" hair="spiky" eyes="glow" palette="sakura" uid="intro" className="af-silhouette" />
          </div>
          <h2>{en ? "Photocard Forge" : "Forja de Photocard"}</h2>
          <p className="af-lead">{t("lead")}</p>

          <div className="af-rarity-table" aria-label={t("rarityTable")}>
            <p className="af-kicker af-mono-badge">{t("rarityTable")}</p>
            <ul>
              {RARITY_TABLE.map((r) => (
                <li key={r.id} data-rarity={r.id}>
                  <span>{en ? r.label.en : r.label.pt}</span>
                  <span className="af-mono-badge">{r.weight}%</span>
                </li>
              ))}
            </ul>
          </div>

          <button type="button" className="af-btn-primary" onClick={start}>
            {t("start")}
          </button>
        </section>
        {seal}
        <p className="af-disclaimer">{en ? t("disclaimerEn") : disclaimer}</p>
      </>
    );
  }

  if (phase === "reveal" && card) {
    const rar = RARITY_TABLE.find((r) => r.id === card.rarity)!;
    const frame = RARITY_FRAME[card.rarity];
    return (
      <>
        {header}
        <section
          className="af-panel af-reveal"
          key={revealTick}
          data-rarity={card.rarity}
          style={{ ["--reveal-glow" as string]: frame.glow }}
        >
          <p className="af-kicker af-mono-badge">{t("rarityReveal")}</p>
          <h2 className={`af-reveal-rarity af-reveal-rarity--${card.rarity}`}>
            {en ? rar.label.en : rar.label.pt}
          </h2>
          <p className="af-lead af-mono-badge">{card.serial}</p>
          <p className="af-forging">{t("forging")}</p>
        </section>
      </>
    );
  }

  if (phase === "result" && card) {
    return (
      <>
        {header}
        <div className="af-progress" aria-hidden>
          <div className="af-progress-bar" style={{ width: "100%" }} />
        </div>
        <Photocard
          ref={cardRef}
          card={card}
          locale={locale}
          labels={{
            yourCard: t("yourCard"),
            serial: t("serial"),
            element: t("element"),
            class: t("class"),
            power: t("powerLabel"),
            watermark: t("watermark"),
          }}
        />
        <div className="af-actions">
          <button type="button" className="af-btn-primary" onClick={shareCard}>
            {SHARE_ICON}
            {t("share")}
          </button>
          <button type="button" className="af-btn-ghost" onClick={downloadCard}>
            {t("download")}
          </button>
          <button type="button" className="af-btn-ghost" onClick={start}>
            {t("redo")}
          </button>
        </div>
        {shareNote && (
          <p className="af-share-note" role="status">
            {shareNote}
          </p>
        )}
        {seal}
        <p className="af-disclaimer">{en ? t("disclaimerEn") : disclaimer}</p>
      </>
    );
  }

  // —— wizard ——
  const stepTitles = [
    t("identity"),
    t("appearance"),
    t("palette"),
    t("element"),
    t("class"),
    t("powerStep"),
  ];

  return (
    <>
      {header}
      <div className="af-topbar">
        <div className="af-scene-head">
          <span className="af-scene-label">{t("step")}</span>
          <span className="af-scene-num">{String(step + 1).padStart(2, "0")}</span>
          <span className="af-scene-total">/ {String(STEPS).padStart(2, "0")}</span>
        </div>
        <button type="button" className="af-btn-ghost af-btn-sm" onClick={() => setPhase("intro")}>
          {t("exit")}
        </button>
      </div>
      <div
        className="af-progress"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={STEPS}
      >
        <div className="af-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <section className="af-panel af-panel--scene">
        <h2 className="af-q">{stepTitles[step]}</h2>

        {step === 0 && (
          <>
            <div className="af-arch-pick">
              {archetypes.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`af-arch-option ${draft.archetypeId === a.id ? "on" : ""}`}
                  style={{ ["--chip" as string]: a.color ?? "#ff4d9a" }}
                  onClick={() => patch({ archetypeId: a.id })}
                >
                  <span className="af-arch-dot">{pName(a).charAt(0)}</span>
                  <span>
                    <strong>{pName(a)}</strong>
                    <small>{pStarter(a)}</small>
                  </span>
                </button>
              ))}
            </div>
            <label className="af-field">
              <span>{t("nameLabel")}</span>
              <input
                type="text"
                maxLength={28}
                placeholder={t("namePh")}
                value={draft.name}
                onChange={(e) => patch({ name: e.target.value })}
                autoComplete="off"
              />
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <div className="af-preview-row">
              <AvatarSvg
                face={draft.face}
                hair={draft.hair}
                eyes={draft.eyes}
                palette={draft.palette}
                element={draft.element}
                uid="wiz"
                className="af-preview-avatar"
              />
              <p className="af-kicker af-mono-badge">{t("preview")}</p>
            </div>
            <p className="af-field-label">{t("face")}</p>
            <ChipGrid
              options={FACES}
              value={draft.face}
              onChange={(id: FaceId) => patch({ face: id })}
              locale={locale}
            />
            <p className="af-field-label">{t("hair")}</p>
            <ChipGrid
              options={HAIRS}
              value={draft.hair}
              onChange={(id: HairId) => patch({ hair: id })}
              locale={locale}
            />
            <p className="af-field-label">{t("eyes")}</p>
            <ChipGrid
              options={EYES}
              value={draft.eyes}
              onChange={(id: EyesId) => patch({ eyes: id })}
              locale={locale}
            />
          </>
        )}

        {step === 2 && (
          <>
            <div className="af-preview-row">
              <AvatarSvg
                face={draft.face}
                hair={draft.hair}
                eyes={draft.eyes}
                palette={draft.palette}
                element={draft.element}
                uid="pal"
                className="af-preview-avatar"
              />
            </div>
            <ChipGrid
              options={PALETTES}
              value={draft.palette}
              onChange={(id: PaletteId) => patch({ palette: id })}
              locale={locale}
            />
          </>
        )}

        {step === 3 && (
          <ChipGrid
            options={ELEMENTS}
            value={draft.element}
            onChange={(id: ElementId) => patch({ element: id })}
            locale={locale}
          />
        )}

        {step === 4 && (
          <ChipGrid
            options={CLASSES}
            value={draft.classId}
            onChange={(id: ClassId) => patch({ classId: id })}
            locale={locale}
          />
        )}

        {step === 5 && (
          <>
            <label className="af-field">
              <span>{t("powerLabel")}</span>
              <input
                type="text"
                maxLength={48}
                placeholder={t("powerPh")}
                value={draft.power}
                onChange={(e) => patch({ power: e.target.value })}
              />
            </label>
            <label className="af-field">
              <span>{t("phraseLabel")}</span>
              <input
                type="text"
                maxLength={80}
                placeholder={t("phrasePh")}
                value={draft.catchphrase}
                onChange={(e) => patch({ catchphrase: e.target.value })}
              />
            </label>
          </>
        )}

        {error && (
          <p className="af-error" role="alert">
            {error}
          </p>
        )}

        <div className="af-wizard-nav">
          <button type="button" className="af-btn-ghost" onClick={goBack}>
            {t("back")}
          </button>
          <button type="button" className="af-btn-primary af-btn-inline" onClick={goNext}>
            {step + 1 >= STEPS ? t("forge") : t("next")}
          </button>
        </div>
      </section>
      <p className="af-disclaimer">{en ? t("disclaimerEn") : disclaimer}</p>
    </>
  );
}
