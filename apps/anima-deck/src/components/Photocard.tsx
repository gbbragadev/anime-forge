"use client";

import { forwardRef, type CSSProperties } from "react";
import type { Locale } from "@anime-forge/config";
import {
  type ForgedCard,
  CLASSES,
  ELEMENTS,
  RARITY_FRAME,
  RARITY_TABLE,
  labelOf,
  rarityLabel,
  type ElementId,
  type ClassId,
  type RarityId,
} from "../lib/forge";
import { AvatarSvg } from "./AvatarSvg";

type Props = {
  card: ForgedCard;
  locale: Locale;
  labels: {
    yourCard: string;
    serial: string;
    element: string;
    class: string;
    power: string;
    watermark: string;
  };
};

/* —— glifos SVG inline (zero deps) —— */

const ELEMENT_PATHS: Record<ElementId, string> = {
  fire: "M12 2 C14 6 18 8 18 13 C18 17 15 21 12 22 C9 21 6 17 6 13 C6 10 8 8 10 9 C10 6 11 4 12 2 Z",
  water: "M12 2 C16 8 19 12 19 16 C19 19 16 22 12 22 C8 22 5 19 5 16 C5 12 8 8 12 2 Z",
  wind: "M3 8 H13 C16 8 17 5 14 4 M3 13 H18 C20 13 21 11 18 10 M3 18 H11 C13 18 14 16 12 15",
  shadow: "M16 3 A10 10 0 1 0 16 21 A8 8 0 1 1 16 3 Z",
  light: "M12 7 A5 5 0 1 0 12 17 A5 5 0 1 0 12 7 Z",
};

const ELEMENT_RAYS: Record<ElementId, string> = {
  fire: "",
  water: "",
  wind: "",
  shadow: "",
  light:
    "M12 1 V3 M21 12 H23 M12 21 V23 M1 12 H3 M18.5 5.5 L20 4 M18.5 18.5 L20 20 M5.5 18.5 L4 20 M5.5 5.5 L4 4",
};

