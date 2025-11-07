---
layout: default
title: API Reference
nav_order: 3
has_children: true
permalink: /api
---

# API Reference
{: .no_toc }

Kompletna dokumentacja Mailist REST API v3
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Wprowadzenie

Mailist API to RESTful API umożliwiające pełną integrację z platformą. Dzięki API możesz:

- ✅ Zarządzać kontaktami i listami
- ✅ Wysyłać kampanie i transactional emails
- ✅ Tworzyć i zarządzać automation workflows
- ✅ Pobierać statystyki i raporty
- ✅ Konfigurować webhooks
- ✅ Zarządzać szablonami i segmentami

## Base URL

```
https://api.mailist.com/v3
```

### Regiony

Mailist działa w dwóch regionach:

| Region | Base URL | Lokalizacja |
|--------|----------|-------------|
| EU | `https://eu.api.mailist.com/v3` | Frankfurt, Germany |
| US | `https://us.api.mailist.com/v3` | Virginia, USA |

## Autoryzacja

### API Keys

Wszystkie zapytania do API wymagają autoryzacji przez API key w headerze:

```bash
curl https://api.mailist.com/v3/contacts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Generowanie API Key

1. Zaloguj się do [app.mailist.com](https://app.mailist.com)
2. Przejdź do **Settings → API Keys**
3. Kliknij **Create New API Key**
4. Nazwij klucz i ustaw uprawnienia
5. Skopiuj klucz (nie będzie ponownie wyświetlony!)

### Rodzaje kluczy

```yaml
Full Access:
  - Pełen dostęp do wszystkich zasobów
  - Zalecany tylko dla backend applications

Read Only:
  - Tylko odczyt danych
  - Bezpieczny dla analytics i reporting

Custom:
  - Wybierz konkretne uprawnienia
  - campaigns: read, write
  - contacts: read, write
  - automation: read, write
```

### Bearer Token Authentication

```javascript
// JavaScript/Node.js
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

const response = await fetch('https://api.mailist.com/v3/contacts', {
  headers: headers
});
```

```python
# Python
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.mailist.com/v3/contacts',
    headers=headers
)
```

```php
// PHP
$headers = [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
];

$ch = curl_init('https://api.mailist.com/v3/contacts');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($ch);
```

## Rate Limiting

### Limity

| Plan | Requests/minute | Requests/hour | Requests/day |
|------|----------------|---------------|--------------|
| Starter | 60 | 1,000 | 10,000 |
| Professional | 300 | 10,000 | 100,000 |
| Enterprise | Custom | Custom | Custom |

### Response Headers

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1699360800
```

### Rate Limit Exceeded

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 42 seconds",
    "retry_after": 42
  }
}
```

**Best Practice:** Implementuj exponential backoff przy błędzie 429:

```javascript
async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || Math.pow(2, i);
      await sleep(retryAfter * 1000);
      continue;
    }

    return response;
  }

  throw new Error('Max retries exceeded');
}
```

## HTTP Methods

| Method | Użycie |
|--------|--------|
| `GET` | Pobieranie zasobów |
| `POST` | Tworzenie nowych zasobów |
| `PUT` | Aktualizacja całego zasobu |
| `PATCH` | Częściowa aktualizacja zasobu |
| `DELETE` | Usunięcie zasobu |

## Response Codes

### Success Codes

| Code | Znaczenie | Przykład |
|------|-----------|----------|
| `200 OK` | Sukces | GET, PUT, PATCH |
| `201 Created` | Zasób utworzony | POST |
| `204 No Content` | Sukces bez zwrotu danych | DELETE |

### Error Codes

| Code | Znaczenie | Co zrobić? |
|------|-----------|------------|
| `400 Bad Request` | Błędne parametry | Sprawdź format requestu |
| `401 Unauthorized` | Brak/nieprawidłowy API key | Sprawdź autoryzację |
| `403 Forbidden` | Brak uprawnień | Sprawdź uprawnienia API key |
| `404 Not Found` | Zasób nie istnieje | Sprawdź ID zasobu |
| `422 Unprocessable Entity` | Błąd walidacji | Sprawdź wymagane pola |
| `429 Too Many Requests` | Rate limit exceeded | Poczekaj i spróbuj ponownie |
| `500 Internal Server Error` | Błąd serwera | Zgłoś do supportu |
| `503 Service Unavailable` | Serwis niedostępny | Spróbuj później |

### Error Response Format

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid email address",
    "details": {
      "field": "email",
      "value": "invalid-email",
      "constraint": "email format"
    }
  }
}
```

