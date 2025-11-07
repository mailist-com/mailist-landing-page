---
layout: default
title: Dokumentacja
nav_order: 1
description: "Kompletna dokumentacja platformy Mailist - email marketing z AI"
permalink: /
---

# Witaj w Dokumentacji Mailist
{: .fs-9 }

Kompletny przewodnik po platformie email marketingu nowej generacji
{: .fs-6 .fw-300 }

[Rozpocznij teraz](#quick-start){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[Zobacz API](/docs/api){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Quick Start

Rozpocznij swoją przygodę z Mailist w 5 prostych krokach:

### 1. Utwórz konto

```bash
# Rejestracja przez API
curl -X POST https://api.mailist.com/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "twoj@email.com",
    "password": "bezpieczne_haslo",
    "company": "Twoja Firma"
  }'
```

Lub zarejestruj się przez [formularz online](https://app.mailist.com/register).

### 2. Skonfiguruj domenę

Aby zapewnić maksymalną dostarczalność, skonfiguruj DNS:

```dns
# SPF Record
TXT @ "v=spf1 include:_spf.mailist.com ~all"

# DKIM Record
TXT mailist._domainkey "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSI..."

# DMARC Record
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@twojadomena.pl"
```

[Więcej o konfiguracji DNS →](/docs/getting-started/dns-setup)

### 3. Importuj kontakty

```javascript
// Import kontaktów przez API
const contacts = [
  {
    email: "jan@example.com",
    first_name: "Jan",
    last_name: "Kowalski",
    tags: ["klient", "vip"]
  },
  // więcej kontaktów...
];

await mailist.contacts.import(contacts);
```

[Zobacz wszystkie metody importu →](/docs/getting-started/import-contacts)

### 4. Stwórz pierwszą kampanię

```javascript
// Utwórz kampanię email
const campaign = await mailist.campaigns.create({
  name: "Welcome Series #1",
  subject: "Witaj w Mailist! 🎉",
  from_name: "Zespół Mailist",
  from_email: "hello@twojadomena.pl",
  template_id: "welcome-template-01",
  segment: "new_subscribers"
});

// Wyślij testową wiadomość
await campaign.sendTest("twoj@email.com");

// Zaplanuj wysyłkę
await campaign.schedule(new Date("2024-11-10 09:00:00"));
```

### 5. Monitoruj wyniki

```javascript
// Pobierz statystyki kampanii
const stats = await campaign.getStats();

console.log(`
  Wysłane: ${stats.sent}
  Otwarte: ${stats.opened} (${stats.open_rate}%)
  Kliknięcia: ${stats.clicked} (${stats.click_rate}%)
  Konwersje: ${stats.conversions}
  Revenue: $${stats.revenue}
`);
```

---

## Główne Sekcje

<div class="grid-container" markdown="1">

### 📚 Getting Started
{: .text-delta }

- [Instalacja i Setup](/docs/getting-started/)
- [Konfiguracja DNS](/docs/getting-started/dns-setup)
- [Pierwszy Email](/docs/getting-started/first-email)
- [Import Kontaktów](/docs/getting-started/import-contacts)

[Zobacz więcej →](/docs/getting-started/){: .btn .btn-outline }

### 🤖 Automatyzacja
{: .text-delta }

- [Tworzenie Workflow](/docs/automation/workflows)
- [Triggers i Actions](/docs/automation/triggers)
- [AI Recommendations](/docs/automation/ai-features)
- [Best Practices](/docs/automation/best-practices)

[Zobacz więcej →](/docs/automation/){: .btn .btn-outline }

### 🔌 API Reference
{: .text-delta }

- [Autoryzacja](/docs/api/authentication)
- [Campaigns](/docs/api/campaigns)
- [Contacts](/docs/api/contacts)
- [Webhooks](/docs/api/webhooks)

[Zobacz więcej →](/docs/api/){: .btn .btn-outline }

### 🔗 Integracje
{: .text-delta }

- [Shopify](/docs/integrations/shopify)
- [WordPress](/docs/integrations/wordpress)
- [Zapier](/docs/integrations/zapier)
- [Custom Webhooks](/docs/integrations/webhooks)

[Zobacz więcej →](/docs/integrations/){: .btn .btn-outline }

</div>

---

## Popularne Tutoriale

### Email Marketing

- [10 sposobów na zwiększenie Open Rate](/docs/guides/increase-open-rate)
- [Segmentacja kontaktów](/docs/guides/segmentation)
- [A/B Testing najlepsze praktyki](/docs/guides/ab-testing)
- [Optymalizacja deliverability](/docs/guides/deliverability)

### Automatyzacja

- [Welcome Series krok po kroku](/docs/guides/welcome-series)
- [Abandoned Cart Recovery](/docs/guides/abandoned-cart)
- [Re-engagement Campaigns](/docs/guides/reengagement)
- [Behavioral Triggers](/docs/guides/behavioral-triggers)

### Zaawansowane

- [Custom API Integration](/docs/guides/custom-api)
- [Webhook Implementation](/docs/guides/webhooks-advanced)
- [Advanced Analytics](/docs/guides/analytics)
- [Multi-language Campaigns](/docs/guides/multilanguage)

---

## Potrzebujesz pomocy?

<div class="support-cards" markdown="1">

### 💬 Live Chat
Porozmawiaj z naszym zespołem support
**Dostępny 24/7**

[Otwórz Chat](https://support.mailist.com/chat){: .btn .btn-primary }

### 📧 Email Support
Wyślij nam szczegóły problemu
**Odpowiedź w ciągu 2h**

[support@mailist.com](mailto:support@mailist.com){: .btn .btn-outline }

### 🎓 Video Tutorials
Obejrzyj nasze video tutoriale
**50+ filmów instruktażowych**

[YouTube Channel](https://youtube.com/mailist){: .btn .btn-outline }

### 👥 Community Forum
Dołącz do społeczności Mailist
**5000+ aktywnych użytkowników**

[Forum →](https://community.mailist.com){: .btn .btn-outline }

</div>

---

## Co nowego?

### v2.5.0 - Najnowsza wersja
{: .label .label-green }

- 🚀 **AI Content Generator** - Generuj profesjonalne treści automatycznie
- 📊 **Advanced Segmentation** - Nowy wizualny builder segmentów
- 💬 **Real-time Collaboration** - Współpracuj z zespołem na żywo
- 📱 **SMS Integration** - Wysyłaj SMS-y bezpośrednio z platformy

[Zobacz pełny changelog →](/blog/changelog.html)

---

## Przykładowy Kod

### Szybki start z JavaScript SDK

```javascript
// Instalacja
npm install @mailist/sdk

// Inicjalizacja
import Mailist from '@mailist/sdk';

const mailist = new Mailist({
  apiKey: 'twoj_api_key',
  region: 'eu' // lub 'us'
});

// Wyślij transactional email
await mailist.emails.send({
  to: 'klient@example.com',
  template: 'order-confirmation',
  data: {
    order_id: '12345',
    total: '$99.99',
    items: [...]
  }
});

// Dodaj kontakt do listy
await mailist.contacts.create({
  email: 'nowy@kontakt.pl',
  first_name: 'Jan',
  tags: ['newsletter', 'customer'],
  custom_fields: {
    source: 'website',
    signup_date: new Date()
  }
});

// Utwórz automation workflow
const workflow = await mailist.automation.create({
  name: 'Welcome Series',
  trigger: {
    type: 'tag_added',
    tag: 'new_subscriber'
  },
  steps: [
    {
      type: 'email',
      delay: '0h',
      template: 'welcome-1'
    },
    {
      type: 'wait',
      duration: '2d'
    },
    {
      type: 'email',
      template: 'welcome-2'
    }
  ]
});
```

[Więcej przykładów →](/docs/api/examples)

---

## Roadmap

Sprawdź co planujemy w najbliższych miesiącach:

- 🔜 **Q4 2024**: Push Notifications, WhatsApp Integration
- 🔜 **Q1 2025**: Advanced AI Predictions, Expanded Analytics
- 🔜 **Q2 2025**: Mobile App (iOS/Android)

[Pełny roadmap →](https://roadmap.mailist.com)

---

<div class="cta-box" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem; border-radius: 16px; color: white; text-align: center; margin-top: 4rem;">
  <h2 style="font-size: 2rem; margin-bottom: 1rem;">Gotowy rozpocząć?</h2>
  <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.95;">
    Załóż darmowe konto i przetestuj wszystkie funkcje przez 30 dni
  </p>
  <a href="https://app.mailist.com/register" class="btn btn-white btn-lg">
    Rozpocznij Za Darmo →
  </a>
</div>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.support-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.btn-white {
  background: white;
  color: #4f46e5;
  font-weight: 600;
}
</style>
