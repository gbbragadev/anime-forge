/** Dados e sorteio do forjador — 100% client, zero backend */

export type FaceId = "oval" | "sharp" | "soft";
export type HairId = "spiky" | "long" | "short" | "wavy";
export type EyesId = "round" | "narrow" | "glow";
export type PaletteId = "sakura" | "cyan" | "void" | "ember" | "lime";
export type ElementId = "fire" | "water" | "wind" | "shadow" | "light";
export type ClassId =
  | "guardian"
  | "oracle"
  | "duelist"
  | "artificer"
  | "summoner"
  | "messenger";
export type RarityId = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type CharacterDraft = {
  archetypeId: string;
  name: string;
  face: FaceId;
  hair: HairId;
  eyes: EyesId;
  palette: PaletteId;
  element: ElementId;
  classId: ClassId;
  power: string;
  catchphrase: string;
};

export type ForgedCard = CharacterDraft & {
  rarity: RarityId;
  serial: string;
  monogram: string;
  forgedAt: number;
};

export type Opt<T extends string> = {
  id: T;
  label: { pt: string; en: string };
  color?: string;
};

export const FACES: Opt<FaceId>[] = [
  { id: "oval", label: { pt: "Oval", en: "Oval" } },
  { id: "sharp", label: { pt: "Afiado", en: "Sharp" } },
  { id: "soft", label: { pt: "Suave", en: "Soft" } },
];

export const HAIRS: Opt<HairId>[] = [
  { id: "spiky", label: { pt: "Espinhoso", en: "Spiky" } },
  { id: "long", label: { pt: "Longo", en: "Long" } },
  { id: "short", label: { pt: "Curto", en: "Short" } },
  { id: "wavy", label: { pt: "Ondulado", en: "Wavy" } },
];

export const EYES: Opt<EyesId>[] = [
  { id: "round", label: { pt: "Redondos", en: "Round" } },
  { id: "narrow", label: { pt: "Estreitos", en: "Narrow" } },
  { id: "glow", label: { pt: "Brilhantes", en: "Glow" } },
];

export const PALETTES: Opt<PaletteId>[] = [
  { id: "sakura", label: { pt: "Sakura", en: "Sakura" }, color: "#ff4d9a" },
  { id: "cyan", label: { pt: "Ciano", en: "Cyan" }, color: "#22d3ee" },
  { id: "void", label: { pt: "Vazio", en: "Void" }, color: "#c44dff" },
  { id: "ember", label: { pt: "Brasa", en: "Ember" }, color: "#fb923c" },
  { id: "lime", label: { pt: "Lima", en: "Lime" }, color: "#34d399" },
];

export const ELEMENTS: Opt<ElementId>[] = [
  { id: "fire", label: { pt: "Fogo", en: "Fire" }, color: "#fb923c" },
  { id: "water", label: { pt: "Água", en: "Water" }, color: "#38bdf8" },
  { id: "wind", label: { pt: "Vento", en: "Wind" }, color: "#a3e635" },
  { id: "shadow", label: { pt: "Sombra", en: "Shadow" }, color: "#a78bfa" },
  { id: "light", label: { pt: "Luz", en: "Light" }, color: "#fde68a" },
];

export const CLASSES: Opt<ClassId>[] = [
  { id: "guardian", label: { pt: "Guardião", en: "Guardian" } },
  { id: "oracle", label: { pt: "Oráculo", en: "Oracle" } },
  { id: "duelist", label: { pt: "Duelista", en: "Duelist" } },
  { id: "artificer", label: { pt: "Artífice", en: "Artificer" } },
  { id: "summoner", label: { pt: "Invocador", en: "Summoner" } },
  { id: "messenger", label: { pt: "Mensageiro", en: "Messenger" } },
];

