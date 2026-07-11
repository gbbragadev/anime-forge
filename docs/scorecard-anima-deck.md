# Scorecard L0/P0 — ANIMA//DECK v0 (Photocard Forge)

**Data:** 2026-07-11 · **Agent:** grok-solo · **Job:** L0/P0  
**App id:** `anima-deck` · **Capability:** `static`  
**Ideia (wedge):** Criador guiado 6 passos → photocard 9:16 com raridade → share/download.  
**Master:** `ideas/anima-deck-master.md` (B0→C6 = roadmap; **fora** do v0).

## Veredito

# **GO** (condicionado a content-first + escopo v0 fechado)

**Não scaffoldar L1 ainda.** Próximo step = **L0/P1** hooks (`docs/content-hooks-anima-deck.md`) → bio/CTA da @otaku_sincero69 → só então L1/B1 se houver sinal (ou user “pode decidir e seguir”).

## Scorecard (PLAYBOOK)

| Critério | Peso | Nota (1–5) | Comentário |
|----------|------|------------|------------|
| Hook 1 frase + visual shareable | alto | **5** | “Forjei minha photocard anime — raridade [X]” + card 9:16 printável = Stories/Reels/grupo WhatsApp nativo; WOW no reveal de raridade |
| Capability já existe? | alto | **4** | Free path = **static** (igual quiz: `output: "export"`). Reusa ARCANA (`packages/ui`, tokens `--af-*`), card/share/REC/scanlines do anime-quiz. **Não** precisa `chat` nem `image` no v0. Gap: avatar paramétrico SVG + wizard 6 passos = FE novo, sem capability de plataforma |
| Custo API &lt; preço coin | alto | **5** | Zero backend, zero API paga no free path; raridade e serial 100% client. Static → CF Pages (`deck.gbbragadev.com`) |
| Fit audiência anime | alto | **5** | Photocard + raridade + print de status no nicho otaku 16–28; canal direto @otaku_sincero69 (memes/edits) — encaixa personalização e colecionável |
| Risco legal OK | alto | **4** | **GO com traços paramétricos ORIGINAIS** (rosto/cabelo/olhos/classes genéricas). **NO-GO** se presets ou copy imitarem franquia (nomes, uniformes, “você é [obra]”). User pode *tentar* cosplay visual — mitigar: arquétipos genéricos, sem skins de IP |
| Tempo MVP | — | **4** | Clone shell quiz + wizard + SVG combinável + canvas export. Mais FE que quiz JSON, mas sem auth/DB/IA; B3 visual → prompt GLM (não bloquear B1 seco) |

**Média ponderada (intuitiva): ~4,5/5 → GO.**

## 3 porquês (resumo)

1. **Share é o produto** — o ciclo criar → forjar raridade → printar/postar é o loop de status do público; measure (P4) = cards forjados + posts marcando a página, sem inventário.
2. **Custo e risco técnicos baixos** — static puro, capability já provada no monorepo (quiz shippado); zero burn de API no free path.
3. **Wedge disciplinado** — v0 valida desejo de criar/compartilhar **antes** do master (packs, álbum, backend). Se measure matar, não se construiu B0–C6.

## Riscos / condições do GO

| Risco | Mitigação |
|-------|-----------|
| Escopo creep pro master (auth, packs, álbum vivo, IA/selfie) | **Hard stop v0** no brief; P0/P1/B1 só criador + card + share. Backend = pós-measure GO |
| Avatar SVG “feio” mata o share | B1 funcional seco OK; **B3** (GLM + brief denso) obrigatório antes de ship se o card for o hook |
| IP / cosplay de franquia | Só arquétipos/elementos/classes originais; review de copy e presets no B2/content |
| Capability `image` confusa com polaroid/haifu do PLAYBOOK | v0 **não** é gen IA; capability efetiva = `static` (wizard + SVG). Não enfileirar job image |
| Measure fraco sem backend | Evento client leve (localStorage counter / `dataLayer` se houver) + tráfego CF + UGC marcando página |
| Canibalizar quiz | App separado `anima-deck` + subdomínio `deck.gbbragadev.com`; CTA de conta unificada na bio |
| Build cedo demais | **Proibido L1/B1 até P1** (default) |

## Escopo MVP v0 (quando L1 liberar — só referência, **não codar agora**)

1. Wizard 6 passos client-side (identidade → aparência SVG → paleta → elemento → classe → poder/frase)
2. Forjar → sorteio raridade (55/25/12/6/2) cosmético + tabela visível
3. Photocard 9:16 ARCANA (moldura, monograma, serial fake, selo @otaku_sincero69, ● REC + scanlines)
4. Share (`navigator.share`/clipboard) + download (canvas a partir do SVG); WOW reveal com `prefers-reduced-motion`
5. Refazer sem conta; i18n PT-BR + EN (`anime-forge-lang`)
6. Deploy static → CF Pages / `deck.gbbragadev.com`

**Fora do v0:** contas, DB, packs, inventário, duplicatas, Álbum Vivo, missões, moeda, marketplace, IA/selfie, moderação, admin.

## NO-GO se…

- Dependência de modelo de imagem/IA no free path do v0
- Resultado ou presets que copiem personagem/obra licenciada
- Scaffold com inventário/auth “porque o master pede” antes do measure
- Virar feature escondida dentro de anime-quiz/waifu-chat

## Próximo step (1 linha)

**GO → L0/P1:** 15 content hooks PT-BR + EN (ou PT com EN no build) do **anima-deck** → `docs/content-hooks-anima-deck.md` (CTA URL quando ship existir; sem código de app).

## Conteúdo sem código (validação paralela)

Mesmo com GO: 3–5 posts/Stories na @otaku_sincero69 no formato “criei meu personagem / raridade lendária?” (mock de card se precisar) **antes ou durante P1**; se engajamento morto → kill sem B1.
