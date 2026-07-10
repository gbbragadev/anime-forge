# Prompts para GLM 5.2 MAX (frontend forte)

Grok/Codex **não** implementam UI pesada — geram prompt aqui; o user cola no GLM.

## Lição (2026-07-10 · anime-quiz B3)

| | Antes (prompt fraco / só B1) | Depois (prompt elaborado) |
|--|------------------------------|---------------------------|
| Sensação | form texto-puro | app anime printável |
| Score user | ~**4/10** | ~**7.5/10** |
| Causa | B1 YAGNI + brief vago | brief denso + metas por tela |

**GLM é forte na construção; fraco em inventar direção se o brief for ralo.**  
Hoje tudo compete por **apelo visual** — o prompt é o design brief.

## Checklist obrigatório de um bom prompt B3

1. **Diagnóstico** — o que o user sentiu (“só texto”, “sem anime”, etc.)
2. **Metas por tela** — intro / fluxo principal / resultado / share (bullets verificáveis)
3. **Arquivos-alvo** — paths reais no monorepo
4. **Restrições** — não quebrar score/API, sem IP, YAGNI deps, mobile-first
5. **Anti-padrões** — purple slop, emoji spam, next/font se quebra offline…
6. **VERIFY** — `npm run build:…`, claim, QUEUE, HANDOFF
7. **DoD user-facing** — “em 2s sente X”, não só “código ok”

## Arquivos

| Prompt | App / job |
|--------|-----------|
| `L1-B3-ui-polish-waifu-chat.md` | waifu-chat polish (share + empty + mobile) |
| `L1-B3-ui-anime-theme-anime-quiz.md` | anime-quiz tema / visual punch |

## Ao gerar um prompt novo

- Copiar estrutura de um dos arquivos acima  
- Anexar feedback literal do user quando houver  
- Atualizar HANDOFF Next + QUEUE “prompt GLM pronto”
