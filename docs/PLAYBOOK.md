# Playbook — Anime Forge (L0 Product Loop)

Pipeline de **negócio**. Código e handoff: `docs/AGENT-PIPELINE.md`.

## L0 em uma volta

```
P0 score ──go──► P1 content test ──sinal|decisão──► P2 L1 build ──► P3 ship
                                                                      │
P5 kill|scale ◄── P4 measure (5–7 dias) ◄─────────────────────────────┘
```

## Scorecard P0 (5 min)

| Critério | Peso |
|----------|------|
| Hook em 1 frase + visual shareable | alto |
| Capability já existe? (`chat` / `quiz` / `image`) | alto |
| Custo API &lt; preço coin (static free path = 5/5) | alto |
| Fit audiência anime | alto |
| Risco legal OK (arquétipos &gt; IP) | alto |

Capability **não** existe e score baixo → só conteúdo, **sem** L1.  
Sempre salvar: `docs/scorecard-<app-id>.md`.

## P1 Content

15 hooks PT-BR (`docs/content-hooks-<id>.md`).  
CTA: **URL ship** na bio quando existir (ex. Pages).  
**Não** pivotar a conta anime para outro nicho.

## P2 Build (L1)

Ordem típica:

1. **B1** scaffold — funcional (visual seco OK)  
2. **B2** personas/arquétipos se precisar  
3. **B3** apelo visual — **GLM + prompt denso** (não pular se o produto é share)  
4. **B4** API se chat  
5. **B5** ship-check  

B1 sem P1 só com user “pode decidir e seguir”.

## P3 Ship

| Tipo app | Path |
|----------|------|
| Static (`output: "export"`) | GitHub Pages workflow |
| Server (API) | Vercel + env keys |

Exemplo: AnimeQuiz → https://gbbragadev.github.io/anime-forge/

## P4–P5 Measure → Kill|Scale

Prompt: `docs/prompts/L0-P4-measure-kill.md`.  
Kill se bio não converter em ~5–7 dias.  
Scale = novos jobs L1 (polish, personas, image) na QUEUE.

## Monetização padrão

- Free: 2/dia + watermark (chat) · quiz pode ser free unlimited no free path  
- Coins: R$4,99 / 9,99 / 19,99  
- Weekly: R$9,90–14,90  

## Apps

| App | Capability | Status (2026-07) |
|-----|------------|------------------|
| WaifuChat | chat | MVP + smoke |
| AnimeQuiz | quiz | **shipped** Pages |
| Anime Me / haifu | image | ideia — P0 antes de L1 |
| Polaroid/photocard | image | ideia |
| Fanfic instantânea | chat | ideia |

Cada um = **novo L0**, não feature escondida no app anterior.

## Anti-padrões

- Super-app com 20 features  
- App Store cedo  
- Pivotar conta anime  
- Modelo caro no free  
- Redesign UI **no B1** (deixar pro B3)  
- Abrir L0 novo com L1 vermelho no app atual  
- Scaffold sem P0 GO  
- Prompt B3 de 3 linhas (“fica bonito”)  
