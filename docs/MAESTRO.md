# Maestro HQ — cara + controle visual do Bernstein

## O problema

Bernstein por padrão é **CLI-first** (`bernstein live`, `bernstein -g "..."`).  
Você quer:

1. **Visual** na execução (sem ficar digitando comando)
2. **Controle total** dos modelos/CLIs despachados
3. **Pré-mapeados** (sem `cli: auto` cego)
4. Uma **“cara”** — identidade do maestro, não um tool genérico

## A solução: Maestro

| Peça | Função |
|------|--------|
| **Maestro** | Persona/identidade (avatar, voz, tagline) |
| **Orquestra (players)** | Cada “músico” = CLI + model + jobs |
| **Dispatch map** | Job L0/L1 → player fixo |
| **Presets** | Goals de 1 clique |
| **Bernstein GUI** | Tela nativa de execução ao vivo (`:8052/ui`) |
| **start-maestro.ps1** | Sobe GUI + abre HQ (zero typing) |

```
Você clica no Maestro HQ
        │
        ├─► escolhe preset / goal
        ├─► copia goal (1 clique)
        └─► Bernstein GUI mostra agents rodando

Roster (quem toca o quê) = maestro/roster.json
Team Bernstein           = templates/teams/anime-forge.toml
```

## Começar sem digitar

1. No Explorer: duplo clique em  
   `C:\Dev\anime-forge\scripts\start-maestro.ps1`  
   (ou botão direito → Executar com PowerShell)
2. Abre **Maestro HQ** + **Bernstein GUI**
3. No HQ: clique num **preset** → **Copiar goal + abrir GUI**
4. Na GUI do Bernstein: cole/rode o goal (conforme a UI do Bernstein)
5. Acompanhe a execução na GUI (não no terminal)

Atalho: crie um atalho do `.ps1` na área de trabalho e mude o ícone se quiser.

## Controlo de modelos (pré-mapeado)

Edite **`maestro/roster.json`**:

```json
{
  "id": "codex-backend",
  "cli": "codex",
  "model": "default",
  "jobs": ["B1", "B4", "B5"]
}
```

Team espelho em **`templates/teams/anime-forge.toml`**  
e `team: anime-forge` no **`bernstein.yaml`**.

### Mapa default

| Job | Player | CLI |
|-----|--------|-----|
| L1/B1 scaffold | Codex Engine | codex |
| L1/B2 personas | Gemini Spark | gemini (opcional) |
| L1/B3 UI | Claude Front | claude / sonnet |
| L1/B4 API | Codex Engine | codex |
| L1/B5 ship | Claude QA | claude |
| L0 P0/P1 | Gemini Spark | gemini / fallback Claude |

## Cara do Maestro

Definida em `roster.json` → `maestro`:

- `name`, `tagline`, `avatar`, `voice`, `color`
- Troque o emoji/avatar ou copie o estilo pro branding dos apps

Isso é a **skin** da orquestra Anime Forge — não o genérico “Bernstein operator”.

## O que a GUI nativa já dá

```powershell
bernstein gui serve     # http://127.0.0.1:8052/ui/
bernstein live          # TUI 3 colunas (se quiser terminal bonito)
bernstein dashboard     # abre browser na GUI
```

Maestro HQ **não substitui** a GUI de execução; ele é a **recepção + partitura + caras**.  
A GUI Bernstein é o **palco ao vivo**.

## Limite do browser

HTML local **não pode** spawnar `codex`/`claude` sozinho (sandbox do browser).  
Por isso o fluxo é: **HQ (clique) → goal na área de transferência → GUI Bernstein (execução)**.

Se no futuro quiser botão “Run” 100% na página, dá para um mini servidor local (`maestro/server.mjs`) que chama `bernstein -g` — fase 2.

## Arquivos

| Path | Papel |
|------|--------|
| `maestro/index.html` | HQ visual |
| `maestro/roster.json` | Caras + models + presets |
| `templates/teams/anime-forge.toml` | Team Bernstein pinado |
| `bernstein.yaml` | `team: anime-forge` |
| `scripts/start-maestro.ps1` | Launch 1 clique |
| `docs/MAESTRO.md` | este doc |

## Relação com workbench

| Camada | Ferramenta |
|--------|------------|
| Multi-sub / Grok / handoff | workbench |
| Orquestra visual + models fixos | **Maestro + Bernstein** |
| Chat do usuário final | Z.AI (`ZAI_API_KEY`) |
