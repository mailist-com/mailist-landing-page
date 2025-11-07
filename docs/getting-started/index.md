---
layout: default
title: Getting Started
nav_order: 2
has_children: true
permalink: /getting-started
---

# Getting Started
{: .no_toc }

Przewodnik dla nowych użytkowników platformy Mailist
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Witaj w Mailist!

Mailist to zaawansowana platforma email marketingu, która łączy w sobie moc sztucznej inteligencji, intuicyjny interfejs i profesjonalne narzędzia automatyzacji. Ten przewodnik pomoże Ci szybko rozpocząć pracę z platformą.

## Czego się nauczysz

- ✅ Jak utworzyć i skonfigurować konto
- ✅ Jak skonfigurować DNS dla maksymalnej dostarczalności
- ✅ Jak zaimportować kontakty
- ✅ Jak stworzyć i wysłać pierwszą kampanię
- ✅ Jak wykorzystać podstawowe funkcje automatyzacji

## Wymagania

Aby rozpocząć pracę z Mailist, potrzebujesz:

1. **Adres email** - do rejestracji konta
2. **Własna domena** - dla profesjonalnego email marketingu
3. **Dostęp do DNS** - do konfiguracji SPF/DKIM/DMARC (opcjonalnie, ale zalecane)

## Szybki Start (5 minut)

### Krok 1: Utwórz konto

