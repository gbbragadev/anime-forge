# Guia Visual — Anime Forge (Subscriptions only)

> Versão rica em browser: abra **`docs/GUIA-VISUAL.html`** (duplo clique ou “Open with Live Server”).

## Política: subscription no agent · OpenRouter só no app

### Tabela canônica de keys

| Key | Agent faz o quê? | Para quê |
|-----|------------------|----------|
| `OPEN_ROUTER_API_KEY` | **Pega direto da env do sistema — não pede no chat** | App — padrão smoke |
| `OPENROUTER_API_KEY` | Lê se existir — não pede | App — fallback `.env.local` |
| `OPENROUTER_MODEL` | Lê se existir | Modelo do chat |
| `ANTHROPIC_API_KEY` | **Não** | Coding agent |
| `OPENAI_API_KEY` | **Não** | Coding agent |

Ordem no código: `OPEN_ROUTER_API_KEY` → `OPENROUTER_API_KEY`.  
Smoke: `GET /api/health`. Se faltar: HANDOFF “setar no Windows” — **sem** pedir o valor da key.

### Use
- Claude Code / Codex / Grok / **Gemini** com subscription  
- `OPEN_ROUTER_API_KEY` já no Windows — o app e o agent usam sozinhos  
- Gemini: ver `GEMINI.md` (app Google / CLI — não `GEMINI_API_KEY` paga de agent)  

### Não use
- Pedir a OpenRouter key no chat  
- API avulsa como motor do coding agent  

```text
O agent NÃO pede a key. Lê OPEN_ROUTER_API_KEY do sistema.
User seta uma vez no Windows; reinicia terminal/dev se precisar.
```

---

## Os 3 loops

```text
L0 PRODUCT   P0 score → P1 content → P2 build → P3 ship → P4 measure → P5 kill|scale
                      │
                      ▼
L1 BUILD     claim → implement → verify (npm run build) → fix → handoff
                      │
                      ▼  (rate limit da SUB)
L2 HANDOFF   HANDOFF.md → outra subscription → mesmo job
```

Uma sessão de agente = **uma iteração**.

---

## Frase mágica (qualquer sub)

```text
Repo: C:\Dev\anime-forge
Leia AGENTS.md + workbench/HANDOFF.md + workbench/QUEUE.md.
Rode UMA iteração do job livre. Claim em CLAIMS.md.
Ao terminar: HANDOFF + QUEUE + liberar claim.
Coding agent = só subscription.
Produto: ler OPEN_ROUTER_API_KEY da env do sistema — não pedir no chat.
```

Limite estourou → cole `docs/prompts/L2-handoff.md`.

---

## Qual sub para qual job

| Job | Sub preferida | Prompt |
|-----|---------------|--------|
| P0 Score | Grok **ou Gemini** | `docs/prompts/L0-P0-scorecard.md` |
| P1 Hooks | Grok **ou Gemini** | `docs/prompts/L0-P1-content-hooks.md` |
| B1 Scaffold | Codex | `docs/prompts/L1-B1-scaffold.md` |
| B2 Personas | Grok **ou Gemini** | `docs/prompts/L1-B2-personas.md` |
| B3 UI | Claude (Gemini backup) | `docs/prompts/L1-B3-ui-polish.md` |
| B4 API | Codex | `docs/prompts/L1-B4-wire-api.md` |
| B5 Ship check | qualquer sub | `docs/prompts/L1-B5-ship-check.md` |

---

## Como abrir

```bash
cd C:\Dev\anime-forge
# Claude Code (sub)  →  claude
# Codex (sub)        →  codex
# Grok               →  workspace na pasta ou colar prompt
# Gemini (sub)       →  app / CLI + GEMINI.md ou colar docs/prompts/
```

Cada um lê o mesmo `AGENTS.md`. O estado entre eles é o **workbench**, não a API.

---

## OpenRouter do app (agent PODE pedir)

- Serve para o **usuário final** do WaifuChat.  
- **Não** é o motor do Codex/Claude/Grok/Gemini.  
  (Modelo Gemini no OpenRouter do **app** ≠ Gemini coding agent.)
- Agent **pode pedir** a key ao configurar o app / smoke de chat.  
- UI/personas sem key; stream real = `OPEN_ROUTER_API_KEY` ou `OPENROUTER_API_KEY`.

---

## Checklist rápido

- [ ] App da **sub**, não client só com API paga  
- [ ] Sem keys de coding agent pay-as-you-go  
- [ ] OpenRouter: agent lê env do sistema; não pede key no chat  


- [ ] HANDOFF + QUEUE lidos  
- [ ] Uma iteração só  
- [ ] Workbench atualizado ao sair  
- [ ] Rate limit → L2 outra sub  

---

Ver também: `docs/AGENT-PIPELINE.md` · `docs/PLAYBOOK.md` · `AGENTS.md`
