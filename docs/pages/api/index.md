---
layout: default
title: API Reference
nav_order: 3
has_children: true
---

# Dokumentacja API

Mailist API to RESTful API, które pozwala na pełną kontrolę nad Twoimi kampaniami email marketingowymi i transakcyjnymi.

## Podstawowe Informacje

### URL Bazowy

```
https://api.mailist.pl/v2
```

### Aktualna Wersja

API v2 (2025-01-21)

### Format Danych

Wszystkie żądania i odpowiedzi używają formatu JSON:

```
Content-Type: application/json
```

### Autentykacja

API wymaga autentykacji za pomocą klucza API przekazywanego w nagłówku:

```
Authorization: Bearer twój_klucz_api
```

[Więcej o autentykacji →](authentication.html)

---

## Endpoints

### Emails

Wysyłaj, zarządzaj i śledź emaile:

- `POST /emails` - Wyślij email
- `GET /emails/{id}` - Pobierz szczegóły emaila
- `GET /emails` - Lista wysłanych emaili
- `DELETE /emails/{id}` - Anuluj zaplanowany email

[Dokumentacja Emails API →](sending-emails.html)

### Lists

Zarządzaj listami subskrybentów:

- `POST /lists` - Utwórz listę
- `GET /lists` - Pobierz wszystkie listy
- `GET /lists/{id}` - Szczegóły listy
- `PUT /lists/{id}` - Aktualizuj listę
- `DELETE /lists/{id}` - Usuń listę

[Dokumentacja Lists API →](lists.html)

### Subscribers

Zarządzaj subskrybentami:

- `POST /subscribers` - Dodaj subskrybenta
- `GET /subscribers` - Lista subskrybentów
- `GET /subscribers/{id}` - Szczegóły subskrybenta
- `PUT /subscribers/{id}` - Aktualizuj subskrybenta
- `DELETE /subscribers/{id}` - Usuń subskrybenta

[Dokumentacja Subscribers API →](subscribers.html)

### Templates

Zarządzaj szablonami emaili:

- `POST /templates` - Utwórz szablon
- `GET /templates` - Lista szablonów
- `GET /templates/{id}` - Szczegóły szablonu
- `PUT /templates/{id}` - Aktualizuj szablon
- `DELETE /templates/{id}` - Usuń szablon

[Dokumentacja Templates API →](templates.html)

### Campaigns

Twórz i zarządzaj kampaniami:

- `POST /campaigns` - Utwórz kampanię
- `GET /campaigns` - Lista kampanii
- `GET /campaigns/{id}` - Szczegóły kampanii
- `POST /campaigns/{id}/send` - Wyślij kampanię

[Dokumentacja Campaigns API →](campaigns.html)

### Webhooks

Konfiguruj webhooks dla zdarzeń:

- `POST /webhooks` - Utwórz webhook
- `GET /webhooks` - Lista webhooków
- `DELETE /webhooks/{id}` - Usuń webhook

[Dokumentacja Webhooks API →](webhooks.html)

---

## Rate Limiting

API posiada limity żądań aby zapewnić stabilność dla wszystkich użytkowników:

| Plan | Żądań na minutę | Żądań na godzinę |
|------|-----------------|------------------|
| Free | 60 | 1,000 |
| Starter | 300 | 10,000 |
| Professional | 1,000 | 50,000 |
| Enterprise | Nieograniczone | Nieograniczone |

Nagłówki odpowiedzi informują o limicie:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642867200
```

## Obsługa Błędów

API zwraca standardowe kody HTTP oraz szczegółowe informacje o błędach:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Nieprawidłowy adres email",
    "field": "to.email",
    "type": "invalid_email"
  }
}
```

[Lista wszystkich kodów błędów →](errors.html)

---

## Przykładowe Implementacje

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <div class="card p-4 border border-default-200 rounded-lg">
    <h3 class="font-semibold mb-2">Node.js / JavaScript</h3>
    <pre><code class="language-bash">npm install @mailist/api-client</code></pre>
    <a href="../getting-started/quick-start.html#nodejs" class="text-primary text-sm hover:underline mt-2 inline-block">
      Zobacz przykład →
    </a>
  </div>

  <div class="card p-4 border border-default-200 rounded-lg">
    <h3 class="font-semibold mb-2">Python</h3>
    <pre><code class="language-bash">pip install mailist-python</code></pre>
    <a href="../getting-started/quick-start.html#python" class="text-primary text-sm hover:underline mt-2 inline-block">
      Zobacz przykład →
    </a>
  </div>

  <div class="card p-4 border border-default-200 rounded-lg">
    <h3 class="font-semibold mb-2">PHP</h3>
    <pre><code class="language-bash">composer require mailist/api-client</code></pre>
    <a href="../getting-started/quick-start.html#php" class="text-primary text-sm hover:underline mt-2 inline-block">
      Zobacz przykład →
    </a>
  </div>

  <div class="card p-4 border border-default-200 rounded-lg">
    <h3 class="font-semibold mb-2">cURL</h3>
    <p class="text-sm text-default-600">Bezpośrednie żądania HTTP</p>
    <a href="../getting-started/quick-start.html#curl" class="text-primary text-sm hover:underline mt-2 inline-block">
      Zobacz przykład →
    </a>
  </div>
</div>

---

## Testowanie API

Zalecamy testowanie API w środowisku testowym przed wdrożeniem do produkcji.

### Sandbox Environment

```
https://sandbox-api.mailist.pl/v2
```

W środowisku sandbox:
- Emaile nie są faktycznie wysyłane
- Możesz testować webhooks
- Klucze API sandbox są oddzielne od produkcyjnych

[Dowiedz się więcej o testowaniu →](testing.html)

---

## Potrzebujesz pomocy?

{: .tip }
> **Wskazówka**
> Sprawdź [przykłady użycia](examples.html) - zawierają one kompletne, działające implementacje popularnych scenariuszy.

Jeśli masz pytania lub napotkasz problemy:

1. Sprawdź [FAQ](../getting-started/faq.html)
2. Przeczytaj [częste błędy](errors.html)
3. [Skontaktuj się z naszym zespołem](https://mailist.pl#contact)
