# Instrukcja Deployment na GitHub Pages

## Przegląd Konfiguracji

Projekt jest w pełni skonfigurowany do automatycznego deployment na GitHub Pages z zaawansowanymi optymalizacjami wydajności.

---

## Zaimplementowane Optymalizacje Wydajności

### 1. **Build Optimizations (vite.config.js)**

#### Code Minification
- **Terser** z agresywną minifikacją JavaScript
- Usuwanie `console.log` i `debugger` w produkcji
- Wielokrotna kompresja (2 pasy)
- **LightningCSS** dla minifikacji CSS

#### Code Splitting
Automatyczne rozdzielenie vendor libraries na osobne chunki:
- `vendor-lucide` - ikony Lucide
- `vendor-preline` - komponenty Preline
- `vendor-charts` - ApexCharts
- `vendor-ui` - Flatpickr & Simplebar
- `vendor-core` - pozostałe biblioteki

**Zalety:**
- Lepsze cache'owanie (vendor code zmienia się rzadko)
- Równoległe pobieranie zasobów
- Zmniejszony czas ładowania przy kolejnych wizytach

#### Cache Busting
- Hash w nazwach plików: `[name]-[hash].js`
- Automatyczna organizacja assetów według typu
- Inline małych assetów (< 4KB) jako base64

#### Target & Compatibility
- ES2015 target dla szerokiej kompatybilności
- Brak source maps w produkcji (mniejszy rozmiar)

### 2. **GitHub Actions Workflow**

#### Automated Optimizations
1. **HTML Minification** - html-minifier-terser
   - Usuwa białe znaki
   - Usuwa komentarze
   - Usuwa zbędne atrybuty
   - Minifikuje inline CSS/JS

2. **Image Optimization**
   - JPEG: `jpegoptim` (max quality 85%)
   - PNG: `optipng` (level 3 optimization)
   - Automatyczne stripowanie metadanych

3. **Bundle Analysis**
   - Raportowanie rozmiaru bundle
   - Analiza kompresji gzip
   - Identyfikacja największych plików

#### Performance & Security Headers
Wygenerowany plik `_headers` z:
- **Security Headers:**
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy

- **Cache Control:**
  - HTML: `max-age=0, must-revalidate` (zawsze rewaliduj)
  - Hashed assets: `max-age=31536000, immutable` (1 rok cache)
  - Fonts: CORS enabled, długi cache

#### SEO Essentials
- **robots.txt** - automatycznie generowany
- **sitemap.xml** - podstawowa mapa strony
- **.nojekyll** - wyłącza Jekyll processing

---

## Krok po Kroku: Konfiguracja GitHub Pages

### KROK 1: Włącz GitHub Pages w Repozytorium

1. Przejdź do swojego repozytorium na GitHub
2. Kliknij **Settings** → **Pages** (w lewym menu)
3. W sekcji "Build and deployment":
   - **Source:** wybierz `GitHub Actions`
   - Zapisz ustawienia

### KROK 2: Dostosuj Base Path (jeśli potrzebne)

#### Jeśli używasz CUSTOM DOMAIN (np. mailist.pl):

W pliku `vite.config.js` zmień:
```javascript
const base = process.env.GITHUB_PAGES === 'true'
    ? '/'  // Custom domain - użyj root path
    : '/';
```

W pliku `.github/workflows/deploy.yml`:
- Zostaw sekcję "Create CNAME file" (linia ~55)
- Upewnij się, że CNAME zawiera właściwą domenę: `mailist.pl`

#### Jeśli używasz SUBDOMAIN GitHub (username.github.io/repo-name):

W pliku `vite.config.js`:
```javascript
const base = process.env.GITHUB_PAGES === 'true'
    ? '/mailist-landing-page/'  // Zastąp nazwą swojego repo
    : '/';
```

W pliku `.github/workflows/deploy.yml`:
- **Zakomentuj** lub **usuń** sekcję "Create CNAME file"

### KROK 3: Testowanie Lokalne Przed Deployment

#### Przetestuj build lokalnie:

```bash
# Build z optymalizacjami
npm run build

# Podejrzyj lokalnie (symuluje GitHub Pages)
npm run preview:dist
```

Otwórz `http://localhost:4173` i sprawdź:
- ✅ Czy wszystkie strony działają
- ✅ Czy assety się ładują (obrazy, CSS, JS)
- ✅ Czy linki prowadzą do właściwych miejsc
- ✅ Czy nie ma błędów w konsoli przeglądarki

