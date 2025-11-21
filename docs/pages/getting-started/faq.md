---
layout: default
title: FAQ
parent: Pierwsze Kroki
nav_order: 4
---

# Często Zadawane Pytania (FAQ)

Odpowiedzi na najczęściej zadawane pytania dotyczące platformy Mailist.

## Ogólne

### Czym jest Mailist?

Mailist to nowoczesna platforma email marketingowa, która pozwala na:
- Wysyłanie transakcyjnych i marketingowych emaili
- Zarządzanie listami subskrybentów
- Automatyzację kampanii email
- Śledzenie metryk i analitykę

### Czy Mailist oferuje darmowy plan?

Tak! Oferujemy darmowy plan który obejmuje:
- 1,000 emaili miesięcznie
- Podstawowe funkcje API
- Wsparcie społeczności
- 1 użytkownik

[Zobacz wszystkie plany cenowe →](https://mailist.pl#pricing)

### Czy mogę przetestować Mailist przed zakupem?

Absolutnie! Możesz:
- Zarejestrować darmowe konto
- Używać środowiska testowego (sandbox)
- Testować wszystkie funkcje przez 14 dni na planie Professional

---

## Instalacja i Konfiguracja

### Jak zainstalować bibliotekę Mailist?

Instalacja zależy od języka programowania:

**Node.js:**
```bash
npm install @mailist/api-client
```

**Python:**
```bash
pip install mailist-python
```

**PHP:**
```bash
composer require mailist/api-client
```

[Zobacz pełną instrukcję instalacji →](installation.html)

### Gdzie znajdę klucz API?

1. Zaloguj się do [panelu Mailist](https://app.mailist.pl)
2. Przejdź do **Ustawienia** → **API Keys**
3. Kliknij **Utwórz Nowy Klucz**
4. Zapisz klucz w bezpiecznym miejscu

### Czy mogę używać wielu kluczy API?

Tak! Możesz utworzyć wiele kluczy API z różnymi:
- Nazwami (np. "Produkcja", "Staging", "Development")
- Uprawnieniami (tylko wysyłanie, tylko odczyt, etc.)
- Limitami

---

## Wysyłanie Emaili

### Jak wysłać pierwszy email?

Najszybszy sposób:

```javascript
const email = await client.emails.send({
  from: { email: 'noreply@twojadomena.pl' },
  to: [{ email: 'odbiorca@example.com' }],
  subject: 'Witaj!',
  html: '<p>Twój pierwszy email</p>'
});
```

[Zobacz kompletny przewodnik →](quick-start.html)

### Jaki jest limit wysyłki?

Limity zależą od planu:

| Plan | Emaili/miesiąc | Emaili/godzinę |
|------|----------------|----------------|
| Free | 1,000 | 100 |
| Starter | 10,000 | 500 |
| Professional | 100,000 | 5,000 |
| Enterprise | Bez limitu | Bez limitu |

### Czy mogę wysyłać załączniki?

Tak! Mailist obsługuje załączniki do 10MB:

```javascript
await client.emails.send({
  from: { email: 'noreply@twojadomena.pl' },
  to: [{ email: 'odbiorca@example.com' }],
  subject: 'Z załącznikiem',
  html: '<p>Zobacz załącznik</p>',
  attachments: [{
    filename: 'dokument.pdf',
    content: base64Content,
    contentType: 'application/pdf'
  }]
});
```

### Dlaczego moje emaile trafiają do spamu?

Najczęstsze przyczyny:
1. **Brak weryfikacji domeny** - [Skonfiguruj SPF i DKIM](../deployment/domain-setup.html)
2. **Niska jakość treści** - Unikaj spamowych słów i nadmiernej personalizacji
3. **Brak możliwości wypisania** - Zawsze dodawaj link do wypisania
4. **Wysoka częstotliwość bounce** - Regularnie czyść listy

[Przeczytaj więcej o dostarczalności →](../deployment/deliverability.html)

---

## API i Integracje

### Jaka jest aktualna wersja API?

Aktualna wersja to **API v2** (2025-01-21).

API v1 będzie wspierane do 31 grudnia 2025.

[Zobacz zmiany w API v2 →](whats-new.html)

### Czy Mailist ma SDK dla mojego języka?

Oferujemy oficjalne SDK dla:
- JavaScript/Node.js
- Python
- PHP
- Ruby
- Go
- .NET

[Zobacz wszystkie SDK →](../api/overview.html)

### Czy mogę używać webhooków?

Tak! Webhooks pozwalają na otrzymywanie powiadomień w czasie rzeczywistym o:
- Dostarczonych emailach
- Otwartych emailach
- Klikniętych linkach
- Bounce'ach i spamie
- Wypisaniach z listy

[Konfiguruj webhooks →](../api/webhooks.html)

### Jaki jest limit żądań API?

| Plan | Żądań/minutę | Żądań/godzinę |
|------|--------------|---------------|
| Free | 60 | 1,000 |
| Starter | 300 | 10,000 |
| Professional | 1,000 | 50,000 |
| Enterprise | Bez limitu | Bez limitu |

---

## Listy i Subskrybenci

### Jak dodać subskrybenta do listy?

```javascript
const subscriber = await client.subscribers.create({
  email: 'jan@example.com',
  firstName: 'Jan',
  lastName: 'Kowalski',
  lists: ['lista_id_123'],
  customFields: {
    miasto: 'Warszawa',
    zainteresowania: 'email marketing'
  }
});
```

### Czy mogę importować subskrybentów masowo?

Tak! Mailist obsługuje:
- Import CSV przez panel
- Masowy import przez API (do 10,000 na raz)
- Integracje z popularnymi platformami

```javascript
const result = await client.subscribers.bulkImport({
  listId: 'lista_id_123',
  subscribers: [
    { email: 'jan@example.com', firstName: 'Jan' },
    { email: 'anna@example.com', firstName: 'Anna' },
    // ... do 10,000
  ]
});
```

### Jak zarządzać wypisaniami?

Mailist automatycznie zarządza wypisaniami:
- Każdy email zawiera link do wypisania
- Wypisani subskrybenci nie otrzymują emaili
- Możesz eksportować listę wypisanych

```javascript
// Sprawdź status subskrybenta
const subscriber = await client.subscribers.get('subscriber_id');
console.log(subscriber.status); // 'subscribed' | 'unsubscribed' | 'bounced'
```

---

## Bezpieczeństwo

### Czy moje dane są bezpieczne?

Tak! Mailist:
- Szyfruje wszystkie dane w tranzycie (TLS 1.3)
- Szyfruje dane w spoczynku (AES-256)
- Jest zgodny z RODO
- Przeprowadza regularne audyty bezpieczeństwa
- Używa 2FA dla kont

### Czy Mailist jest zgodny z RODO?

Tak! Jesteśmy w pełni zgodny z RODO:
- Umowa przetwarzania danych (DPA)
- Prawo do usunięcia danych
- Eksport danych
- Zgody na przetwarzanie

[Przeczytaj naszą Politykę Prywatności →](https://mailist.pl/polityka-prywatnosci.html)

### Jak mogę zabezpieczyć klucze API?

Najlepsze praktyki:
1. **Nigdy nie commituj kluczy** do repozytorium
2. **Używaj zmiennych środowiskowych**
3. **Rotuj klucze regularnie** (co 3-6 miesięcy)
4. **Używaj minimalnych uprawnień**
5. **Monitoruj użycie** w panelu

[Więcej o bezpieczeństwie →](../api/authentication.html#best-practices)

---

## Rozliczenia

### Jak działa rozliczenie?

Rozliczamy miesięcznie na podstawie:
- Liczby wysłanych emaili
- Liczby subskrybentów na listach
- Wybranego planu

### Czy mogę zmienić plan w każdej chwili?

Tak! Możesz:
- Upgrade w każdej chwili (natychmiastowy)
- Downgrade na koniec okresu rozliczeniowego
- Anulować w każdej chwili

### Co się stanie jeśli przekroczę limit?

Zależy od ustawień konta:
- **Auto-upgrade**: Automatycznie przejdziesz na wyższy plan
- **Hard limit**: Wysyłka zostanie wstrzymana do następnego okresu
- **Pay-as-you-go**: Zapłacisz za dodatkowe emaile

---

## Wsparcie

### Jak mogę uzyskać pomoc?

Oferujemy kilka kanałów wsparcia:

| Kanał | Plan | Czas odpowiedzi |
|-------|------|----------------|
| Email | Wszystkie | 24h |
| Chat na żywo | Starter+ | 4h w godzinach pracy |
| Telefon | Professional+ | Natychmiastowe |
| Dedykowany menedżer | Enterprise | Natychmiastowe |

### Gdzie zgłosić błąd?

1. **Email**: support@mailist.pl
2. **GitHub**: [github.com/mailist-com/issues](https://github.com/mailist-com)
3. **Panel**: Przycisk "Zgłoś problem"

### Czy oferujecie szkolenia?

Tak! Dla klientów Enterprise oferujemy:
- Szkolenia onboardingowe
- Warsztaty email marketingu
- Konsultacje techniczne
- Dedykowane webinary

---

## Nie znalazłeś odpowiedzi?

{: .tip }
> Skontaktuj się z naszym zespołem:
> - Email: support@mailist.pl
> - Chat: [mailist.pl](https://mailist.pl)
> - Telefon: +48 22 123 45 67

[Przejdź do Dokumentacji API →](../api/overview.html)