function ElementGlyph({ element, color }: { element: ElementId; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="af-pc-glyph" aria-hidden="true">
      <path d={ELEMENT_PATHS[element]} fill={color} opacity="0.9" />
      {ELEMENT_RAYS[element] && (
        <path d={ELEMENT_RAYS[element]} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}

/* sigilos de classe — formas geométricas abstratas, originais */
const CLASS_SIGIL: Record<ClassId, string> = {
  guardian: "M12 2 L20 5 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V5 Z",
  oracle: "M12 2 L22 12 L12 22 L2 12 Z",
  duelist: "M4 4 L12 8 L20 4 L16 12 L20 20 L12 16 L4 20 L8 12 Z",
  artificer: "M12 2 L20 7 V17 L12 22 L4 17 V7 Z",
  summoner: "M12 2 A10 10 0 1 0 12 22 A10 10 0 1 0 12 2 Z",
  messenger: "M3 12 L21 4 L15 21 L12 13 Z",
};

function ClassSigil({ classId, color }: { classId: ClassId; color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="af-pc-sigil" aria-hidden="true">
      <path d={CLASS_SIGIL[classId]} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={CLASS_SIGIL[classId]} fill={color} opacity="0.18" />
      <circle cx="12" cy="12" r="2.2" fill={color} />
    </svg>
  );
}

/* tier de poder — cosmético, determinístico pelo nome + boost por raridade */
const RARITY_BOOST: Record<RarityId, number> = {
  common: 0,
  uncommon: 3,
  rare: 7,
  epic: 11,
  legendary: 16,
};

function powerTier(name: string, rarity: RarityId): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const base = 58 + (h % 26); // 58–83
  return Math.min(99, base + RARITY_BOOST[rarity]);
}

/** Photocard 9:16 — holofoil, stage, glifo elemental, sigilo, tier, REC/scanlines */
export const Photocard = forwardRef<HTMLDivElement, Props>(function Photocard(
  { card, locale, labels },
  ref,
) {
  const frame = RARITY_FRAME[card.rarity];
  const el = labelOf(ELEMENTS, card.element, locale);
  const cls = labelOf(CLASSES, card.classId, locale);
  const rar = rarityLabel(card.rarity, locale);
  const elColor = ELEMENTS.find((e) => e.id === card.element)?.color ?? frame.accent;
  const tier = powerTier(card.name, card.rarity);
  const rarRow = RARITY_TABLE.find((r) => r.id === card.rarity)!;
  const stars = rarRow.weight <= 6 ? 5 : rarRow.weight <= 12 ? 4 : rarRow.weight <= 25 ? 3 : rarRow.weight <= 55 ? 2 : 1;

  return (
    <div
      ref={ref}
      className={`af-photocard af-photocard--${card.rarity}`}
      style={
        {
          ["--pc-border" as string]: frame.border,
          ["--pc-glow" as string]: frame.glow,
          ["--pc-accent" as string]: frame.accent,
          ["--pc-element" as string]: elColor,
          ["--pc-tier" as string]: `${tier}%`,
        } as CSSProperties
      }
      data-rarity={card.rarity}
    >
      {/* decoração */}
      <span className="af-corner af-corner-tl" />
      <span className="af-corner af-corner-tr" />
      <span className="af-corner af-corner-bl" />
      <span className="af-corner af-corner-br" />
      <span className="af-rec af-mono-badge" aria-hidden>
        <span className="af-rec-dot" /> REC
      </span>
      <div className="af-pc-scan" aria-hidden />
      <div className="af-pc-godrays" aria-hidden />
      <div className="af-pc-vignette" aria-hidden />
      <div className="af-pc-holofoil" aria-hidden />

      {/* header */}
      <div className="af-pc-header">
        <p className="af-kicker af-mono-badge">{labels.yourCard}</p>
        <ElementGlyph element={card.element} color={elColor} />
      </div>

      {/* raridade + estrelas */}
      <div className="af-pc-rarity-row">
        <div className="af-pc-rarity-pill" data-rarity={card.rarity}>
          {rar}
        </div>
        <span className="af-pc-stars" aria-hidden>
          {"★".repeat(stars)}
          <span className="af-pc-stars-off">{"★".repeat(5 - stars)}</span>
        </span>
      </div>

      {/* palco: sigilo + spotlight + avatar + monograma */}
      <div className="af-pc-stage">
        <div className="af-pc-spotlight" aria-hidden />
        <div className="af-pc-back-sigil" aria-hidden>
          <ClassSigil classId={card.classId} color={frame.accent} />
        </div>
        <AvatarSvg
          face={card.face}
          hair={card.hair}
          eyes={card.eyes}
          palette={card.palette}
          element={card.element}
          uid="card"
          className="af-pc-avatar"
        />
        <div className="af-pc-monogram" aria-hidden>
          {card.monogram}
        </div>
      </div>

      {/* identidade */}
      <div className="af-pc-identity">
        <h2 className="af-pc-name">{card.name}</h2>
        <p className="af-pc-subtitle">
          <span className="af-pc-el-dot" style={{ background: elColor }} aria-hidden />
          {el}
          <span className="af-pc-dot-sep" aria-hidden>·</span>
          {cls}
        </p>
      </div>

      {/* stats */}
      <div className="af-pc-stats">
        <div className="af-pc-tier" aria-hidden>
          <span className="af-pc-tier-fill" />
        </div>
        <p className="af-pc-power">
          <span className="af-mono-badge">{labels.power}</span>
          <span className="af-pc-power-val">{card.power}</span>
          <span className="af-pc-tier-num af-mono-badge">{tier}</span>
        </p>
        <p className="af-pc-phrase">&ldquo;{card.catchphrase}&rdquo;</p>
      </div>

      {/* rodapé */}
      <p className="af-timestamp af-mono-badge">
        {labels.serial} {card.serial} ▸ ANIMA//DECK
      </p>
      <p className="af-watermark">{labels.watermark}</p>
      <p className="af-pc-seal">by @otaku_sincero69</p>
    </div>
  );
});