#### Przetestuj build z GitHub Pages base path:

```bash
# Build specjalnie dla GitHub Pages
npm run build:github

# Podejrzyj
npm run preview:dist
```

### KROK 4: Pierwszy Deployment

1. **Commit i push zmian:**

```bash
git add .
git commit -m "feat: Configure GitHub Pages deployment with performance optimizations"
git push origin main
```

2. **Monitoruj deployment:**
   - Przejdź do zakładki **Actions** w GitHub
   - Zobaczysz workflow "Deploy to GitHub Pages"
   - Kliknij na najnowszy run, aby zobaczyć postęp
   - Poczekaj aż oba joby (Build + Deploy) zakończą się ✅

3. **Znajdź URL strony:**
   - Po zakończeniu deployment, URL pojawi się w:
     - Job summary (na dole deployment job)
     - Settings → Pages → "Your site is live at..."

### KROK 5: Weryfikacja Deployment

#### A. Testuj Podstawową Funkcjonalność
- Odwiedź deployment URL
- Sprawdź wszystkie sekcje: Funkcje, Korzyści, Cennik, FAQ, Kontakt
- Przetestuj nawigację i linki
- Sprawdź responsywność (mobile/tablet/desktop)

#### B. Uruchom Lighthouse Audit

W Chrome DevTools (F12):
1. Przejdź do zakładki **Lighthouse**
2. Wybierz:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
3. Kliknij "Analyze page load"

**Oczekiwane wyniki (optymistyczne):**
- Performance: 90+ (cel: 95+)
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

#### C. Sprawdź Core Web Vitals

Użyj narzędzi:
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **WebPageTest:** https://www.webpagetest.org/

**Cele wydajnościowe:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **INP (Interaction to Next Paint):** < 200ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## Komendy NPM

```bash
# Development server
npm run dev

# Production build (standardowy)
npm run build

# Production build dla GitHub Pages
npm run build:github

# Preview build lokalnie
npm run preview

# Preview dist folder (po build)
npm run preview:dist

# Analiza bundle size (wymaga instalacji vite-bundle-visualizer)
npm run analyze
```

---

## Troubleshooting

### Problem: Strona wyświetla 404 dla assetów

**Przyczyna:** Nieprawidłowy base path

**Rozwiązanie:**
1. Sprawdź czy używasz custom domain czy subdomain
2. Dostosuj `base` w `vite.config.js` (patrz KROK 2)
3. Przebuduj: `npm run build:github`
4. Push zmiany

### Problem: Deployment workflow failuje

**Przyczyna:** Brak uprawnień GitHub Pages

**Rozwiązanie:**
1. Settings → Pages → Source → **GitHub Actions**
2. Settings → Actions → General → Workflow permissions → "Read and write permissions"
3. Re-run failed workflow

### Problem: CNAME conflict (custom domain)

**Przyczyna:** Konflikt z istniejącą konfiguracją

**Rozwiązanie:**
1. W `.github/workflows/deploy.yml` zaktualizuj CNAME na właściwą domenę
2. Lub zakomentuj sekcję "Create CNAME file" jeśli nie używasz custom domain

### Problem: Obrazy nie są optymalizowane

**Przyczyna:** Błąd w workflow podczas optymalizacji obrazów

**Rozwiązanie:**
- Workflow ma `continue-on-error: true` dla optymalizacji obrazów
- Sprawdź logi Actions, czy instalacja `jpegoptim`/`optipng` się powiodła
- Możesz optymalizować obrazy lokalnie przed commit używając:
  - https://squoosh.app/ (online)
  - https://imageoptim.com/ (desktop)

---

## Rekomendacje Optymalizacji Specyficzne dla Mailist

### 1. **Lazy Loading Obrazów**

Już zaimplementowane w HTML:
```html
<img src="..." alt="..." loading="lazy">
```

✅ Hero image: `loading="eager"` (priorytet)
✅ Poniżej fold: `loading="lazy"`

### 2. **WebP/AVIF Format**

**Obecnie:** JPG/PNG
**Rekomendacja:** Konwertuj główne obrazy do WebP z fallback

