# Szybki Start - GitHub Pages Deployment

## TL;DR - Najszybsza Droga

```bash
# 1. Zbuduj lokalnie (test)
npm run build

# 2. Commit i push
git add .
git commit -m "feat: Configure GitHub Pages deployment"
git push origin main

# 3. Włącz GitHub Pages
# Settings → Pages → Source: "GitHub Actions"

# 4. Gotowe! Deployment automatyczny po każdym push
```

---

## Co Zostało Skonfigurowane

### ✅ Optymalizacje Wydajności

#### Build Configuration (vite.config.js)
- **Code Splitting:** Vendor libraries podzielone na chunki (lucide, preline, charts, ui)
- **Minifikacja:** Terser dla JS, LightningCSS dla CSS
- **Cache Busting:** File hashing dla długiego cache (1 rok)
- **Tree Shaking:** Automatyczne usuwanie nieużywanego kodu
- **Compression:** Drop console.log w produkcji

#### GitHub Actions Workflow (.github/workflows/deploy.yml)
- **HTML Minification:** Automatyczna
- **Image Optimization:** JPEG (85% quality) i PNG (optipng -o3)
- **Security Headers:** X-Frame-Options, CSP, Cache-Control
- **SEO:** robots.txt i sitemap.xml auto-generated

### ✅ Bundle Analysis

**Aktualne rozmiary (po build):**
```
Całkowity rozmiar dist/: 1.7MB (przed kompresją)

JavaScript bundles:
├── app.js:           6.3 KB  → 2.2 KB gzip ✅
├── vendor-core.js:  18.5 KB  → 7.2 KB gzip ✅
├── vendor-ui.js:    24.7 KB  → 6.1 KB gzip ✅
├── vendor-preline: 220.3 KB → 45.1 KB gzip ⚠️
└── vendor-lucide:  334.7 KB → 76.5 KB gzip ⚠️

CSS:
└── app.css:        315.1 KB → 46.1 KB gzip ⚠️

HTML:
├── index.html:      78.7 KB → 13.5 KB gzip ✅
├── regulamin:       12.6 KB →  3.6 KB gzip ✅
└── polityka:        15.4 KB →  3.8 KB gzip ✅
```

**Kompresja gzip:** ~80% redukcja rozmiaru! 🎉

---

## Konfiguracja Base Path

### Jeśli używasz CUSTOM DOMAIN (mailist.pl):

✅ **Aktualna konfiguracja jest OK** - używa `/` jako base path

### Jeśli używasz subdomain (username.github.io/repo-name):

Zmień w `vite.config.js` linię 22-23:
```javascript
const base = process.env.GITHUB_PAGES === 'true'
    ? '/mailist-landing-page/'  // Zastąp nazwą swojego repo
    : '/';
```

I **usuń/zakomentuj** w `.github/workflows/deploy.yml` linię ~55:
```yaml
# - name: Create CNAME file
#   run: echo "mailist.pl" > dist/CNAME
```

---

## Włączanie GitHub Pages

### Krok 1: Ustawienia Repo
1. GitHub → Twoje repo → **Settings**
2. W lewym menu: **Pages**
3. **Source:** wybierz `GitHub Actions` (nie "Deploy from branch")
4. Zapisz

### Krok 2: Pierwszy Deployment
```bash
git add .
git commit -m "feat: Configure GitHub Pages with performance optimizations"
git push origin main
```

### Krok 3: Monitoruj Deployment
1. Przejdź do zakładki **Actions**
2. Zobaczysz workflow "Deploy to GitHub Pages"
3. Poczekaj ~2-4 minuty na zakończenie
4. URL strony znajdziesz w job summary

---

## Testowanie Lokalne

### Przed deployment - ZAWSZE testuj lokalnie:

```bash
# Build produkcyjny
npm run build

# Preview (symuluje GitHub Pages)
npm run preview:dist
```

Otwórz `http://localhost:4173` i sprawdź:
- [ ] Czy strona się ładuje
- [ ] Czy obrazy są widoczne
- [ ] Czy CSS jest załadowany
- [ ] Czy nawigacja działa
- [ ] Brak błędów w Console (F12)

---

## Komendy

| Komenda | Opis |
|---------|------|
| `npm run dev` | Development server (localhost:5173) |
| `npm run build` | Production build (standardowy) |
| `npm run build:github` | Build dla GitHub Pages (z base path) |
| `npm run preview` | Preview po build |
| `npm run preview:dist` | Preview dist folder |

---

## Performance Checklist

Po deployment sprawdź:

### 1. Lighthouse Audit
```
Chrome DevTools → Lighthouse → Analyze page load

Cele:
✅ Performance: 90+
✅ Accessibility: 95+
✅ Best Practices: 95+
✅ SEO: 100
```

### 2. Core Web Vitals
```
PageSpeed Insights: https://pagespeed.web.dev/

Cele:
✅ LCP (Largest Contentful Paint): < 2.5s
✅ INP (Interaction to Next Paint): < 200ms
✅ CLS (Cumulative Layout Shift): < 0.1
```

### 3. Bundle Size
```
npm run build

Sprawdź output - żaden chunk nie powinien przekraczać 500KB
```

---

## Quick Wins - Dalsze Optymalizacje

### 1. Konwertuj Obrazy do WebP
```bash
# Użyj narzędzia online: https://squoosh.app/
# Lub CLI: cwebp -q 85 input.jpg -o output.webp
```

Potem w HTML:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

### 2. Preload Krytycznych Fontów
W `<head>` dodaj:
```html
<link rel="preload" href="/assets/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

### 3. Reduce Icon Bundle (Lucide)
Obecnie: 334KB → Cel: <100KB

Zamiast importować całą bibliotekę, importuj tylko używane ikony:
```javascript
// Zamiast:
import * as lucide from 'lucide';

// Użyj:
import { Menu, X, Mail } from 'lucide';
```

---

## Troubleshooting

### Problem: 404 na assets
**Fix:** Sprawdź base path w vite.config.js

### Problem: Workflow fails
**Fix:** Settings → Actions → Permissions → "Read and write"

### Problem: Strona nie aktualizuje się
**Fix:** Ctrl+Shift+R (hard refresh) lub wyczyść cache

### Problem: Wolne ładowanie
**Fix:**
1. Uruchom Lighthouse
2. Sprawdź Network tab (F12)
3. Zoptymalizuj największe assety

---

## Automatyczne Deployment

✅ **Każdy push do main/master automatycznie:**
1. Buduje projekt
2. Minifikuje HTML/CSS/JS
3. Optymalizuje obrazy
4. Generuje security headers
5. Deployuje na GitHub Pages

**Czas: ~2-4 minuty**

---

## Custom Domain Setup (opcjonalne)

Jeśli posiadasz domenę (np. mailist.pl):

### GitHub:
Settings → Pages → Custom domain → wpisz `mailist.pl` → Save

### DNS Provider:
```
Typ    Host    Value
A      @       185.199.108.153
A      @       185.199.109.153
A      @       185.199.110.153
A      @       185.199.111.153

CNAME  www     <username>.github.io
```

Propagacja: 24-48h

---

## Dodatkowe Zasoby

📄 **Pełna dokumentacja:** [DEPLOYMENT.md](./DEPLOYMENT.md)

🔧 **Vite Config:** [vite.config.js](./vite.config.js)

🚀 **Workflow:** [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)

---

**Pytania?** Sprawdź [DEPLOYMENT.md](./DEPLOYMENT.md) lub troubleshooting sekcję.

✅ Powodzenia z deployment!
