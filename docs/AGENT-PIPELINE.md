# Agent Pipeline — loops multi-provedor

Um **processo em loops**, vários motores (**Codex / Claude / Grok / Gemini**).  
Estágios são **passos dentro** dos loops — não uma fila linear cega.

```
┌─────────────────────────────────────────────────────────────┐
│  L0  PRODUCT LOOP  (um app / uma ideia)                     │
│  score → content test → build loop → ship → measure → K/S  │
│         └──────── se kill: próxima ideia ─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  L1  BUILD LOOP  (código — até DoD ou bloqueio)             │
│  claim → implement → build/smoke → fix → update handoff     │
│         └──────── repete até verde ───────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  L2  AGENT HANDOFF LOOP  (limites / troca de provedor)      │
│  rate-limit? → HANDOFF.md → outro agente → mesmo claim/job │
│         └──────── sem reexplicar o repo ──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Frase mágica (colar em qualquer agente)

```
Repo: C:\Dev\anime-forge
Leia AGENTS.md + workbench/HANDOFF.md + workbench/QUEUE.md.
Identifique o loop (L0/L1/L2) e a iteração atual.
Claime slot em CLAIMS.md e rode UMA iteração do loop ativo
(ou o job da QUEUE). Ao terminar: HANDOFF + QUEUE + liberar claim.
Não pule para o próximo app sem fechar o measure/kill do atual.
IMPORTANTE: coding agent = só subscription (Claude/Codex/Grok/Gemini).
Produto: ler OPEN_ROUTER_API_KEY da env do sistema (não pedir no chat).
Nunca ANTHROPIC/OPENAI/GEMINI_API_KEY pay-as-you-go como motor do agent.
```

### Keys do produto (tabela canônica)

| Key | Agent faz o quê? | Para quê |
|-----|------------------|----------|
| `OPEN_ROUTER_API_KEY` | **Lê da env do sistema — não pede** | App — padrão smoke |
| `OPENROUTER_API_KEY` | Lê se existir — não pede | App — fallback `.env.local` |
| `OPENROUTER_MODEL` | Lê se existir | Modelo do chat |
| `ANTHROPIC_API_KEY` | **Não** | Coding agent |
| `OPENAI_API_KEY` | **Não** | Coding agent |
| `GEMINI_API_KEY` (pay-as-you-go) | **Não** | Coding agent — use sub Google / Gemini app |

Guia visual: `docs/GUIA-VISUAL.html` · shim Gemini: `GEMINI.md`

---

## Bernstein (opcional — progresso L1)

Orquestra **CLI coding agents** (Claude Code, Codex, Gemini CLI…) em worktrees, com TUI `bernstein live` e audit.

| Use | Não use |
|-----|---------|
| Jobs L1 code-heavy (B1/B3/B4) | L0 copy/Grok-only |
| Ver progresso de run paralela | Substituir HANDOFF multi-sub |
| Gate `npm run build` | API pay-as-you-go como motor |

```powershell
cd C:\Dev\anime-forge
bernstein doctor
bernstein live    # monitor
bernstein         # goal em bernstein.yaml
```

Piloto: `docs/BERNSTEIN-PILOT.md`

---

## Tools avaliados (mapa)

| Tool | Serve para | Na factory |
|------|------------|------------|
| Workbench L0/L1/L2 | Handoff multi-sub | **Base** |
| Bernstein | Progresso + multi-CLI coding | **Piloto L1** |
| ccswarm | Claude/Codex queue/tail | Alt a Bernstein |
| Langflow | Flows LLM de produto | Não core |
| CLI-Anything | GIMP/Comfy agent-native | Image futuro |
| MALLM (Multi-Agent-LLMs) | Debate multi-LLM research | Não |
| karpathy/autoresearch | Loop treino LLM | Não |
| karpathy/llm-council | Council via OpenRouter | P0 opcional só |
| karpathy-guidelines skill | Qualidade de código | Já global |

---

## L0 — Product Loop (negócio + fábrica)

Uma volta = uma aposta de app. **Não** abra L0 novo com L0 anterior sem measure.

| Step | Nome | Output | Tokens | Agente default |
|------|------|--------|--------|----------------|
| P0 | Scorecard | go / no-go | baixo | Grok **ou Gemini** |
| P1 | Content test | 15–30 pieces / sinal de demanda | baixo | humano + Grok/Gemini hooks |
| P2 | Enter L1 | app no ar mínimo | — | Codex claim |
| P3 | Ship | URL + paywall mock/real | baixo | qualquer sub |
| P4 | Measure | 5–7 dias: cliques bio, custo API, conversão | baixo | humano / Grok ou Gemini |
| P5 | Kill or Scale | matar **ou** enfileirar polish/image/billing | baixo | Grok/Gemini + você |

```
P0 ──go──► P1 ──sinal──► P2 (L1) ──► P3 ──► P4 ──► P5
 │ no-go      sem sinal              │              │
 └─ fim       └─ fim / outra ideia   │              ├─ kill → novo P0
                                     │              └─ scale → novo L1 jobs
                                     └─ build falha → L1 itera