Przykład:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="...">
</picture>
```

**Narzędzia:**
- https://squoosh.app/
- `cwebp` CLI tool

### 3. **Font Optimization**

Sprawdź czy fonty są:
- Self-hosted (✅ lepsze dla wydajności)
- W formacie WOFF2
- Z `font-display: swap` w CSS

### 4. **Critical CSS Inline**

**Obecnie:** CSS ładowany z osobnych plików
**Rekomendacja:** Inline critical CSS dla above-the-fold content

Narzędzia:
- https://github.com/addyosmani/critical
- https://web.dev/extract-critical-css/

### 5. **Resource Hints**

Dodaj do `<head>` w `index.html`:

```html
<!-- Preconnect do zewnętrznych domen -->
<link rel="preconnect" href="https://app.mailist.pl">

<!-- Preload krytycznych fontów -->
<link rel="preload" href="/assets/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch dla następnej strony (jeśli masz multi-page) -->
<link rel="prefetch" href="/pricing.html">
```

### 6. **Service Worker (opcjonalnie)**

Dla zaawansowanego cache'owania offline-first:
- Workbox (https://developers.google.com/web/tools/workbox)
- vite-plugin-pwa

### 7. **Analytics Performance Budget**

Jeśli używasz Google Analytics / tracking:
- Użyj `gtag.js` zamiast `analytics.js`
- Rozważ Plausible/Fathom (lżejsze alternatywy)
- Ładuj async/defer

---

## Monitoring Wydajności

### Google Search Console
1. Zweryfikuj właściciel strony
2. Monitoruj "Core Web Vitals" report
3. Sprawdzaj "Page Experience" insights

### Real User Monitoring (RUM)
Rozważ dodanie:
- Google Analytics 4 (Web Vitals tracking)
- Cloudflare Web Analytics (privacy-friendly, darmowy)
- Plausible Analytics

### Lighthouse CI
Automatyzuj testy Lighthouse w każdym PR:
- https://github.com/GoogleChrome/lighthouse-ci

---

## Automatyczne Deployment

Każdy push do `main` lub `master` branch automatycznie:
1. ✅ Builduje projekt z optymalizacjami
2. ✅ Minifikuje HTML/CSS/JS
3. ✅ Optymalizuje obrazy
4. ✅ Generuje security headers
5. ✅ Tworzy robots.txt i sitemap.xml
6. ✅ Deployuje na GitHub Pages

**Czas deployment:** ~2-4 minuty

---

## Custom Domain Setup (jeśli używasz mailist.pl)

### W GitHub:
1. Settings → Pages → Custom domain → wpisz `mailist.pl`
2. Zaznacz "Enforce HTTPS"

### U dostawcy DNS:
Dodaj rekordy:

**Dla apex domain (mailist.pl):**
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

**Dla www subdomain:**
```
CNAME    www    <username>.github.io
```

Propagacja DNS: 24-48 godzin

---

## Security & Best Practices

### ✅ Już zaimplementowane:
- Security headers (X-Frame-Options, CSP-like Permissions-Policy)
- HTTPS enforcement
- Asset integrity (hash-based cache busting)
- No source maps w produkcji
- Minifikacja wszystkich assetów

### 📋 TODO (opcjonalnie):
- [ ] Content Security Policy (CSP) header
- [ ] Subresource Integrity (SRI) dla CDN resources
- [ ] HTTP/2 Server Push (jeśli hosting wspiera)

---

## Podsumowanie Zoptymalizowanych Assetów

Po build (`npm run build`) struktura `dist/`:

```
dist/
├── index.html                          # Minified HTML
├── regulamin.html                      # Minified HTML
├── polityka-prywatnosci.html          # Minified HTML
├── .nojekyll                          # GitHub Pages config
├── CNAME                              # Custom domain
├── robots.txt                         # SEO
├── sitemap.xml                        # SEO
├── _headers                           # Cache & Security headers
└── assets/
    ├── js/
    │   ├── index-[hash].js           # Entry point
    │   ├── vendor-core-[hash].js     # Core vendor libs
    │   ├── vendor-lucide-[hash].js   # Icons
    │   ├── vendor-preline-[hash].js  # UI components
    │   └── vendor-ui-[hash].js       # UI utilities
    ├── css/
    │   └── app-[hash].css            # Minified CSS
    └── images/
        └── [name]-[hash].[ext]       # Optimized images
```

---

## Kontakt & Wsparcie

Jeśli napotkasz problemy:
1. Sprawdź logi w GitHub Actions
2. Przejrzyj sekcję Troubleshooting powyżej
3. Uruchom build lokalnie z `npm run build` i sprawdź błędy

---

**Data konfiguracji:** 2025-12-29
**Wersja Vite:** 7.1.3
**Node.js:** 20.x (zalecana)
