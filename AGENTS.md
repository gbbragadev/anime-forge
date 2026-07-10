# Anime Forge — AGENTS.md

> Contrato **único** para Codex, Claude Code, Grok, **Gemini** e qualquer outro agente.
> O processo é em **loops**. O modelo é só o motor de uma iteração.
>
> **Subscription only (agentes):** Claude Code / Codex / Grok / **Gemini** na **sub**
> (app Google / Gemini CLI / AI Pro — não `GEMINI_API_KEY` pay-as-you-go como motor do agent).
>
> | Key | Agent faz o quê? | Para quê |
> |-----|------------------|----------|
> | `OPEN_ROUTER_API_KEY` | **Lê direto da env do sistema** — **não pedir** | Produto — padrão smoke |
> | `OPENROUTER_API_KEY` | Lê se existir (.env.local) — **não pedir** | Fallback produto |
> | `OPENROUTER_MODEL` | Lê se existir | Modelo do app |
> | `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` | **Não pedir / não usar** | Coding agent |
>
> Resolução no código: `OPEN_ROUTER_API_KEY` → `OPENROUTER_API_KEY`. Smoke via `/api/health`.
> Se faltar as duas: reportar no HANDOFF (user configura no Windows) — **não** ficar pedindo a key no chat.
> Guia: `docs/GUIA-VISUAL.html`.

## Loops (leia isto primeiro)

```
L0 PRODUCT  → score → content → build → ship → measure → kill|scale
L1 BUILD    → claim → implement → verify → fix* → handoff
L2 HANDOFF  → limite/contexto → HANDOFF.md → outro agente → mesmo job
```

- Uma sessão = **uma iteração** (não “faz o app inteiro”).
- Detalhe: `docs/AGENT-PIPELINE.md`
- Skill: `.agents/skills/ship-niche-app/SKILL.md`

## Antes de editar

1. `workbench/HANDOFF.md` + `workbench/QUEUE.md`
2. Claim em `workbench/CLAIMS.md` (agent + **loop** + job + app)
3. Só o job claimado
4. Fim: HANDOFF + QUEUE + liberar claim

QUEUE vazia e sem pedido explícito → **perguntar**, não inventar app.

## O que é o repo

Factory: **Tema + IA (OpenRouter) + Frontend + monetização**.

- Vertical: **anime**
- Exemplo: `apps/waifu-chat`
- Kernel: `packages/*` + `content/personas`
- **Não** acoplar Clipia / Senior / SaaS cliente

```
apps/  packages/  content/personas/
docs/PLAYBOOK.md          negócio (L0)
docs/AGENT-PIPELINE.md    loops multi-agente
docs/prompts/             prompts por step do loop
workbench/                estado das iterações
.agents/skills/           ship-niche-app
```

## App = manifesto (dentro de L1/B1)

1. `apps/<id>/` (clone waifu-chat)
2. `defineApp` em `app.config.ts`
3. Personas em `content/personas/`
4. Theme mínimo — não redesenhar o design system

**Começar app novo com 1 prompt:** `docs/prompts/NOVO-APP.md` (também no guia visual §★).

Capability pronta: `chat`. Image/haifu = só com job explícito.

## Comandos

```bash
cd C:\Dev\anime-forge
npm install
npm run dev      # :3000
npm run build    # VERIFY obrigatório após código
```

Env do **produto** (cérebro do app — não é coding agent):

**Provider default: Z.AI / GLM** (`PRODUCT_AI_PROVIDER=zai`)

| Var | Uso |
|-----|-----|
| `ZAI_API_KEY` (ou `GLM_API_KEY`) | Key Z.AI — `.env.local` ou env sistema; **não pedir no chat** |
| `ZAI_MODEL` | default `glm-4.5-flash` (free); qualidade `glm-5.2` |
| `OPEN_ROUTER_API_KEY` | só se `PRODUCT_AI_PROVIDER=openrouter` |

- Base URL Z.AI: `https://api.z.ai/api/paas/v4/` (OpenAI-compatible)
- Docs: https://docs.z.ai/guides/overview/quick-start
- Smoke: `GET /api/health`
- Nunca commitar keys; nunca usar keys de coding agent (Anthropic/OpenAI sub)

## Jobs ↔ loops

| Job | Loop | Preferência |
|-----|------|-------------|
| P0 Scorecard | L0 | Grok **ou Gemini** |
| P1 Content hooks | L0 | Grok **ou Gemini** |
| B1 Scaffold | L1 | Codex |
| B2 Personas | L1 | Grok **ou Gemini** |
| B3 UI polish | L1 | Claude (ou Gemini se Claude limitou) |
| B4 Wire API | L1 | Codex |
| B5 Ship check | L1 | qualquer sub |
| Handoff | L2 | qualquer outro provedor (Claude/Codex/Grok/**Gemini**) |

## Regras

- YAGNI / ponytail — mínimo que fecha a iteração
- Coding style: **karpathy-guidelines** (think before coding, simplicity, surgical, goal-driven) se a skill estiver no ambiente
- VERIFY falhou → fix no L1; 3 fails → BLOCK no HANDOFF (L2 ou humano)
- Rate limit → L2: não recomeçar o produto
- Personas originais/arquétipos; sem secrets no git; sem push sem autorização
- pt-BR se o user escreveu em pt-BR

## Bernstein (opcional — L1 code-heavy)

- Orquestra CLI agents (Claude Code / Codex; Gemini CLI se instalado) com progresso (`bernstein live`)
- Config: `bernstein.yaml` · piloto: `docs/BERNSTEIN-PILOT.md`
- **Não** substitui workbench para L0 / Grok / L2 handoff humano
- Gate preferido: `npm run build` (não pytest Python)
- Antes de run grande: `bernstein doctor`

## Tools avaliados e NÃO no core

CLI-Anything (software GUI) · Langflow (flows produto) · MALLM/Multi-Agent-LLMs (debate research) · karpathy/autoresearch · karpathy/llm-council · forks karpathy-skills (já coberto por skill global)
- **Frontend forte (UI polish, share card, motion, redesign visual):** o agente **não implementa** — gera **prompt elaborado** em `workbench/prompts-glm/` para o user colar no **GLM 5.2 MAX**. Ainda atualiza HANDOFF/QUEUE (job “prompted” ou Done quando user confirmar). Jobs leves de wire/API/content o agente implementa normal.
- **Prompts GLM = brief de design, não one-liner** (lição 2026-07-10, anime-quiz B3: ~4/10 → ~7.5/10 com prompt denso). Hoje o apelo visual é o produto. GLM constrói bem **se** o prompt tiver: (1) diagnóstico do que está “texto puro”, (2) metas visuais concretas por tela, (3) arquivos-alvo, (4) anti-padrões / sem IP, (5) VERIFY + DoD user-facing. Ver checklist em `workbench/prompts-glm/README.md`.

## DoD da iteração

- [ ] Job da QUEUE feito **ou** blocker escrito
- [ ] `npm run build` OK se tocou código
- [ ] HANDOFF / QUEUE / CLAIMS atualizados
- [ ] Claim liberado

## Fora de escopo (até job na QUEUE)

Billing real · capability image · CLI create-app · app nativo
