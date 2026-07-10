# HANDOFF

## Loop ativo
**L1** build (waifu-chat) — B3 UI polish **delegado ao GLM 5.2 MAX** (prompt pronto)

## Last agent
grok | 2026-07-10

## Last iteration
- Regra: **frontend forte** → Grok/Codex **não implementa**; gera prompt em `workbench/prompts-glm/` para **GLM 5.2 MAX**
- Prompt B3 escrito: `workbench/prompts-glm/L1-B3-ui-polish-waifu-chat.md`
- Regra também em `AGENTS.md`

## Done (acumulado)
- monorepo + packages + waifu-chat
- Smoke OpenRouter + deepseek-v4-flash
- Content hooks x15
- Personas v1+v2 (10)

## Next iteration
1. **User → GLM 5.2 MAX:** colar prompt de `workbench/prompts-glm/L1-B3-ui-polish-waifu-chat.md` (job **L1/B3**)
2. Depois: **L0/P0** scorecard `anime-quiz` (sem go = sem código quiz)
3. Opcional: outro agente só **VERIFY** build/workbench pós-GLM

## Blockers
- B3 aguardando execução no GLM (não é blocker técnico de key)

## Bernstein pilot
- Install **PASS** (v3.1.0 via `uv tool install bernstein`)
- `bernstein init` + `doctor`: claude ✓ OAuth, codex ✓, gemini CLI ✗ PATH
- `git init` feito (Bernstein precisa de git/worktrees)
- Verdict: **Thin keep** — use para L1 code-heavy; workbench continua L0/Grok/L2
- Doc: `docs/BERNSTEIN-PILOT.md` · config: `bernstein.yaml`
- Full run orquestrada **não** disparada (goal pronto; user pode `bernstein` + `live`)

## Files
`C:\Dev\anime-forge`  
Prompt: `workbench/prompts-glm/L1-B3-ui-polish-waifu-chat.md`  
Regra: `AGENTS.md` (Frontend forte)  
Bernstein: `docs/BERNSTEIN-PILOT.md`
