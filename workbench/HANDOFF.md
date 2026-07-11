# HANDOFF

## Loop ativo
**L1 Build — anima-deck** · B3 UI polish **DONE** · próximo = B5 ship check + P3 deploy CF Pages

## Last agent
glm-front | 2026-07-11 | L1/B3 anima-deck

## Last iteration — L1/B3 anima-deck (2026-07-11)
- Photocard: entrance `af-reveal`, frame interno duplo, ● REC piscando (VHS), aura de speed-lines rotativa atrás do avatar (estética manga).
- Reveal WOW escalado por raridade: flash radial (intensidade por `--reveal-glow`) + pop dramático c/ rotação p/ épica/lendária.
- Intro: `af-reveal` na silhueta, glow no badge EP, 3 sparkles flutuantes; chips c/ pop+hover; botões c/ active/ghost-hover; reduce-motion global catch-all.
- ZERO deps novas, CSS-first; share/download/refazer intactos; i18n PT+EN preservado; sem IP de franquia.
- VERIFY: `npm run build -w @anime-forge/anima-deck` **PASS** (exit 0).
- **Next:** L1/B5 ship check static + **P3** CF Pages `deck.gbbragadev.com`.

## Done (produto)
| App | Status |
|-----|--------|
| **waifu-chat** | MVP + smoke OpenRouter + UI B3 GLM |
| **anime-quiz** | P0→B5 + **live** https://gbbragadev.github.io/anime-forge/ |
| **anima-deck** | P0 GO + P1 hooks + B1 scaffold + **B2 personas pack** (static) |

## Done (harness)
- Loops L0/L1/L2 multi-sub + Forge Autopilot (maestro)
- workbench QUEUE/HANDOFF/CLAIMS
- Guia visual, PLAYBOOK, ship matrix
- capability `static` em `@anime-forge/config`

## Next
1. **L1/B3** anima-deck — prompt GLM denso (photocard WOW; B1/B2 content ok, visual seco)
2. **L1/B5** ship check static + **P3** CF Pages `deck.gbbragadev.com`
3. Content na @otaku_sincero69 + **P4 measure** (humano)

## Blockers
- P4 measure = humano
- Deploy CF Pages = token/domínio
- B3 visual não feito neste job (enfileirado)

## Links
- App: `apps/anima-deck/`
- Personas: `content/personas/anima-deck-v1.json`
- Hooks: `docs/content-hooks-anima-deck.md`
- Scorecard: `docs/scorecard-anima-deck.md`
- Master (roadmap, não v0): `ideas/anima-deck-master.md`
- Quiz live: https://gbbragadev.github.io/anime-forge/
- Pipeline: `docs/AGENT-PIPELINE.md`

<!-- forge:begin -->
## Forge autopilot — anima-deck
- **Ideia:** # ANIMA//DECK v0 — Photocard Forge

> Wedge do prompt-mestre `ideas/anima-deck-master.md` (ler para visão completa das fases
> B0→C6). Este v0 valida o ciclo central com app ESTÁTICO (zero backend, zero API paga):
> **criar personagem original → photocard colecionável → printar/compartilhar**.

## Uma frase
Crie seu personagem de anime original em 6 passos e transforme-o numa photocard
colecionável com raridade — pronta pra printar e postar.

## Público
Otaku BR 16–28 da página @otaku_sincero69 (memes/edits): gosta de personalização,
colecionáveis, raridade e print que rende status no grupo. Mobile-first.

## O que o v0 faz (escopo FECHADO — nada além disso)
1. **Criador guiado em 6 passos** (100% client-side, SEM IA de imagem, SEM selfie):
   identidade/arquétipo → aparência (avatar paramétrico em SVG: rosto/cabelo/olhos
   combináveis, silhueta estilo anime ORIGINAL) → paleta → elemento (fogo/água/vento/
   sombra/luz) → classe (guardião/oráculo/duelista/artífice/invocador/mensageiro) →
   poder + frase de efeito.
2. **Sorteio de raridade** no clique de "forjar" (client, só cosmético):
   comum 55% · incomum 25% · rara 12% · épica 6% · lendária 2% — cada raridade muda
   moldura/brilho/acabamento do card (tabela visível pro usuário).
3. **Photocard 9:16** no design system ARCANA (packages/ui, tokens --af-*): moldura por
   raridade, monograma, elemento, classe, poder, frase, serial fake (#0001-#9999),
   selo "by @otaku_sincero69", ● REC + scanlines como no quiz.
4. **Share/download**: botão compartilhar (navigator.share/clipboard) + baixar o card
   como imagem (canvas a partir do SVG). Momento WOW curto na revelação da raridade
   (respeitar prefers-reduced-motion).
5. **Refazer**: gerar outro personagem sem limite (v0 não tem conta/inventário).

## Regras da casa
- PT-BR + EN (toggle padrão da factory, chave anime-forge-lang).
- Personagens 100% ORIGINAIS (traços paramétricos próprios; nada de franquia).
- Estética ARCANA (reusar packages/ui; olhar apps/anime-quiz como referência de
  qualidade do card).
- Static export → CF Pages, subdomínio deck.gbbragadev.com.

## Fora do v0 (é roadmap, NÃO implementar — ver anima-deck-master.md)
Contas/auth, banco, packs, inventário, duplicatas/evolução, Álbum Vivo, missões,
moeda, marketplace, geração por IA/selfie, moderação, admin. O v0 existe pra medir
se as pessoas CRIAM e COMPARTILHAM o card. Se o measure der GO, a fase B0 do master
entra com backend.

## Métrica do measure (P4)
Cards forjados (telemetria simples de evento no client se disponível sem backend;
senão tráfego CF) + posts/prints marcando a página.
- **Team:** grok-glm-front · **Status:** paused_gate
- **Job atual:** L1/B5 (6/7)
- **Branch:** pipeline/anima-deck · checkpoints: 5
- **⏸ GATE pendente:** `b3-visual` — UI polida. Preview: http://127.0.0.1:8787/preview/anima-deck/ (ou npm run dev). Aprova o visual? → `forge decide b3-visual go|kill`
_Atualizado 2026-07-11T04:44:39.884Z pelo forge (maestro/engine.mjs). Estado completo: maestro/pipeline.json_
<!-- forge:end -->
