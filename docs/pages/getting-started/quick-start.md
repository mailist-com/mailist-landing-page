---
layout: default
title: Szybki Start
parent: Pierwsze Kroki
nav_order: 1
---

# Szybki Start

Rozpocznij pracę z Mailist w kilku prostych krokach. Ten przewodnik pomoże Ci skonfigurować konto i wysłać pierwszą kampanię email.

{: .note }
> **Przed rozpoczęciem**
> Upewnij się, że masz aktywne konto Mailist. Jeśli jeszcze go nie masz, [zarejestruj się tutaj](https://mailist.pl).

## Krok 1: Utwórz Klucz API

Aby komunikować się z API Mailist, potrzebujesz klucza API.

1. Zaloguj się do panelu Mailist
2. Przejdź do **Ustawienia** → **API Keys**
3. Kliknij **Utwórz Nowy Klucz**
4. Nadaj nazwę swojemu kluczowi (np. "Aplikacja Produkcyjna")
5. Zapisz klucz w bezpiecznym miejscu

{: .warning }
> **Bezpieczeństwo**
> Nigdy nie udostępniaj swojego klucza API publicznie. Traktuj go jak hasło!

## Krok 2: Zainstaluj Bibliotekę

### Node.js

```bash
npm install @mailist/api-client
```

### Python

```bash
pip install mailist-python
```

### PHP

```bash
composer require mailist/api-client
```

### cURL

Możesz również używać zwykłych zapytań HTTP bez dodatkowych bibliotek.

## Krok 3: Pierwszy Request

Wyślij testowe żądanie do API aby sprawdzić połączenie:

### Node.js

```javascript
const Mailist = require('@mailist/api-client');

const client = new Mailist({
  apiKey: 'twój_klucz_api'
});

// Pobierz informacje o koncie
async function getAccount() {
  try {
    const account = await client.account.get();
    console.log('Połączono z kontem:', account.email);
  } catch (error) {
    console.error('Błąd:', error.message);
  }
}

getAccount();
```

### Python

```python
from mailist import MailistClient

client = MailistClient(api_key='twój_klucz_api')

# Pobierz informacje o koncie
try:
    account = client.account.get()
    print(f'Połączono z kontem: {account.email}')
except Exception as e:
    print(f'Błąd: {str(e)}')
```

### cURL

```bash
curl -X GET https://api.mailist.pl/v2/account \
  -H "Authorization: Bearer twój_klucz_api" \
  -H "Content-Type: application/json"
```

## Krok 4: Wyślij Pierwszy Email

Teraz wyślijmy prosty email transakcyjny:

### Node.js

```javascript
async function sendEmail() {
  try {
    const email = await client.emails.send({
      from: {
        email: 'noreply@twojadomena.pl',
        name: 'Twoja Firma'
      },
      to: [{
        email: 'odbiorca@example.com',
        name: 'Jan Kowalski'
      }],
      subject: 'Witaj w Mailist!',
      html: '<h1>Witaj!</h1><p>To Twój pierwszy email wysłany przez Mailist.</p>',
      text: 'Witaj! To Twój pierwszy email wysłany przez Mailist.'
    });

    console.log('Email wysłany! ID:', email.id);
  } catch (error) {
    console.error('Błąd wysyłki:', error.message);
  }
}

sendEmail();
```

### Python

```python
try:
    email = client.emails.send(
        from_email={
            'email': 'noreply@twojadomena.pl',
            'name': 'Twoja Firma'
        },
        to=[{
            'email': 'odbiorca@example.com',
            'name': 'Jan Kowalski'
        }],
        subject='Witaj w Mailist!',
        html='<h1>Witaj!</h1><p>To Twój pierwszy email wysłany przez Mailist.</p>',
        text='Witaj! To Twój pierwszy email wysłany przez Mailist.'
    )

    print(f'Email wysłany! ID: {email.id}')
except Exception as e:
    print(f'Błąd wysyłki: {str(e)}')
```

## Krok 5: Sprawdź Status Wysyłki

Możesz sprawdzić status wysłanego emaila:

```javascript
const status = await client.emails.get(email.id);
console.log('Status:', status.status);
// Status: 'delivered' | 'pending' | 'bounced' | 'failed'
```

## Gratulacje! 🎉

Właśnie wysłałeś swój pierwszy email przez Mailist! Teraz możesz:

- [Poznać pełne API Reference](/docs/pages/api/overview.html)
- [Skonfigurować webhooks](/docs/pages/api/webhooks.html)
- [Zarządzać listami subskrybentów](/docs/pages/api/lists.html)
- [Używać szablonów email](/docs/pages/components/templates.html)

## Potrzebujesz Pomocy?

Jeśli napotkasz problemy:

1. Sprawdź [FAQ](/docs/pages/getting-started/faq.html)
2. Przeczytaj [częste błędy](/docs/pages/api/errors.html)
3. [Skontaktuj się z naszym zespołem](https://mailist.pl#contact)

---

## Następne Kroki

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <a href="authentication.html" class="card p-4 border border-default-200 rounded-lg hover:shadow-lg transition">
    <h3 class="font-semibold mb-2">Autentykacja →</h3>
    <p class="text-sm text-default-600">Dowiedz się więcej o bezpiecznej autentykacji</p>
  </a>

  <a href="../api/sending-emails.html" class="card p-4 border border-default-200 rounded-lg hover:shadow-lg transition">
    <h3 class="font-semibold mb-2">Zaawansowane Wysyłanie →</h3>
    <p class="text-sm text-default-600">Personalizacja, załączniki, i więcej</p>
  </a>
</div>
