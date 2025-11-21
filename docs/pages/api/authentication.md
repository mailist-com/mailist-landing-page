---
layout: default
title: Autentykacja
parent: API Reference
nav_order: 1
---

# Autentykacja

Mailist API wymaga autentykacji dla wszystkich żądań. Oferujemy dwa sposoby autentykacji: **Klucze API** (zalecane) oraz **OAuth 2.0**.

## Klucze API

Klucze API to najprostszy sposób autentykacji. Są idealne dla:
- Aplikacji serwerowych
- Skryptów automatyzacji
- Wewnętrznych narzędzi

### Generowanie Klucza API

1. Zaloguj się do [panelu Mailist](https://app.mailist.pl)
2. Przejdź do **Ustawienia** → **API Keys**
3. Kliknij **Utwórz Nowy Klucz**
4. Nadaj nazwę kluczowi (np. "Aplikacja Produkcyjna")
5. Wybierz uprawnienia (opcjonalnie)
6. Kliknij **Utwórz**

{: .warning }
> **Bezpieczeństwo**
> - Zapisz klucz w bezpiecznym miejscu - pokazujemy go tylko raz!
> - Nigdy nie commituj kluczy do repozytorium
> - Używaj zmiennych środowiskowych do przechowywania kluczy
> - Regularnie rotuj klucze API

### Użycie Klucza API

Przekaż klucz API w nagłówku `Authorization` z prefiksem `Bearer`:

```bash
curl -X GET https://api.mailist.pl/v2/account \
  -H "Authorization: Bearer ml_live_abc123def456" \
  -H "Content-Type: application/json"
```

#### Node.js

```javascript
const Mailist = require('@mailist/api-client');

const client = new Mailist({
  apiKey: process.env.MAILIST_API_KEY
});
```

#### Python

```python
from mailist import MailistClient
import os

client = MailistClient(
    api_key=os.environ.get('MAILIST_API_KEY')
)
```

#### PHP

```php
<?php
require 'vendor/autoload.php';

use Mailist\MailistClient;

$client = new MailistClient([
    'api_key' => getenv('MAILIST_API_KEY')
]);
```

### Typy Kluczy

Mailist używa różnych prefiksów aby identyfikować środowisko:

| Prefiks | Środowisko | Opis |
|---------|-----------|------|
| `ml_live_` | Produkcja | Klucze produkcyjne - wysyłają prawdziwe emaile |
| `ml_test_` | Test | Klucze testowe - emaile nie są wysyłane |

{: .tip }
> **Wskazówka**
> Zawsze testuj swoją integrację z kluczami testowymi przed użyciem kluczy produkcyjnych.

---

## OAuth 2.0

OAuth 2.0 jest zalecany dla:
- Aplikacji publicznych
- Aplikacji mobilnych
- Aplikacji które zarządzają wieloma kontami Mailist

### Rejestracja Aplikacji OAuth

1. Przejdź do **Ustawienia** → **OAuth Applications**
2. Kliknij **Nowa Aplikacja**
3. Wypełnij szczegóły:
   - **Nazwa aplikacji**: Wyświetlana użytkownikom
   - **Redirect URI**: URL przekierowania po autoryzacji
   - **Webhook URL**: Opcjonalny endpoint dla webhooków
4. Zapisz **Client ID** i **Client Secret**

### Flow Authorization Code

Jest to najbezpieczniejszy flow OAuth, zalecany dla aplikacji webowych.

#### Krok 1: Przekieruj użytkownika do autoryzacji

```
GET https://app.mailist.pl/oauth/authorize?
  client_id=your_client_id
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=emails.send lists.read
  &state=random_string_for_security
```

Parametry:
- `client_id` <span class="parameter-required">wymagany</span> - ID Twojej aplikacji
- `redirect_uri` <span class="parameter-required">wymagany</span> - URL przekierowania
- `response_type` <span class="parameter-required">wymagany</span> - Zawsze `code`
- `scope` <span class="parameter-optional">opcjonalny</span> - Zakres uprawnień
- `state` <span class="parameter-required">wymagany</span> - Losowy string dla bezpieczeństwa

#### Krok 2: Użytkownik autoryzuje aplikację

Użytkownik loguje się i akceptuje uprawnienia.

#### Krok 3: Otrzymujesz kod autoryzacyjny

Mailist przekierowuje użytkownika do Twojego `redirect_uri`:

```
https://yourapp.com/callback?
  code=AUTH_CODE_HERE
  &state=random_string_for_security
```

#### Krok 4: Wymień kod na token

```bash
curl -X POST https://app.mailist.pl/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "code": "AUTH_CODE_HERE",
    "grant_type": "authorization_code",
    "redirect_uri": "https://yourapp.com/callback"
  }'
```

Odpowiedź:

```json
{
  "access_token": "ml_oauth_abc123",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "ml_refresh_xyz789",
  "scope": "emails.send lists.read"
}
```

#### Krok 5: Użyj tokenu dostępu

```bash
curl -X GET https://api.mailist.pl/v2/account \
  -H "Authorization: Bearer ml_oauth_abc123"
```

### Odświeżanie Tokenu

Tokeny dostępu wygasają po 1 godzinie. Użyj refresh tokenu aby otrzymać nowy:

```bash
curl -X POST https://app.mailist.pl/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "refresh_token": "ml_refresh_xyz789",
    "grant_type": "refresh_token"
  }'
```

---

## Uprawnienia (Scopes)

Możesz ograniczyć uprawnienia kluczy API i tokenów OAuth:

| Scope | Opis |
|-------|------|
| `emails.send` | Wysyłanie emaili |
| `emails.read` | Odczyt emaili i ich statusów |
| `lists.read` | Odczyt list subskrybentów |
| `lists.write` | Tworzenie i modyfikacja list |
| `subscribers.read` | Odczyt subskrybentów |
| `subscribers.write` | Dodawanie i modyfikacja subskrybentów |
| `templates.read` | Odczyt szablonów |
| `templates.write` | Tworzenie i modyfikacja szablonów |
| `campaigns.read` | Odczyt kampanii |
| `campaigns.write` | Tworzenie i wysyłanie kampanii |
| `account.read` | Odczyt informacji o koncie |
| `webhooks.write` | Zarządzanie webhookami |

{: .note }
> **Domyślne uprawnienia**
> Jeśli nie określisz uprawnień, klucz/token będzie miał pełny dostęp do wszystkich zasobów.

---

## Najlepsze Praktyki

### 1. Używaj Zmiennych Środowiskowych

**NIE TAK:**
```javascript
const client = new Mailist({
  apiKey: 'ml_live_abc123def456'  // ❌ Nigdy nie hardcoduj kluczy!
});
```

**TAK:**
```javascript
const client = new Mailist({
  apiKey: process.env.MAILIST_API_KEY  // ✅ Używaj zmiennych środowiskowych
});
```

### 2. Rotuj Klucze Regularnie

Zmieniaj klucze API co kilka miesięcy:

1. Utwórz nowy klucz
2. Zaktualizuj swoją aplikację
3. Testuj z nowym kluczem
4. Usuń stary klucz

### 3. Używaj Minimalnych Uprawnień

Nadawaj tylko te uprawnienia, które są niezbędne:

```javascript
// Jeśli tylko wysyłasz emaile
const client = new Mailist({
  apiKey: 'ml_live_abc123',
  scopes: ['emails.send']
});
```

### 4. Monitoruj Użycie

Sprawdzaj logi dostępu w panelu aby wykryć nieautoryzowane użycie.

### 5. Zabezpiecz Webhooks

Weryfikuj podpisy webhooków aby upewnić się że pochodzą od Mailist.

[Dowiedz się o zabezpieczaniu webhooków →](webhooks.html#signature-verification)

---

## Obsługa Błędów Autentykacji

### 401 Unauthorized

Klucz API jest nieprawidłowy lub wygasł:

```json
{
  "error": {
    "code": "unauthorized",
    "message": "Nieprawidłowy klucz API"
  }
}
```

**Rozwiązanie:**
- Sprawdź czy klucz jest poprawny
- Upewnij się że nie wygasł
- Wygeneruj nowy klucz jeśli potrzeba

### 403 Forbidden

Klucz jest prawidłowy, ale nie ma wymaganych uprawnień:

```json
{
  "error": {
    "code": "forbidden",
    "message": "Brak uprawnień do tego zasobu",
    "required_scope": "emails.send"
  }
}
```

**Rozwiązanie:**
- Dodaj wymagane uprawnienia do klucza
- Lub użyj klucza z odpowiednimi uprawnieniami

---

## Następne Kroki

- [Wyślij pierwszy email →](sending-emails.html)
- [Skonfiguruj webhooks →](webhooks.html)
- [Zarządzaj listami →](lists.html)
