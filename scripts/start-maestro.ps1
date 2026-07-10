# Maestro HQ launcher — zero typing (duplo clique)
# Inicia Bernstein GUI + abre o painel visual da Anime Forge

$ErrorActionPreference = "Continue"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

$Port = 8052
$MaestroHtml = Join-Path $Root "maestro\index.html"
$UiUrl = "http://127.0.0.1:$Port/ui/"

Write-Host ""
Write-Host "  🎼  Maestro HQ — Anime Forge" -ForegroundColor Magenta
Write-Host "  Repo: $Root" -ForegroundColor DarkGray
Write-Host ""

# Bernstein on PATH?
$bern = Get-Command bernstein -ErrorAction SilentlyContinue
if (-not $bern) {
  Write-Host "  Bernstein não encontrado no PATH." -ForegroundColor Yellow
  Write-Host "  Instale: uv tool install bernstein" -ForegroundColor Yellow
  Write-Host "  Abrindo só o Maestro HQ local..." -ForegroundColor Yellow
  if (Test-Path $MaestroHtml) { Start-Process $MaestroHtml }
  pause
  exit 1
}

# Open branded HQ first
if (Test-Path $MaestroHtml) {
  Start-Process $MaestroHtml
  Write-Host "  ✓ Maestro HQ aberto (visual + roster)" -ForegroundColor Green
}

# Start GUI server if port free
$portInUse = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if (-not $portInUse) {
  Write-Host "  → Iniciando bernstein gui serve (porta $Port)..." -ForegroundColor Cyan
  Start-Process -FilePath "bernstein" -ArgumentList "gui","serve","--port",$Port -WorkingDirectory $Root -WindowStyle Minimized
  Start-Sleep -Seconds 3
} else {
  Write-Host "  ✓ Porta $Port já em uso (GUI talvez já rodando)" -ForegroundColor Green
}

Start-Sleep -Seconds 1
try {
  Start-Process $UiUrl
  Write-Host "  ✓ Bernstein GUI: $UiUrl" -ForegroundColor Green
} catch {
  Write-Host "  Abra manualmente: $UiUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "  Como usar:" -ForegroundColor White
Write-Host "  1. Maestro HQ = cara, roster, presets (clique)" -ForegroundColor DarkGray
Write-Host "  2. Bernstein GUI = execução ao vivo dos agents" -ForegroundColor DarkGray
Write-Host "  3. Modelos fixos em maestro/roster.json + team anime-forge" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Feche esta janela se quiser; a GUI continua em background." -ForegroundColor DarkGray
Write-Host ""