## Pagination

### Query Parameters

```bash
GET /v3/contacts?page=2&per_page=50
```

| Parameter | Default | Max | Opis |
|-----------|---------|-----|------|
| `page` | 1 | - | Numer strony |
| `per_page` | 25 | 100 | Ilość elementów na stronę |

### Response Format

```json
{
  "data": [...],
  "pagination": {
    "current_page": 2,
    "per_page": 50,
    "total_pages": 10,
    "total_count": 487,
    "links": {
      "first": "https://api.mailist.com/v3/contacts?page=1",
      "prev": "https://api.mailist.com/v3/contacts?page=1",
      "next": "https://api.mailist.com/v3/contacts?page=3",
      "last": "https://api.mailist.com/v3/contacts?page=10"
    }
  }
}
```

## Filtering & Sorting

### Filtering

```bash
# Filtruj po email domain
GET /v3/contacts?filter[email]=*@gmail.com

# Filtruj po tag
GET /v3/contacts?filter[tags]=customer,vip

# Filtruj po created_at
GET /v3/contacts?filter[created_at][gte]=2024-01-01
```

### Sorting

```bash
# Sortuj po created_at descending
GET /v3/contacts?sort=-created_at

# Sortuj po email ascending
GET /v3/contacts?sort=email

# Multiple sort
GET /v3/contacts?sort=-created_at,email
```

## Field Selection

Wybierz konkretne pola do zwrócenia:

```bash
GET /v3/contacts?fields=id,email,first_name,tags
```

Response:

```json
{
  "data": [
    {
      "id": "cnt_123abc",
      "email": "jan@example.com",
      "first_name": "Jan",
      "tags": ["customer", "vip"]
    }
  ]
}
```

## Webhooks

### Event Types

Mailist wysyła webhooks dla następujących eventów:

```yaml
Email Events:
  - email.sent
  - email.delivered
  - email.opened
  - email.clicked
  - email.bounced
  - email.complained

Contact Events:
  - contact.created
  - contact.updated
  - contact.deleted
  - contact.subscribed
  - contact.unsubscribed

Campaign Events:
  - campaign.started
  - campaign.completed
  - campaign.failed

Automation Events:
  - automation.entered
  - automation.completed
  - automation.exited
```

### Webhook Payload

```json
{
  "event": "email.opened",
  "timestamp": "2024-11-07T10:30:00Z",
  "data": {
    "email_id": "eml_123abc",
    "contact": {
      "id": "cnt_456def",
      "email": "jan@example.com"
    },
    "campaign": {
      "id": "cmp_789ghi",
      "name": "Welcome Series #1"
    },
    "metadata": {
      "user_agent": "Mozilla/5.0...",
      "ip_address": "192.168.1.1",
      "location": {
        "country": "PL",
        "city": "Warsaw"
      }
    }
  }
}
```

### Webhook Security

Zweryfikuj autentyczność webhooków:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

// Użycie w Express.js
app.post('/webhooks/mailist', (req, res) => {
  const signature = req.headers['x-mailist-signature'];
  const isValid = verifyWebhook(req.body, signature, WEBHOOK_SECRET);

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Process webhook
  handleWebhook(req.body);
  res.status(200).send('OK');
});
```

## Quick Start Examples

### Wyślij transactional email

```javascript
const response = await fetch('https://api.mailist.com/v3/emails/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'customer@example.com',
    template: 'order-confirmation',
    data: {
      order_id: '12345',
      total: '$99.99',
      items: [
        { name: 'Product A', qty: 2, price: '$39.99' },
        { name: 'Product B', qty: 1, price: '$20.00' }
      ]
    }
  })
});

