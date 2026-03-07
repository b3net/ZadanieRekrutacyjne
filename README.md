# Zadanie Rekrutacyjne - MediaExpert

## Struktura Projektu

- `mediaexpert/` - Aplikacja frontowa
- `mediaexpert_api/` - RestAPI backend

## Jak uruchomić projekt

### 1. Uruchomienie Backend

Wymagany .NET 8 SDK.

```bash
cd mediaexpert_api
dotnet run
```

API dostępne pod adresem: `http://localhost:5000` (Swagger: `http://localhost:5000/swagger`)

### 2. Uruchomienie Frontend

```bash
cd mediaexpert
npm install
npm start
```

Aplikacja dostępna pod adresem: `http://localhost:4200`