/** pesos cosméticos — comum 55 · incomum 25 · rara 12 · épica 6 · lendária 2 */
export const RARITY_TABLE: { id: RarityId; weight: number; label: { pt: string; en: string } }[] = [
  { id: "common", weight: 55, label: { pt: "Comum", en: "Common" } },
  { id: "uncommon", weight: 25, label: { pt: "Incomum", en: "Uncommon" } },
  { id: "rare", weight: 12, label: { pt: "Rara", en: "Rare" } },
  { id: "epic", weight: 6, label: { pt: "Épica", en: "Epic" } },
  { id: "legendary", weight: 2, label: { pt: "Lendária", en: "Legendary" } },
];

export const RARITY_FRAME: Record<RarityId, { border: string; glow: string; accent: string }> = {
  common: { border: "#6b7280", glow: "rgba(107,114,128,0.35)", accent: "#9ca3af" },
  uncommon: { border: "#34d399", glow: "rgba(52,211,153,0.45)", accent: "#34d399" },
  rare: { border: "#22d3ee", glow: "rgba(34,211,238,0.5)", accent: "#22d3ee" },
  epic: { border: "#c44dff", glow: "rgba(196,77,255,0.55)", accent: "#c44dff" },
  legendary: { border: "#fbbf24", glow: "rgba(251,191,36,0.65)", accent: "#fbbf24" },
};

export const PALETTE_COLORS: Record<PaletteId, { hair: string; skin: string; eyes: string; accent: string }> = {
  sakura: { hair: "#ff4d9a", skin: "#f5d0c5", eyes: "#c44dff", accent: "#ffb7d5" },
  cyan: { hair: "#22d3ee", skin: "#e8d5c4", eyes: "#0ea5e9", accent: "#67e8f9" },
  void: { hair: "#7c3aed", skin: "#e8c4b8", eyes: "#c44dff", accent: "#a78bfa" },
  ember: { hair: "#ea580c", skin: "#f0c9a8", eyes: "#fb923c", accent: "#fdba74" },
  lime: { hair: "#16a34a", skin: "#f5d0c5", eyes: "#34d399", accent: "#86efac" },
};

export function emptyDraft(): CharacterDraft {
  return {
    archetypeId: "",
    name: "",
    face: "oval",
    hair: "spiky",
    eyes: "round",
    palette: "sakura",
    element: "fire",
    classId: "guardian",
    power: "",
    catchphrase: "",
  };
}

export function rollRarity(rng = Math.random): RarityId {
  const roll = rng() * 100;
  let acc = 0;
  for (const row of RARITY_TABLE) {
    acc += row.weight;
    if (roll < acc) return row.id;
  }
  return "common";
}

export function makeSerial(rng = Math.random): string {
  const n = Math.floor(rng() * 9999) + 1;
  return `#${String(n).padStart(4, "0")}`;
}

export function monogramFrom(name: string): string {
  const clean = name.trim();
  if (!clean) return "??";
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

export function forgeCard(draft: CharacterDraft, rng = Math.random): ForgedCard {
  return {
    ...draft,
    rarity: rollRarity(rng),
    serial: makeSerial(rng),
    monogram: monogramFrom(draft.name),
    forgedAt: Date.now(),
  };
}

const FORGE_COUNT_KEY = "anima-deck-forge-count";

/** telemetria client simples (sem backend) — contador local + evento custom */
export function trackForge(): number {
  if (typeof window === "undefined") return 0;
  let n = 0;
  try {
    n = Number(window.localStorage.getItem(FORGE_COUNT_KEY) || "0") + 1;
    window.localStorage.setItem(FORGE_COUNT_KEY, String(n));
  } catch {
    n = 1;
  }
  try {
    window.dispatchEvent(new CustomEvent("anima-deck:forge", { detail: { count: n } }));
  } catch {
    /* ignore */
  }
  return n;
}

export function labelOf<T extends string>(
  opts: Opt<T>[],
  id: T,
  locale: "pt" | "en",
): string {
  const hit = opts.find((o) => o.id === id);
  if (!hit) return id;
  return locale === "en" ? hit.label.en : hit.label.pt;
}

export function rarityLabel(id: RarityId, locale: "pt" | "en"): string {
  const hit = RARITY_TABLE.find((r) => r.id === id);
  if (!hit) return id;
  return locale === "en" ? hit.label.en : hit.label.pt;
}
