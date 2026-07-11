"use client";

import { useEffect, useState } from "react";
import { getLocale, setLocale as persistLocale, t, type Dict, type Locale } from "@anime-forge/config";

export const STRINGS = {
  episodeBadge: { pt: "EP. 00 · PHOTOCARD FORGE", en: "EP. 00 · PHOTOCARD FORGE" },
  heroSub: {
    pt: "Crie um personagem anime original em 6 passos e forje uma photocard colecionável com raridade.",
    en: "Create an original anime character in 6 steps and forge a collectible photocard with rarity.",
  },
  lead: {
    pt: "100% free path. Sem IA de imagem, sem conta. No fim: card 9:16 pra printar e postar.",
    en: "100% free path. No image AI, no account. You get a 9:16 card to print and post.",
  },
  start: { pt: "Começar a forja", en: "Start the forge" },
  step: { pt: "PASSO", en: "STEP" },
  exit: { pt: "Sair", en: "Exit" },
  next: { pt: "Próximo", en: "Next" },
  back: { pt: "Voltar", en: "Back" },
  forge: { pt: "Forjar photocard", en: "Forge photocard" },
  forging: { pt: "Forjando…", en: "Forging…" },
  yourCard: { pt: "Sua photocard", en: "Your photocard" },
  rarityReveal: { pt: "Raridade", en: "Rarity" },
  share: { pt: "Compartilhar", en: "Share" },
  download: { pt: "Baixar card", en: "Download card" },
  redo: { pt: "Forjar outro", en: "Forge another" },
  shared: { pt: "Compartilhado!", en: "Shared!" },
  copied: { pt: "Texto copiado — cola no Stories/TikTok.", en: "Copied — paste it on Stories/TikTok." },
  copyManual: { pt: "Copie manualmente e poste.", en: "Copy manually and post." },
  dlOk: { pt: "Download iniciado.", en: "Download started." },
  dlFail: { pt: "Não deu pra baixar — tire print do card.", en: "Download failed — screenshot the card." },
  rarityTable: { pt: "Tabela de raridade (cosmético)", en: "Rarity table (cosmetic)" },
  nameLabel: { pt: "Nome do personagem", en: "Character name" },
  namePh: { pt: "ex.: Kuro Aoi", en: "e.g. Kuro Aoi" },
  powerLabel: { pt: "Poder", en: "Power" },
  powerPh: { pt: "ex.: Lâmina do eclipse", en: "e.g. Eclipse blade" },
  phraseLabel: { pt: "Frase de efeito", en: "Catchphrase" },
  phrasePh: { pt: "ex.: A noite também escolhe lados.", en: "e.g. Night picks sides too." },
  identity: { pt: "Identidade / arquétipo", en: "Identity / archetype" },
  appearance: { pt: "Aparência", en: "Appearance" },
  face: { pt: "Rosto", en: "Face" },
  hair: { pt: "Cabelo", en: "Hair" },
  eyes: { pt: "Olhos", en: "Eyes" },
  palette: { pt: "Paleta", en: "Palette" },
  element: { pt: "Elemento", en: "Element" },
  class: { pt: "Classe", en: "Class" },
  powerStep: { pt: "Poder + frase", en: "Power + phrase" },
  needName: { pt: "Dê um nome original (sem franquia).", en: "Pick an original name (no franchise)." },
  needPower: { pt: "Preencha poder e frase de efeito.", en: "Fill power and catchphrase." },
  needArchetype: { pt: "Escolha um arquétipo.", en: "Pick an archetype." },
  serial: { pt: "Serial", en: "Serial" },
  watermark: { pt: "ARCANA · PERSONAGENS ORIGINAIS", en: "ARCANA · ORIGINAL CHARACTERS" },
  disclaimerEn: {
    pt: "",
    en: "Entertainment with original characters and traits. Not affiliated with studios or publishers. Photocards are cosmetic — no real monetary value.",
  },
  preview: { pt: "Prévia do avatar", en: "Avatar preview" },
} satisfies Dict;

export type StringKey = keyof typeof STRINGS;

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    setLocaleState(getLocale());
  }, []);

  const set = (l: Locale) => {
    persistLocale(l);
    setLocaleState(l);
  };
  return [locale, set];
}

export function useT(locale: Locale) {
  return (key: StringKey) => t(STRINGS, key, locale);
}
