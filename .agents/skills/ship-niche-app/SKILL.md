---
name: ship-niche-app
description: >
  Roda UMA iteração dos loops da Anime Forge (L0 product / L1 build / L2 handoff).
  Detecta estado via workbench, claima job, implementa o mínimo, verifica build,
  atualiza HANDOFF/QUEUE/CLAIMS. Use com Codex ($ship-niche-app), Claude
  (/ship-niche-app), Grok, Gemini (GEMINI.md + prompts), ou quando o user
  disser "próximo loop forge", "continue anime-forge", "ship niche app".
---

# ship-niche-app

## Quando usar

- Continuar a factory multi-agente sem reexplicar o repo
- Rate limit: retomar via L2
- “Próximo job”, “fecha o loop”, “ship waifu-chat”

## Não usar

- Ideias fora do monorepo anime-forge
- Refactor gigante multi-app sem job na QUEUE
- Billing/image sem item explícito na QUEUE

## Protocolo (obrigatório)

### 1. Orientar

Ler na ordem:

1. `AGENTS.md`
2. `workbench/HANDOFF.md`
3. `workbench/QUEUE.md`
4. `workbench/CLAIMS.md`
5. Se precisar: `docs/AGENT-PIPELINE.md`

### 2. Detectar loop ativo

| Sinal | Loop / job |
|-------|------------|
| HANDOFF pede scorecard / ideia nova | L0/P0 |
| Falta content hooks / arquivo hooks | L0/P1 |
| App sem pasta / config | L1/B1 |
| Personas faltando | L1/B2 |
| UI feia / share card pedido | L1/B3 |
| API/chat/credits quebrado ou key smoke | L1/B4 ou B5 |
| Claim paused / “continue from HANDOFF” | L2 → retoma job |
| QUEUE Doing não vazio | esse job |
| QUEUE só Backlog | primeiro Backlog **ou** perguntar |

**Uma invocação = uma iteração.** Não encadear P0→B1→B3 sozinho.

### 3. Claim

Escrever linha em `CLAIMS.md`:

`slot | <agent> | L0\|L1\|L2 | <job> | <app> | <time>`

Mover job Backlog → Doing em `QUEUE.md`.

### 4. Executar

- Seguir prompt irmão em `docs/prompts/L*-*.md`
- Código: YAGNI; reusar packages
- Personas: originais/arquétipos
- Após código: `npm run build` (VERIFY)
- Fail: fix no L1 (até 3); senão BLOCK no HANDOFF
- **Keys (produto):** o agent **lê direto** `OPEN_ROUTER_API_KEY` da env do sistema
  (depois `OPENROUTER_API_KEY` se existir). **Não peça a key no chat.**
  Smoke: `GET /api/health` ou confiar no process.env. Se faltar, anote no HANDOFF
  para o user setar a variável no Windows — sem colar secret no transcript.
  Nunca peça `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GEMINI_API_KEY` pay-as-you-go
  para o agent rodar (Gemini agent = sub Google / app, ver GEMINI.md).

### 5. Fechar iteração

1. Doing → Done **ou** deixar blocker + Next
2. Atualizar `HANDOFF.md` (loop ativo, last agent, next, blockers)
3. Limpar claim
4. Responder ao user: loop, job, PASS/FAIL, próximo óbvio

## Preferência de agente (sugerir se user perguntar)

| Job | Preferir |
|-----|----------|
| P0 P1 P4 | Grok **ou Gemini** |
| B1 B4 | Codex |
| B5 | qualquer (incl. Gemini) |
| B3 | Claude (Gemini backup) |
| B2 | Grok **ou Gemini** |
| L2 | o provedor com limite livre |

## Definition of Done

- [ ] Uma iteração só
- [ ] VERIFY se houve código
- [ ] workbench coerente
- [ ] claim limpo
