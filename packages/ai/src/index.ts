import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type CoreMessage } from "ai";
import {
  getOpenRouterApiKey,
  getOpenRouterModel,
  openRouterKeyHint,
} from "./env";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type OpenRouterChatOptions = {
  /** If omitted, resolves OPEN_ROUTER_API_KEY then OPENROUTER_API_KEY */
  apiKey?: string;
  model?: string;
  system: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
  maxHistory?: number;
  siteUrl?: string;
  siteName?: string;
};

/** OpenRouter is OpenAI-compatible; point baseURL at openrouter.ai */
export function createOpenRouterClient(opts: {
  apiKey: string;
  siteUrl?: string;
  siteName?: string;
}) {
  return createOpenAI({
    apiKey: opts.apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
      ...(opts.siteUrl ? { "HTTP-Referer": opts.siteUrl } : {}),
      ...(opts.siteName ? { "X-Title": opts.siteName } : {}),
    },
  });
}

export function trimHistory(
  messages: ChatMessage[],
  maxHistory: number
): ChatMessage[] {
  const nonSystem = messages.filter((m) => m.role !== "system");
  if (nonSystem.length <= maxHistory) return nonSystem;
  return nonSystem.slice(-maxHistory);
}

export function streamOpenRouterChat(options: OpenRouterChatOptions) {
  const {
    system,
    messages,
    maxTokens = 400,
    temperature = 0.8,
    maxHistory = 12,
    siteUrl,
    siteName,
  } = options;

  const apiKey = options.apiKey?.trim() || getOpenRouterApiKey();
  const model = options.model?.trim() || getOpenRouterModel();

  if (!apiKey) {
    throw new Error(openRouterKeyHint());
  }

  const client = createOpenRouterClient({ apiKey, siteUrl, siteName });
  const history = trimHistory(messages, maxHistory) as CoreMessage[];

  return streamText({
    model: client.chat(model),
    system,
    messages: history,
    maxTokens,
    temperature,
  });
}

export { streamText, getOpenRouterApiKey, getOpenRouterModel, openRouterKeyHint };
