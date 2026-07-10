# L1 / B5 — Ship check (1 iteração)

```
Repo: C:\Dev\anime-forge
Loop: L1 · Job: B5 Ship check
Claim curto.

Checklist:
- [ ] npm run build
- [ ] .env.example documenta vars
- [ ] free quota bloqueia (402 ou paywall) quando remaining=0
- [ ] disclaimer legal na UI
- [ ] HANDOFF Next claro para L0/P1 ou P4

Corrija só quebras de checklist (ponytail).
Smoke de key: GET /api/health — lê OPEN_ROUTER_API_KEY da env do sistema (**não pedir no chat**).
Se health.ok=false: HANDOFF com “setar OPEN_ROUTER_API_KEY no Windows”, sem solicitar o valor.
Reporte PASS/FAIL por item.
Fim: HANDOFF + QUEUE + claim.
```
