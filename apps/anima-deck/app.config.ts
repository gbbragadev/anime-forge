import { defineApp, type Persona } from "@anime-forge/config";

/** arquétipos de identidade — originais, sem IP (preenchimento defineApp.personas) */
const archetypes: Persona[] = [
  {
    id: "blade-wanderer",
    displayName: "Andarilho da Lâmina",
    tags: ["ação", "solo"],
    system: "identity",
    starter: "Caminho solitário, aço e lealdade.",
    color: "#ff4d9a",
    en: {
      displayName: "Blade Wanderer",
      tags: ["action", "solo"],
      starter: "Lone path, steel and loyalty.",
    },
  },
  {
    id: "star-scribe",
    displayName: "Escriba das Estrelas",
    tags: ["mistério", "saber"],
    system: "identity",
    starter: "Mapas celestes e verdades proibidas.",
    color: "#22d3ee",
    en: {
      displayName: "Star Scribe",
      tags: ["mystery", "lore"],
      starter: "Sky maps and forbidden truths.",
    },
  },
  {
    id: "neon-trickster",
    displayName: "Trapaceiro Neon",
    tags: ["caos", "humor"],
    system: "identity",
    starter: "Sorrisos afiados e planos tortos.",
    color: "#34d399",
    en: {
      displayName: "Neon Trickster",
      tags: ["chaos", "humor"],
      starter: "Sharp smiles and crooked plans.",
    },
  },
  {
    id: "iron-heart",
    displayName: "Coração de Ferro",
    tags: ["proteção", "honra"],
    system: "identity",
    starter: "Escudo primeiro, ego por último.",
    color: "#c44dff",
    en: {
      displayName: "Iron Heart",
      tags: ["guard", "honor"],
      starter: "Shield first, ego last.",
    },
  },
  {
    id: "void-echo",
    displayName: "Eco do Vazio",
    tags: ["sombra", "silêncio"],
    system: "identity",
    starter: "O que some ainda observa.",
    color: "#a89bc0",
    en: {
      displayName: "Void Echo",
      tags: ["shadow", "silence"],
      starter: "What vanishes still watches.",
    },
  },
  {
    id: "dawn-herald",
    displayName: "Arauto da Aurora",
    tags: ["luz", "esperança"],
    system: "identity",
    starter: "Primeira luz depois da noite.",
    color: "#ffb7d5",
    en: {
      displayName: "Dawn Herald",
      tags: ["light", "hope"],
      starter: "First light after the night.",
    },
  },
];

export const appConfig = defineApp({
  id: "anima-deck",
  name: "ANIMA//DECK",
  niche: "anime",
  locale: "pt-BR",
  capabilities: ["static"],
  ai: {
    provider: "openrouter",
    model:
      process.env.OPENROUTER_MODEL?.trim() ||
      process.env.OPEN_ROUTER_MODEL?.trim() ||
      "deepseek/deepseek-v4-flash",
    maxHistory: 2,
    maxTokens: 100,
    temperature: 0.5,
  },
  monetization: {
    freePerDay: 99,
    watermark: true,
    products: ["coins_s"],
  },
  legal: {
    disclaimer:
      "Entretenimento com personagens e traços originais. Não afiliado a estúdios ou publishers. Photocards cosméticas — sem valor monetário real.",
  },
  seo: {
    title: "ANIMA//DECK — forje sua photocard anime",
    description:
      "Crie um personagem original em 6 passos e transforme-o numa photocard colecionável com raridade. Grátis, printável.",
    ogImage: "/og.png",
  },
  share: {
    tiktokHookTemplates: [
      "Forjei minha photocard no ANIMA//DECK — raridade {rarity} 😳 #anime #photocard",
      "Meu OC saiu {rarity}. E o seu?",
      "6 passos e a card já era printável",
    ],
  },
  personas: archetypes,
});

export default appConfig;
