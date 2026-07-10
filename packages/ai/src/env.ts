/**
 * Resolve OpenRouter credentials for the **product** (not coding agents).
 *
 * Agents MUST read this from the process/system environment — do not ask the user
 * to paste the key in chat. Prefer the Windows system variable.
 *
 * Order:
 * 1. OPEN_ROUTER_API_KEY  (system / global — default smoke)
 * 2. OPENROUTER_API_KEY   (.env.local override)
 */

export function getOpenRouterApiKey(
  env: NodeJS.ProcessEnv = process.env
): string | undefined {
  const key =
    env.OPEN_ROUTER_API_KEY?.trim() ||
    env.OPENROUTER_API_KEY?.trim() ||
    undefined;
  return key || undefined;
}

export function getOpenRouterModel(
  env: NodeJS.ProcessEnv = process.env,
  fallback = "deepseek/deepseek-v4-flash"
): string {
  return (
    env.OPENROUTER_MODEL?.trim() ||
    env.OPEN_ROUTER_MODEL?.trim() ||
    fallback
  );
}

export function openRouterKeyHint(): string {
  return (
    "OPEN_ROUTER_API_KEY ausente no ambiente do processo. " +
    "Setar no Windows (variável de sistema/usuário) e reiniciar o terminal/dev server. " +
    "Fallback: OPENROUTER_API_KEY em .env.local. Só produto — não coding agent."
  );
}
