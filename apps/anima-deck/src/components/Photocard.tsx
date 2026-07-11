"use client";

import { forwardRef, type CSSProperties } from "react";
import type { Locale } from "@anime-forge/config";
import {
  type ForgedCard,
  CLASSES,
  ELEMENTS,
  RARITY_FRAME,
  labelOf,
  rarityLabel,
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

/** Photocard 9:16 — moldura por raridade, REC, scanlines, selo */
export const Photocard = forwardRef<HTMLDivElement, Props>(function Photocard(
  { card, locale, labels },
  ref,
) {
  const frame = RARITY_FRAME[card.rarity];
  const el = labelOf(ELEMENTS, card.element, locale);
  const cls = labelOf(CLASSES, card.classId, locale);
  const rar = rarityLabel(card.rarity, locale);

  return (
    <div
      ref={ref}
      className={`af-photocard af-photocard--${card.rarity}`}
      style={
        {
          ["--pc-border" as string]: frame.border,
          ["--pc-glow" as string]: frame.glow,
          ["--pc-accent" as string]: frame.accent,
        } as CSSProperties
      }
      data-rarity={card.rarity}
    >
      <span className="af-corner af-corner-tl" />
      <span className="af-corner af-corner-tr" />
      <span className="af-corner af-corner-bl" />
      <span className="af-corner af-corner-br" />
      <span className="af-rec af-mono-badge" aria-hidden>
        <span className="af-rec-dot" /> REC
      </span>
      <div className="af-pc-scan" aria-hidden />

      <p className="af-kicker af-mono-badge">{labels.yourCard}</p>
      <div className="af-pc-rarity-pill" data-rarity={card.rarity}>
        {rar}
      </div>

      <div className="af-pc-avatar-wrap">
        <AvatarSvg
          face={card.face}
          hair={card.hair}
          eyes={card.eyes}
          palette={card.palette}
          uid="card"
          className="af-pc-avatar"
        />
        <div className="af-pc-monogram" aria-hidden>
          {card.monogram}
        </div>
      </div>

      <h2 className="af-pc-name">{card.name}</h2>

      <dl className="af-pc-meta">
        <div>
          <dt>{labels.element}</dt>
          <dd>{el}</dd>
        </div>
        <div>
          <dt>{labels.class}</dt>
          <dd>{cls}</dd>
        </div>
      </dl>

      <p className="af-pc-power">
        <span className="af-mono-badge">{labels.power}</span>
        {card.power}
      </p>
      <p className="af-pc-phrase">“{card.catchphrase}”</p>

      <p className="af-timestamp af-mono-badge">
        {labels.serial} {card.serial} ▸ ANIMA//DECK
      </p>
      <p className="af-watermark">{labels.watermark}</p>
      <p className="af-pc-seal">by @otaku_sincero69</p>
    </div>
  );
});
