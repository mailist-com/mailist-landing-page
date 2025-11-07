# Mailist Landing Page

Profesjonalna strona landing page dla platformy email marketingu Mailist.

## 🎯 O Projekcie

Mailist to platforma email marketingu nowej generacji, która rozwiązuje najczęstsze problemy użytkowników konkurencyjnych narzędzi:

- ✅ **Prostota** zamiast przytłaczającej ilości funkcji
- ✅ **Szybki setup** - pierwsze emaile w 5 minut
- ✅ **Gotowe scenariusze** automatyzacji bez kodowania
- ✅ **Jasne raporty** - widzisz co zarabiasz, nie gubisz się w danych
- ✅ **Support, który pomaga** - odpowiedź w 2 minuty

## 📁 Struktura Projektu

```
mailist-landing-page/
├── index.html              # Główna strona landing page
├── assets/                 # Zasoby
│   ├── css/               # Style CSS
│   ├── js/                # Skrypty JavaScript
│   ├── img/               # Obrazy i grafiki
│   └── fonts/             # Czcionki (Remixicon, Inter)
├── blog/                   # Blog Jekyll
│   ├── _posts/            # Artykuły blogowe
│   ├── _layouts/          # Szablony Jekyll
│   ├── _config.yml        # Konfiguracja Jekyll
│   ├── Gemfile            # Dependencies dla blog
│   └── README.md          # Dokumentacja bloga
├── docs/                   # Dokumentacja (Just the Docs)
│   ├── getting-started/   # Przewodnik start
│   ├── api/               # API Reference
│   ├── automation/        # Automatyzacja
│   ├── _config.yml        # Konfiguracja Just the Docs
│   ├── Gemfile            # Dependencies dla docs
│   └── README.md          # Dokumentacja docs
└── README.md              # Ten plik
```

## 🚀 Quick Start

### Landing Page (HTML)

Otwórz `index.html` w przeglądarce lub użyj live server:

```bash
# Z Python
python -m http.server 8000

# Z Node.js (http-server)
npx http-server

# Lub po prostu otwórz index.html w przeglądarce
```

Strona dostępna pod: `http://localhost:8000`

### Blog (Jekyll)

```bash
cd blog
bundle install
bundle exec jekyll serve
```

Blog dostępny pod: `http://localhost:4000/blog/`

### Dokumentacja (Jekyll + Just the Docs)

```bash
cd docs
bundle install
bundle exec jekyll serve
```

Docs dostępne pod: `http://localhost:4000/docs/`

## 🎨 Design System

### Kolory

```css
--primary-color: #4f46e5;     /* Indigo - główny akcent */
--secondary-color: #06b6d4;   /* Cyan - drugie tło */
--dark-color: #1e293b;        /* Slate - ciemny tekst */
--light-color: #f8fafc;       /* Slate - jasne tło */
```

### Typografia

- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800

### Ikony

- **RemixIcon** - pełen zestaw ikon dla UI

## 📝 Copywriting Strategy

Strona używa podejścia **Problem-Solution**:

1. **Zidentyfikuj problem** użytkownika
2. **Agituj** - pokaż że rozumiesz frustrację
3. **Rozwiązanie** - jak Mailist to naprawia

### Przykład

```
Problem: "Automatyzacja Przeraża?"
Agitacja: "W ActiveCampaign potrzebujesz 3h szkoleń..."
Rozwiązanie: "Kliknij 'Porzucony Koszyk' i działa w 5 minut"
```

## 🔧 Konfiguracja

### Wymagania

- **Landing Page**: Dowolny web server
- **Blog**: Ruby 2.7+, Jekyll 4.3+
- **Docs**: Ruby 2.7+, Jekyll 4.3+, Just the Docs

### Instalacja Ruby Dependencies

```bash
# Blog
cd blog
bundle install

# Docs
cd docs
bundle install
```

### Environment Variables

Brak specjalnych zmiennych środowiskowych wymaganych.

## 📊 Features

### Landing Page

- ✅ Responsywny design (mobile-first)
- ✅ Animacje AOS (Animate On Scroll)
- ✅ Sekcje: Hero, Features, Automation, Testimonials, Pricing
- ✅ Problem-solution copywriting
- ✅ Social proof z konkretnymi wynikami
- ✅ CTAs z risk reversal

### Blog

- ✅ Jekyll static site generator
- ✅ Markdown support
- ✅ Syntax highlighting
- ✅ Pagination
- ✅ Tags & Categories
- ✅ SEO optimized
- ✅ Changelog page

### Dokumentacja

- ✅ Just the Docs theme
- ✅ Wbudowana wyszukiwarka
- ✅ Code examples (JS, Python, PHP, Ruby)
- ✅ API Reference
- ✅ Getting Started guide
- ✅ Hierarchiczna nawigacja
- ✅ Table of Contents

## 🎯 Positioning vs. Konkurencja

| Feature | ActiveCampaign | MailerLite | GetResponse | **Mailist** |
|---------|---------------|------------|-------------|-------------|
| Setup Time | 3+ hours | 1-2 hours | 2+ hours | **5 minutes** |
| Learning Curve | Steep | Moderate | Steep | **Flat** |
| Pricing Model | All contacts | All contacts | All contacts | **Active only** |
| Support Response | 24-48h | 12-24h | 24-72h | **2 minutes** |
| Automation | Complex | Basic | Moderate | **Pre-built scenarios** |
| Analytics | Overwhelming | Limited | Moderate | **Simple & clear** |

## 📱 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile: iOS Safari, Chrome Android

## 🚢 Deployment

### Static Hosting (Landing Page)

Deploy do:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

### Jekyll Sites (Blog & Docs)

```bash
# Build production
JEKYLL_ENV=production bundle exec jekyll build

# Output w _site/
```

Deploy `_site/` folder do hostingu.

## 🔐 Security

- ✅ HTTPS enforced
- ✅ CSP headers recommended
- ✅ No tracking scripts (GDPR friendly)
- ✅ Form validation
- ✅ XSS protection

## 📈 Performance

- ✅ Minified CSS/JS
- ✅ Lazy loading images
- ✅ Preconnect to Google Fonts
- ✅ SVG logos (scalable, small)
- ✅ Efficient animations

Target scores:
- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

## 🤝 Contributing

1. Fork projekt
2. Utwórz feature branch (`git checkout -b feature/amazing`)
3. Commit zmiany (`git commit -m 'Add amazing feature'`)
4. Push do branch (`git push origin feature/amazing`)
5. Otwórz Pull Request

### Coding Standards

- **HTML**: Semantic HTML5
- **CSS**: BEM methodology
- **JavaScript**: ES6+
- **Markdown**: CommonMark spec

## 📞 Wsparcie

- **Website**: [mailist.com](https://mailist.com)
- **Blog**: [mailist.com/blog](https://mailist.com/blog)
- **Docs**: [mailist.com/docs](https://mailist.com/docs)
- **Email**: support@mailist.com
- **Status**: [status.mailist.com](https://status.mailist.com)

## 📄 License

© 2024 Mailist. All rights reserved.

---

**Built with ❤️ for frustrated email marketers who want simple, effective tools.**
