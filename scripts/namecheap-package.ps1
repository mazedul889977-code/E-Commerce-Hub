$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$distDir = Join-Path $repoRoot "artifacts\ak-products\dist\public"
$packageDir = Join-Path $repoRoot "deploy"
$zipPath = Join-Path $packageDir "yallomart-namecheap-upload.zip"

Set-Location $repoRoot
corepack pnpm --filter "@workspace/ak-products" run build:namecheap

if ($LASTEXITCODE -ne 0) {
  throw "Namecheap build failed. ZIP package was not created."
}

if (!(Test-Path $distDir)) {
  throw "Build output was not found at $distDir"
}

if (Test-Path $packageDir) {
  Remove-Item -LiteralPath $packageDir -Recurse -Force
}

New-Item -ItemType Directory -Path $packageDir | Out-Null
Compress-Archive -Path (Join-Path $distDir "*") -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "Namecheap upload package is ready:"
Write-Host $zipPath
Write-Host ""
Write-Host "Upload this ZIP to cPanel public_html, extract it there, then confirm index.html is directly inside public_html."
