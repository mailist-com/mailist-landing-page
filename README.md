# Mailist - Landing Page

Nowoczesna landing page dla platformy email marketingu **Mailist**, łącząca prostotę MailerLite z mocą ActiveCampaign.

![Mailist](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 O Projekcie

Mailist to platforma email marketingu nowej generacji, która łączy intuicyjność i prostotę użytkowania z zaawansowanymi funkcjami automatyzacji i analityki. Ta landing page została zaprojektowana, aby:

- Przyciągnąć uwagę potencjalnych klientów
- Przedstawić kluczowe funkcje platformy
- Pokazać realne wyniki i opinie użytkowników
- Ułatwić konwersję poprzez jasne CTA (Call To Action)

## ✨ Funkcje Landing Page

### Design i UX
- **Nowoczesny design** inspirowany najlepszymi praktykami MailerLite i ActiveCampaign
- **Responsywny layout** - działa perfekcyjnie na wszystkich urządzeniach
- **Animacje scroll reveal** - elementy animują się podczas przewijania
- **Smooth scrolling** - płynne przewijanie do sekcji
- **Interaktywne komponenty** - FAQ accordion, pricing toggle, etc.

### Sekcje
1. **Hero Section** - Główny przekaz z formularzem zapisu
2. **Logo Cloud** - Partnerzy i zaufane firmy
3. **Features** - Szczegółowa prezentacja funkcji
4. **Results** - Wyniki i testimonials
5. **Integrations** - Dostępne integracje
6. **Pricing** - Przejrzysty cennik z trzema planami
7. **FAQ** - Najczęściej zadawane pytania
8. **CTA** - Końcowe wezwanie do działania

### Technologie
- **HTML5** - Semantyczny markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** - Bez frameworków, czysty JS
- **Google Fonts** - Inter font family

## 🚀 Szybki Start

### Wymagania
- Przeglądarka internetowa (Chrome, Firefox, Safari, Edge)
- Opcjonalnie: Live Server dla development

### Instalacja

1. Sklonuj repozytorium:
```bash
git clone https://github.com/yourusername/mailist-landing-page.git
cd mailist-landing-page
```

2. Otwórz plik `index.html` w przeglądarce:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Lub użyj Live Server w VS Code:
```bash
# Zainstaluj Live Server extension
# Następnie kliknij prawym przyciskiem na index.html
# i wybierz "Open with Live Server"
```

## 📁 Struktura Projektu

```
mailist-landing-page/
│
├── index.html          # Główny plik HTML
├── styles.css          # Wszystkie style CSS
├── script.js           # Interaktywność JavaScript
├── README.md           # Dokumentacja projektu
└── assets/            # Zasoby (opcjonalnie)
    ├── images/
    └── icons/
```

## 🎨 Paleta Kolorów

Projekt wykorzystuje nowoczesną paletę kolorów:

```css
--primary: #6366F1      /* Indigo */
--secondary: #8B5CF6    /* Purple */
--accent: #10B981       /* Green */
--accent-orange: #F59E0B
--accent-pink: #EC4899
--accent-blue: #0EA5E9
```

## 🔧 Konfiguracja

### Dostosowanie kolorów
Edytuj zmienne CSS w pliku `styles.css`:
```css
:root {
    --primary: #6366F1;
    --secondary: #8B5CF6;
    /* ... */
}
```

### Zmiana treści
Edytuj plik `index.html` - wszystkie sekcje są dobrze oznaczone komentarzami:
```html
<!-- Hero Section -->
<!-- Features Section -->
<!-- Pricing Section -->
<!-- etc. -->
```

### Dostosowanie animacji
Parametry animacji w pliku `script.js`:
```javascript
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
```

## 📱 Responsywność

Strona jest w pełni responsywna i dostosowuje się do:
- **Desktop** - 1280px+
- **Tablet** - 768px - 1024px
- **Mobile** - 320px - 767px

Breakpointy CSS:
```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small mobile */ }
```

## ⚡ Optymalizacja

### Performance
- Minimalne użycie zasobów zewnętrznych
- Optymalne ładowanie fontów (preconnect)
- CSS animations z GPU acceleration
- Lazy loading dla animacji scroll

### SEO
- Semantyczny HTML5
- Meta tags (description, viewport)
- Proper heading hierarchy (h1, h2, h3)
- Alt texts dla wszystkich obrazów (gdy dodane)

### Accessibility
- ARIA labels dla przycisków
- Proper focus states
- Keyboard navigation
- Semantic HTML

## 🎯 Funkcje JavaScript

### Główne funkcje
1. **Mobile Menu** - Responsywne menu dla urządzeń mobilnych
2. **Smooth Scroll** - Płynne przewijanie do sekcji
3. **FAQ Accordion** - Rozwijane pytania
4. **Pricing Toggle** - Przełączanie między miesięcznym/rocznym cennikiem
5. **Email Validation** - Walidacja adresów email
6. **Scroll Reveal** - Animacje podczas scrollowania
7. **Counter Animation** - Animowane liczniki statystyk

### Easter Eggs
Strona zawiera easter egg - spróbuj wprowadzić Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA

## 🔄 Integracje (Do Implementacji)

Landing page jest przygotowana do integracji z:
- **Email Marketing API** - MailChimp, SendGrid
- **Analytics** - Google Analytics, Mixpanel
- **CRM** - HubSpot, Salesforce
- **Payment** - Stripe, PayPal

## 📊 Analytics

Zalecane narzędzia do trackowania:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Facebook Pixel -->
<!-- Hotjar -->
<!-- etc. -->
```

## 🚢 Deployment

### Netlify
```bash
# Zainstaluj Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

### GitHub Pages
```bash
# Push do GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Włącz GitHub Pages w ustawieniach repo
```

### Vercel
```bash
# Zainstaluj Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🛠️ Development

### Rekomendowane narzędzia
- **VS Code** - Editor kodu
- **Live Server** - Development server
- **Chrome DevTools** - Debugging
- **Figma** - Design (opcjonalnie)

### Wskazówki
1. Używaj Live Server dla hot reload
2. Testuj na różnych przeglądarkach
3. Sprawdzaj responsywność w DevTools
4. Waliduj HTML/CSS (W3C Validator)

## 📝 TODO

- [ ] Dodać prawdziwe obrazy produktu
- [ ] Zintegrować z backend API
- [ ] Dodać multi-language support
- [ ] Implementować formularz kontaktowy z backend
- [ ] Dodać blog section
- [ ] A/B testing setup
- [ ] Dodać chat widget
- [ ] Cookie consent banner (RODO)

## 🤝 Contributing

Chcesz przyczynić się do rozwoju projektu?

1. Fork projektu
2. Stwórz branch dla swojej funkcji (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 License

Projekt jest dostępny na licencji MIT. Zobacz plik `LICENSE` dla więcej informacji.

## 👥 Autorzy

- **Twoje Imię** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Podziękowania

- Inspiracja design: **MailerLite** & **ActiveCampaign**
- Ikony: **Heroicons**
- Fonty: **Google Fonts (Inter)**

## 📞 Kontakt

- Website: [mailist.com](https://mailist.com)
- Email: hello@mailist.com
- Twitter: [@mailist](https://twitter.com/mailist)

---

**Mailist** - Email marketing, który naprawdę działa 💌
