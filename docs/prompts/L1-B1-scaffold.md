# L1 / B1 — Scaffold app (1 iteração)

```
Repo: C:\Dev\anime-forge
Leia AGENTS.md + HANDOFF + QUEUE.
Loop: L1 Build · Job: B1 Scaffold
Claim exclusivo no app novo.

Tarefa:
1. Copiar apps/waifu-chat → apps/<id> (id que eu passar)
2. Ajustar package.json name @anime-forge/<id>
3. app.config.ts: nome, seo, personas path, freePerDay
4. Registrar workspace se preciso (já é apps/*)
5. npm run build -w @anime-forge/<id> (ou root build se só um app)

Constraints:
- Não implementar billing/image
- Personas: reutilizar pack ou stub mínimo
- VERIFY: build deve passar

App id: <<< >>>
Ao falhar build: L1 fix (máx 3) ou BLOCK no HANDOFF.
Fim: HANDOFF + QUEUE + liberar claim.
```
