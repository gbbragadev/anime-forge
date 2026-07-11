import { defineApp, type Persona } from "@anime-forge/config";
import pack from "../../content/personas/anima-deck-v1.json";

/** Pack B2: arquétipos de identidade ORIGINAIS (PT+EN) — content/personas/anima-deck-v1.json */
const archetypes = pack as Persona[];

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