1. Przejdź do [app.mailist.com/register](https://app.mailist.com/register)
2. Wypełnij formularz rejestracyjny:
   - Email
   - Hasło (min. 8 znaków, zawiera cyfry i znaki specjalne)
   - Nazwa firmy
3. Potwierdź email (sprawdź skrzynkę odbiorczą)
4. Gotowe! Jesteś zalogowany

### Krok 2: Uzupełnij profil

Po pierwszym logowaniu zostaniesz poproszony o uzupełnienie podstawowych informacji:

```yaml
Informacje o firmie:
  - Nazwa firmy
  - Branża
  - Wielkość firmy
  - Strona internetowa

Preferencje:
  - Język interfejsu
  - Strefa czasowa
  - Format daty
  - Waluta
```

### Krok 3: Dodaj swoją domenę

Konfiguracja własnej domeny jest kluczowa dla deliverability:

1. Przejdź do **Settings → Domains**
2. Kliknij **Add Domain**
3. Wprowadź swoją domenę (np. `example.com`)
4. Skopiuj rekordy DNS i dodaj je w panelu swojego dostawcy domeny

#### Przykładowe rekordy DNS:

```dns
# SPF (TXT record)
Host: @
Value: v=spf1 include:_spf.mailist.com ~all

# DKIM (TXT record)
Host: mailist._domainkey
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ...

# DMARC (TXT record)
Host: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com
```

5. Poczekaj na weryfikację (zwykle 15-30 minut)
6. Gotowe! Możesz wysyłać emaile z własnej domeny

[Szczegółowy przewodnik po DNS →](/docs/getting-started/dns-setup)

### Krok 4: Importuj pierwsze kontakty

Masz kilka opcji importu kontaktów:

#### Opcja A: Import z CSV

```csv
email,first_name,last_name,phone,tags
jan@example.com,Jan,Kowalski,+48123456789,customer;vip
anna@example.com,Anna,Nowak,+48987654321,newsletter
```

1. Przejdź do **Contacts → Import**
2. Przeciągnij plik CSV lub kliknij **Choose File**
3. Zmapuj kolumny CSV na pola w Mailist
4. Wybierz co zrobić z duplikatami
5. Kliknij **Import**

#### Opcja B: API Import

```javascript
const contacts = [
  {
    email: "jan@example.com",
    first_name: "Jan",
    last_name: "Kowalski",
    tags: ["customer", "vip"],
    custom_fields: {
      source: "website",
      plan: "premium"
    }
  }
];

const result = await mailist.contacts.bulkCreate(contacts);
console.log(`Imported ${result.success_count} contacts`);
```

#### Opcja C: Integracja z CRM

Połącz Mailist z:
- Shopify
- WooCommerce
- Salesforce
- HubSpot
- [Zobacz wszystkie integracje →](/docs/integrations)

[Więcej o imporcie kontaktów →](/docs/getting-started/import-contacts)

### Krok 5: Stwórz pierwszą kampanię

#### Wybierz szablon

1. Przejdź do **Campaigns → Create Campaign**
2. Wybierz jeden z 500+ profesjonalnych szablonów
3. Lub zacznij od zera w Drag & Drop Builder

#### Edytuj treść

```html
<!-- Przykładowy szablon welcome email -->
<div class="email-container">
  <h1>Witaj w Mailist, {{first_name}}! 🎉</h1>

  <p>Cieszymy się, że do nas dołączyłeś!</p>

  <p>Oto co możesz zrobić dalej:</p>

  <ul>
    <li>📧 Wyślij pierwszą kampanię</li>
    <li>🤖 Skonfiguruj automatyzację</li>
    <li>📊 Sprawdź analytics dashboard</li>
  </ul>

  <a href="{{dashboard_url}}" class="cta-button">
    Rozpocznij Teraz
  </a>
</div>
```

#### Konfiguracja kampanii

```yaml
Podstawowe ustawienia:
  Subject: "Witaj w Mailist! 🎉"
  From Name: "Zespół Mailist"
  From Email: "hello@example.com"
  Reply-To: "support@example.com"

Odbiorcy:
  Segment: "New Subscribers"
  Exclude: "Already welcomed"

Timing:
  Send: Immediately
  # lub
  Schedule: 2024-11-10 09:00:00 CET

Tracking:
  Open tracking: Enabled
  Click tracking: Enabled
  Google Analytics: Enabled
```

#### Wyślij test

Przed wysłaniem do wszystkich, wyślij testową wiadomość:

```javascript
await campaign.sendTest([
  "test1@example.com",
  "test2@example.com"
]);
```

#### Uruchom kampanię

Gdy wszystko wygląda dobrze:

1. Sprawdź **Preview & Test**
2. Zweryfikuj segment odbiorców
3. Kliknij **Send Campaign**

Gratulacje! Wysłałeś swoją pierwszą kampanię! 🎉

---

## Co dalej?

### Podstawy email marketingu

- [Jak pisać skuteczne subject lines](/docs/guides/subject-lines)
- [Best practices designu emaili](/docs/guides/email-design)
- [Segmentacja kontaktów](/docs/guides/segmentation)
- [A/B testing](/docs/guides/ab-testing)

### Automatyzacja

- [Twój pierwszy automation workflow](/docs/automation/first-workflow)
- [Welcome Series](/docs/guides/welcome-series)
- [Abandoned Cart Recovery](/docs/guides/abandoned-cart)
- [Re-engagement campaigns](/docs/guides/reengagement)

### Zaawansowane funkcje

- [API Integration](/docs/api)
- [Custom webhooks](/docs/api/webhooks)
- [Advanced segmentation](/docs/automation/segmentation)
- [AI features](/docs/automation/ai-features)

---

## Najczęstsze problemy

### Moje emaile trafiają do SPAM

**Rozwiązanie:**

1. ✅ Skonfiguruj SPF, DKIM, DMARC
2. ✅ Używaj własnej domeny (nie @gmail.com)
3. ✅ Warm-up domeny (stopniowo zwiększaj wolumen)
4. ✅ Utrzymuj czystą listę (usuń bounced emails)
5. ✅ Używaj double opt-in
6. ✅ Monitoruj spam complaints

[Pełny przewodnik deliverability →](/docs/guides/deliverability)

### Nie mogę zweryfikować domeny

**Sprawdź:**

1. Czy rekordy DNS zostały poprawnie dodane?
2. Czy minęło wystarczająco czasu? (15-60 minut)
3. Czy użyłeś poprawnego hosta? (@, mailist._domainkey, _dmarc)
4. Czy twój dostawca DNS akceptuje te typy rekordów?

**Pomoc:**

```bash
# Sprawdź rekordy DNS w terminalu
dig TXT example.com
dig TXT mailist._domainkey.example.com
dig TXT _dmarc.example.com
```

### Import kontaktów nie działa

**Najczęstsze przyczyny:**

1. ❌ Nieprawidłowy format CSV (użyj UTF-8)
2. ❌ Brak wymaganego pola "email"
3. ❌ Nieprawidłowe adresy email
4. ❌ Za duży plik (max 50MB)

**Rozwiązanie:**

```csv
# Prawidłowy format CSV
email,first_name,last_name
jan@example.com,Jan,Kowalski
anna@example.com,Anna,Nowak
```

---

## Potrzebujesz pomocy?

### 💬 Live Chat
Dostępny 24/7 w aplikacji (dolny prawy róg)

### 📧 Email Support
[support@mailist.com](mailto:support@mailist.com)
Odpowiedź w ciągu 2 godzin

### 📚 Knowledge Base
[help.mailist.com](https://help.mailist.com)
100+ artykułów pomocy

### 🎥 Video Tutorials
[YouTube Channel](https://youtube.com/mailist)
50+ video guides

### 👥 Community Forum
[community.mailist.com](https://community.mailist.com)
Pytaj społeczność

---

## Następne kroki

<div class="next-steps">

### 📖 [Konfiguracja DNS](/docs/getting-started/dns-setup)
Skonfiguruj SPF, DKIM i DMARC dla maksymalnej dostarczalności

### 📥 [Import kontaktów](/docs/getting-started/import-contacts)
Wszystkie metody importu i zarządzania kontaktami

### ✉️ [Pierwszy email](/docs/getting-started/first-email)
Szczegółowy tutorial tworzenia kampanii email

### 🤖 [Automatyzacja](/docs/automation)
Wprowadzenie do automation workflows

</div>

<style>
.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.next-steps > div {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.next-steps > div:hover {
  border-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
}
</style>
