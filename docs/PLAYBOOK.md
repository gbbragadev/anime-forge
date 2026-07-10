# Playbook — Anime Forge (L0 Product Loop)

Pipeline de **negócio**. Código e handoff de agentes: `docs/AGENT-PIPELINE.md`.

## L0 em uma volta

```
P0 score ──go──► P1 content test ──sinal──► P2 L1 build ──► P3 ship
                                                      │
P5 kill|scale ◄── P4 measure (5–7 dias) ◄─────────────┘
```

## Scorecard P0 (5 min)

| Critério | Peso |
|----------|------|
| Hook em 1 frase + visual shareable | alto |
| Capability já existe? (`chat` / `image`) | alto |
| Custo API < preço coin | alto |
| Fit audiência anime | alto |
| Risco legal OK | alto |

Capability **não** existe e score baixo → só conteúdo, **sem** L1.

## P1 Content

15–30 Reels/TikTok na conta anime (primo).  
Hooks: prompt `docs/prompts/L0-P1-content-hooks.md`.  
CTA: link na bio. **Não** pivotar a conta para outro nicho.

## P2–P3 Build + ship

Entra no **L1** (B1→B5). Ver AGENT-PIPELINE.  
Deploy Vercel quando smoke OK.

## P4–P5 Measure → Kill|Scale

Prompt: `docs/prompts/L0-P4-measure-kill.md`.  
Kill se bio não converter em ~5–7 dias.  
Scale = novos jobs L1 (polish, personas, image) na QUEUE.

## Monetização padrão

- Free: 2/dia + watermark  
- Coins: R$4,99 / 9,99 / 19,99  
- Weekly: R$9,90–14,90  

## Apps na fila (ideias)

1. WaifuChat (`chat`) — MVP em curso  
2. Anime Me / haifu (`image`)  
3. Polaroid/photocard  
4. Quiz personagem  
5. Fanfic instantânea  

Cada um = **novo L0**, não feature escondida no app anterior.

## Anti-padrões

- Super-app com 20 features  
- App Store cedo  
- Pivotar conta anime  
- Modelo caro no free  
- Redesign UI por app  
- Abrir L0 novo com L1 vermelho no app atual  
