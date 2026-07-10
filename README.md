# Anime Forge

Factory de webapps nichados com IA (**Tema + IA + Frontend**).

Vertical: **anime**. App: **WaifuChat**.

## Guia visual (como usar)

- **Browser (recomendado):** abra [`docs/GUIA-VISUAL.html`](docs/GUIA-VISUAL.html)
- **Markdown:** [`docs/GUIA-VISUAL.md`](docs/GUIA-VISUAL.md)

**Política:** agentes só com **sua subscription** (Claude Code / Codex / Grok / **Gemini**).  
**Não** use API paga como motor do coding agent (`GEMINI_API_KEY` pay-as-you-go incluído).  
**Produto:** app e agent leem `OPEN_ROUTER_API_KEY` **direto da env do sistema** (não pedem no chat).  
Fallback: `OPENROUTER_API_KEY` no `.env.local` se existir.

## Loops (multi-agente)

O processo é **cíclico**, não uma esteira única. Codex / Claude / Grok / **Gemini** rodam a **mesma** iteração.

```
L0 PRODUCT  score → content → build → ship → measure → kill|scale
L1 BUILD    claim → implement → verify → fix → handoff
L2 HANDOFF  rate-limit → HANDOFF.md → outro provedor → mesmo job
```

| Arquivo | Uso |
|---------|-----|
| `AGENTS.md` | contrato canônico (todos os agentes) |
| `CLAUDE.md` | shim Claude Code |
| `GEMINI.md` | shim Gemini (Google sub) |
| `docs/AGENT-PIPELINE.md` | loops + roteamento de limites |
| `docs/prompts/` | colar 1 prompt = 1 iteração |
| `workbench/` | QUEUE · HANDOFF · CLAIMS |
| `.agents/skills/ship-niche-app/` | `$` / `/ship-niche-app` |

**Frase mágica** (qualquer provedor):

```
Repo C:\Dev\anime-forge. Leia AGENTS.md + workbench/HANDOFF.md + QUEUE.md.
Rode UMA iteração do loop ativo (ou o job da QUEUE). Atualize HANDOFF/QUEUE/CLAIMS.
```

Troca de limite → cole `docs/prompts/L2-handoff.md`.

## Estrutura de código

```
apps/waifu-chat     → produto
packages/ai         → OpenRouter streaming
packages/config     → defineApp (Zod)
packages/credits    → free/day + coins + weekly
packages/ui         → design system anime
content/personas    → packs reutilizáveis
docs/PLAYBOOK.md    → L0 negócio
```

## Quick start

```bash
cd C:\Dev\anime-forge
npm install

# Smoke: se OPEN_ROUTER_API_KEY já existir no Windows, não precisa .env.local
# Senão: copy .env.example apps\waifu-chat\.env.local e preencha a key

npm run dev    # http://localhost:3000
# checar key: http://localhost:3000/api/health
npm run build
```

## Novo app (L1/B1)

1. Copiar `apps/waifu-chat` → `apps/<id>`
2. `app.config.ts` + personas
3. `package.json` name
4. `npm run build`

## Env (produto) — tabela canônica

| Key | Agent faz o quê? | Para quê |
|-----|------------------|----------|
| `OPEN_ROUTER_API_KEY` | **Lê da env do sistema — não pede** | App — padrão smoke |
| `OPENROUTER_API_KEY` | Lê se existir — não pede | App — fallback `.env.local` |
| `OPENROUTER_MODEL` | Lê se existir | Modelo do chat |
| `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GEMINI_API_KEY` paga | **Não** | Coding agent |

## Bernstein (opcional)

Progresso + multi-CLI coding (Claude/Codex). Ver `docs/BERNSTEIN-PILOT.md`.

```powershell
bernstein doctor
bernstein live
bernstein   # goal em bernstein.yaml
```

## Roadmap produto

- [x] Kernel + WaifuChat skeleton
- [x] Harness multi-agente em **loops**
- [x] Piloto Bernstein (thin keep)
- [ ] Billing Stripe + Pix
- [ ] Capability image / haifu
- [ ] CLI create-app
