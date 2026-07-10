import { getOpenRouterApiKey, getOpenRouterModel } from "@anime-forge/ai";

/** Smoke: confere se a key do produto está resolvida (sem vazar o valor). */
export async function GET() {
  const key = getOpenRouterApiKey();
  const source = process.env.OPEN_ROUTER_API_KEY?.trim()
    ? "OPEN_ROUTER_API_KEY"
    : process.env.OPENROUTER_API_KEY?.trim()
      ? "OPENROUTER_API_KEY"
      : null;

  return Response.json({
    ok: Boolean(key),
    openRouter: {
      configured: Boolean(key),
      source,
      model: getOpenRouterModel(),
      keyLength: key?.length ?? 0,
    },
    hint: key
      ? "Key resolvida — smoke de chat pode rodar."
      : "Defina OPEN_ROUTER_API_KEY no Windows (padrão) ou OPENROUTER_API_KEY no .env.local",
  });
}
