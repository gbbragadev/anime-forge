# Anime Forge (Claude Code)

> Claude Code · Codex · Grok · Gemini — mesmo contrato.

## Instructions

**Primary: `AGENTS.md`** (loops L0 / L1 / L2).

Sempre:

1. `workbench/HANDOFF.md` + `QUEUE.md`
2. Claim em `CLAIMS.md`
3. Uma iteração do loop ativo
4. Atualizar handoff ao sair

## Platform

| Platform | Config | Skill |
|----------|--------|-------|
| Claude Code | CLAUDE.md → AGENTS.md | `/ship-niche-app` |
| Codex | AGENTS.md | `$ship-niche-app` |
| Grok | AGENTS.md | `docs/prompts/` |
| Gemini | GEMINI.md → AGENTS.md | app / CLI + `docs/prompts/` |

## Loops (resumo)

- **L0** product: score → content → build → ship → measure → kill|scale  
- **L1** build: claim → implement → verify → fix  
- **L2** handoff: rate-limit → outro agente via HANDOFF  

Full: `docs/AGENT-PIPELINE.md`

## Commands

```bash
cd C:\Dev\anime-forge
npm install
npm run dev
npm run build
```