```

Prompts: `docs/prompts/L0-*.md` e atalhos S0/S5/S6 mapeados abaixo.

Detalhe de monetização/conteúdo: `docs/PLAYBOOK.md`.

---

## L1 — Build Loop (código)

Roda **dentro** de P2 (e de novo se scale pedir feature).  
Uma sessão de agente = **1 iteração** de L1 (não 10 features).

```
        ┌──────────────┐
        │ 1. CLAIM job │ ← QUEUE + CLAIMS
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ 2. IMPLEMENT │ ← só arquivos do job
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ 3. VERIFY    │ ← npm run build (+ smoke manual se API)
        └──────┬───────┘
               │
        fail ──┤── pass
               ▼         ▼
        ┌──────────┐  ┌─────────────┐
        │ 4a. FIX  │  │ 4b. HANDOFF │
        │  (loop)  │  │  + QUEUE    │
        └────┬─────┘  └─────────────┘
             │
             └── voltar ao VERIFY (máx ~3 tentativas; senão BLOCK no HANDOFF)
```

### Jobs de build (antigos S1–S4, S6)

| Job ID | Dentro de L1 | Preferência |
|--------|--------------|-------------|
| B1 Scaffold | copiar app + app.config | Codex (Gemini se for o que tem cota) |
| B2 Personas | content/personas | Grok **ou Gemini** |
| B3 UI polish | packages/ui ou app CSS | Claude (Gemini backup) |
| B4 Wire API | routes + credits + env | Codex |
| B5 Ship check | build + checklist | qualquer sub |

Prompts: `docs/prompts/L1-*.md`.

**Regra:** se VERIFY falhar 3× no mesmo erro → parar, escrever blocker no HANDOFF, **L2** (outro agente) ou você.

---

## L2 — Agent Handoff Loop (limites)

Não é feature. É **continuação**.

```
agente A trabalha ──► rate limit / contexto sujo / sessão longa
         │
         ▼
   atualiza HANDOFF (obrigatório: Next + Blockers + Files)
         │
         ▼
   libera ou marca claim "paused"
         │
         ▼
   agente B (outro provedor) lê HANDOFF + QUEUE
         │
         ▼
   retoma MESMO job / MESMA iteração L1
```

| Situação | Próximo motor |
|----------|----------------|
| Claude limit | Codex (B1/B4) ou Grok/Gemini (B2 + L0) |
| Codex limit | Grok/Gemini (P0/B2/hooks) ou Claude (B3) |
| Grok limit | Gemini (L0/B2) ou Codex/Claude no L1 |
| Gemini limit | Grok (L0) ou Codex/Claude (L1) |
| Chat confuso | **Novo** chat + HANDOFF (não empilhar) |
| Tokens sobrando no provedor X | Enfileirar jobs baratos B2 + hooks e descarregar |

---

## Mapa antigo S0–S6 → loops

| Antes | Agora |
|-------|--------|
| S0 | L0 / P0 |
| S1 | L1 / B1 |
| S2 | L1 / B2 |
| S3 | L1 / B3 |
| S4 | L1 / B4 |
| S5 | L0 / P1 (hooks) |
| S6 | L1 / B5 |

Prompts legados `docs/prompts/0N-*.md` apontam para os L*.

---

## Anti-colisão (com loops)

1. Um claim = uma iteração L1 ou um step L0  
2. Dois agents: apps diferentes **ou** `content/` vs `packages/`  
3. Kernel (`packages/*`): claim exclusivo  
4. Não abrir L0 de app B no meio de L1 vermelho do app A  

## Skill

`.agents/skills/ship-niche-app/SKILL.md` — detecta loop ativo, roda **uma** iteração, atualiza workbench.

## workbench

| Arquivo | Papel no loop |
|---------|----------------|
| `QUEUE.md` | jobs; marca loop (L0/L1) + job id |
| `HANDOFF.md` | estado da **iteração** (não essay) |
| `CLAIMS.md` | quem está em qual loop agora |
