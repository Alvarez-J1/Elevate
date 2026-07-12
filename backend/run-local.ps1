# Start the Elevate backend against local PostgreSQL on localhost:5432.
# Requires: Java 21, Maven, and PostgreSQL running locally.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created backend/.env from .env.example."
}

Get-Content ".env" | ForEach-Object {
  if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
    $name = $matches[1].Trim()
    $value = $matches[2].Trim()
    [Environment]::SetEnvironmentVariable($name, $value, "Process")
  }
}

if (-not $env:ELEVATE_JWT_SECRET) {
  $env:ELEVATE_JWT_SECRET = "local-dev-only-jwt-secret-min-32-characters"
}

if (-not $env:DATABASE_URL) {
  $env:DATABASE_URL = "jdbc:postgresql://localhost:5432/postgres"
  $env:DATABASE_USERNAME = "postgres"
  $env:DATABASE_PASSWORD = "postgres"
}

$env:SPRING_PROFILES_ACTIVE = "local"
$env:ELEVATE_FRONTEND_ORIGIN = "http://localhost:3000"

Write-Host "Starting Elevate backend on http://localhost:8080 (profile: local)"
Write-Host "Swagger UI: http://localhost:8080/swagger-ui.html"
mvn spring-boot:run "-Dspring-boot.run.profiles=local"