const result = await response.json();
console.log(`Email sent! ID: ${result.id}`);
```

### Dodaj kontakt

```javascript
const contact = await fetch('https://api.mailist.com/v3/contacts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'nowy@kontakt.pl',
    first_name: 'Jan',
    last_name: 'Kowalski',
    tags: ['newsletter', 'website'],
    custom_fields: {
      source: 'landing_page',
      interests: ['ai', 'marketing']
    }
  })
});
```

### Utwórz kampanię

```javascript
const campaign = await fetch('https://api.mailist.com/v3/campaigns', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'November Newsletter',
    subject: 'New features you\'ll love 🚀',
    from_name: 'Mailist Team',
    from_email: 'hello@mailist.com',
    template_id: 'tpl_newsletter_01',
    segment_id: 'seg_active_users',
    schedule_at: '2024-11-10T09:00:00Z'
  })
});
```

### Pobierz statystyki

```javascript
const stats = await fetch(
  'https://api.mailist.com/v3/campaigns/cmp_123abc/stats',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

const data = await stats.json();
console.log(`
  Sent: ${data.sent}
  Opened: ${data.opened} (${data.open_rate}%)
  Clicked: ${data.clicked} (${data.click_rate}%)
  Revenue: $${data.revenue}
`);
```

## SDKs & Libraries

### Oficjalne SDKs

```bash
# JavaScript/Node.js
npm install @mailist/sdk

# Python
pip install mailist

# PHP
composer require mailist/mailist-php

# Ruby
gem install mailist

# Go
go get github.com/mailist/mailist-go
```

### Community Libraries

- **Java**: [mailist-java](https://github.com/community/mailist-java)
- **.NET**: [Mailist.NET](https://github.com/community/mailist-dotnet)
- **Rust**: [mailist-rs](https://github.com/community/mailist-rs)

## API Changelog

### v3.1.0 (Latest)
- ✅ Added SMS API endpoints
- ✅ Enhanced filtering options
- ✅ Improved webhook reliability

### v3.0.0
- 🚀 Complete API redesign
- 🚀 GraphQL support
- 🚀 Enhanced rate limiting

[Full API Changelog →](/blog/changelog.html)

---

## Endpoints Overview

### Contacts

- `GET /contacts` - List all contacts
- `POST /contacts` - Create contact
- `GET /contacts/{id}` - Get contact
- `PATCH /contacts/{id}` - Update contact
- `DELETE /contacts/{id}` - Delete contact

[Full Contacts API →](/docs/api/contacts)

### Campaigns

- `GET /campaigns` - List campaigns
- `POST /campaigns` - Create campaign
- `GET /campaigns/{id}` - Get campaign
- `POST /campaigns/{id}/send` - Send campaign
- `GET /campaigns/{id}/stats` - Get statistics

[Full Campaigns API →](/docs/api/campaigns)

### Automation

- `GET /automation/workflows` - List workflows
- `POST /automation/workflows` - Create workflow
- `GET /automation/workflows/{id}` - Get workflow
- `PATCH /automation/workflows/{id}` - Update workflow

[Full Automation API →](/docs/api/automation)

### Templates

- `GET /templates` - List templates
- `POST /templates` - Create template
- `GET /templates/{id}` - Get template
- `PATCH /templates/{id}` - Update template

[Full Templates API →](/docs/api/templates)

---

## Support

### Need Help?

- 📚 [Full API Documentation](/docs/api)
- 💬 [Live Chat](https://support.mailist.com/chat)
- 📧 [api-support@mailist.com](mailto:api-support@mailist.com)
- 👥 [Developer Community](https://community.mailist.com/developers)

### Report Issues

Found a bug? [Submit an issue](https://github.com/mailist/api-issues)
