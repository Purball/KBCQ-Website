# KBCQ Zip Builder - Safe ASCII Version
$projectPath = $PSScriptRoot
$zipPath = Join-Path $projectPath "KBCQ-Website.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$projectPath\*" -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "ZIP Created Successfully!"
Write-Host "Path: $zipPath"
