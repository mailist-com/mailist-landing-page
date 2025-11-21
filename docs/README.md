# Dokumentacja Mailist - Jekyll + Just the Docs

Kompletna dokumentacja techniczna dla platformy Mailist, zbudowana w Jekyll z wykorzystaniem motywu Just the Docs i stylów z głównej landing page.

## Struktura projektu

```
docs/
├── _config.yml              # Konfiguracja Jekyll i Just the Docs
├── _layouts/                # Layouty stron
│   └── default.html         # Główny layout z headerem/footerem
├── _includes/               # Komponenty wielokrotnego użytku
│   ├── header.html          # Nagłówek strony (wspólny z landing page)
│   └── footer.html          # Stopka strony (wspólny z landing page)
├── _sass/                   # Nadpisania stylów SCSS
│   └── color_schemes/       # Custom color schemes
│       └── mailist.scss     # Motyw kolorystyczny Mailist
├── assets/                  # Zasoby statyczne
│   ├── css/                 # Style CSS
│   │   ├── app.css          # Główne style z landing page
│   │   └── docs-styles.css  # Dodatkowe style dla dokumentacji
│   ├── js/                  # Skrypty JavaScript
│   │   ├── app.js           # Główna logika aplikacji
│   │   ├── lucide.js        # Ikony Lucide
│   │   ├── preline.js       # Komponenty Preline
│   │   └── vendor.js        # Biblioteki zewnętrzne
│   └── images/              # Obrazy
│       └── logo.png         # Logo Mailist
├── pages/                   # Strony dokumentacji
│   ├── getting-started/     # Pierwsze kroki
│   │   ├── index.md         # Strona główna sekcji
│   │   ├── quick-start.md   # Szybki start
│   │   ├── installation.md  # Instalacja
│   │   └── faq.md          # FAQ
│   ├── api/                 # Dokumentacja API
│   │   ├── index.md         # Przegląd API
│   │   ├── authentication.md
│   │   ├── sending-emails.md
│   │   └── webhooks.md
│   ├── components/          # Komponenty
│   │   └── templates.md
│   └── deployment/          # Deploy i konfiguracja
│       └── domain-setup.md
├── index.html               # Strona główna dokumentacji
├── Gemfile                  # Zależności Ruby
└── README.md                # Ten plik
```

## Instalacja i uruchomienie

### Wymagania

- Ruby 3.0+
- Bundler
- Jekyll 4.3+

### Instalacja zależności

```bash
cd docs
bundle install
```

### Uruchomienie lokalnie

```bash
bundle exec jekyll serve
```

Dokumentacja będzie dostępna pod adresem: `http://localhost:4000/docs/`

### Uruchomienie z auto-reload

```bash
bundle exec jekyll serve --livereload
```

## Dodawanie nowej strony dokumentacji

### 1. Utwórz plik Markdown

Stwórz nowy plik w odpowiednim katalogu, np.:

```
pages/api/new-feature.md
```

### 2. Dodaj front matter

Na początku pliku dodaj metadane:

```yaml
---
layout: default
title: Tytuł Strony
parent: API Reference        # Opcjonalne - strona rodzic w nawigacji
nav_order: 5                 # Opcjonalne - kolejność w menu
has_children: false          # true jeśli strona ma podstrony
---
```

### 3. Napisz treść w Markdown

```markdown
# Tytuł Strony

Wprowadzenie do tematu...

## Sekcja 1

Treść sekcji...

### Podsekcja

Szczegółowe informacje...
```

## Front Matter - Wszystkie Opcje

```yaml
---
layout: default              # Layout (zawsze 'default')
title: Tytuł                 # Wymagany - nazwa w nawigacji
parent: Strona Rodzic        # Opcjonalne - dla hierarchii
grand_parent: Dziadek        # Opcjonalne - dla głębszej hierarchii
nav_order: 1                 # Opcjonalne - kolejność (1, 2, 3...)
has_children: true           # true jeśli ma podstrony
has_toc: true                # false aby ukryć spis treści
permalink: /custom-url/      # Opcjonalne - niestandardowy URL
description: Opis meta       # Opcjonalne - dla SEO
nav_exclude: false           # true aby ukryć w nawigacji
search_exclude: false        # true aby wykluczyć z wyszukiwania
---
```

## Komponenty Just the Docs

### Callouts (Adnotacje)

Just the Docs obsługuje różne typy callouts:

```markdown
{: .note }
> Uwaga: To jest ważna informacja

{: .tip }
> Wskazówka: Użyteczna rada

{: .warning }
> Ostrzeżenie: Zachowaj ostrożność

{: .danger }
> Niebezpieczeństwo: Może powodować problemy

{: .info }
> Informacja: Dodatkowy kontekst
```

### Przyciski

```markdown
[Link button](http://example.com/){: .btn }
[Primary button](http://example.com/){: .btn .btn-primary }
[Outline button](http://example.com/){: .btn .btn-outline }
```

### Etykiety

```markdown
Nowa funkcja {: .label .label-green }
Beta {: .label .label-yellow }
Deprecated {: .label .label-red }
```

### Kod z numerami linii

````markdown
```javascript
// Kod automatycznie ma numery linii
function hello() {
  console.log('Hello World');
}
```
````

### Tabele

```markdown
| Nagłówek 1 | Nagłówek 2 | Nagłówek 3 |
|:-----------|:----------:|----------:|
| Lewo       | Środek     | Prawo     |
| Text       | Text       | Text      |
```

## Custom Style Classes

Dokumentacja Mailist zawiera dodatkowe klasy CSS (zdefiniowane w `docs-styles.css`):

### Callouts

```html
<div class="callout callout-note">
  <div class="callout-title">Tytuł</div>
  Treść callout
</div>
```

Typy: `callout-note`, `callout-tip`, `callout-warning`, `callout-danger`, `callout-info`

### API Methods

```html
<span class="api-method api-method-get">GET</span>
<span class="api-method api-method-post">POST</span>
<span class="api-method api-method-put">PUT</span>
<span class="api-method api-method-delete">DELETE</span>
<span class="api-method api-method-patch">PATCH</span>
```

### Parameter Tables

```html
<table class="parameter-table">
  <thead>
    <tr>
      <th>Parametr</th>
      <th>Typ</th>
      <th>Wymagany</th>
      <th>Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td><span class="parameter-type">string</span></td>
      <td><span class="parameter-required">Tak</span></td>
      <td>Adres email</td>
    </tr>
  </tbody>
</table>
```

### Version Badges

```html
<span class="version-badge">v2.0</span>
<span class="status-stable">Stable</span>
<span class="status-beta">Beta</span>
<span class="status-deprecated">Deprecated</span>
```

## Konfiguracja

### Zmiana URL dokumentacji

W pliku `_config.yml` zmień:

```yaml
baseurl: "/docs"
url: "https://twoja-domena.pl"
```

### Zmiana motywu kolorystycznego

Edytuj `_sass/color_schemes/mailist.scss` aby dostosować kolory.

### Dostosowanie nawigacji

W `_config.yml`:

```yaml
# Sortowanie nawigacji
nav_sort: case_insensitive  # lub case_sensitive

# Linki pomocnicze w górnym menu
aux_links:
  "Nazwa Linku":
    - "https://url"
```

### Konfiguracja wyszukiwania

```yaml
search_enabled: true
search:
  heading_level: 2          # Indeksuj nagłówki do poziomu H2
  previews: 3               # Liczba podglądów wyników
  preview_words_before: 5   # Słów przed wynikiem
  preview_words_after: 10   # Słów po wyniku
```

## Deployment

### GitHub Pages

1. Push kod do repozytorium GitHub
2. W ustawieniach repo włącz GitHub Pages
3. Wybierz branch i folder `/docs`
4. Dokumentacja będzie dostępna pod: `https://username.github.io/repo/docs/`

### Netlify

1. Połącz repo z Netlify
2. Ustaw w ustawieniach build:
   - **Build command:** `cd docs && bundle exec jekyll build`
   - **Publish directory:** `docs/_site`
3. Deploy!

### Własny serwer

1. Zbuduj statyczne pliki:
   ```bash
   cd docs
   bundle exec jekyll build
   ```

2. Skopiuj zawartość `_site/` na serwer

3. Skonfiguruj Nginx/Apache:

   **Nginx:**
   ```nginx
   location /docs {
     alias /var/www/mailist/_site;
     index index.html;
     try_files $uri $uri/ =404;
   }
   ```

   **Apache:**
   ```apache
   Alias /docs /var/www/mailist/_site
   <Directory /var/www/mailist/_site>
     Options Indexes FollowSymLinks
     AllowOverride None
     Require all granted
   </Directory>
   ```

## Integracja z główną stroną

Dokumentacja jest zintegrowana z landing page poprzez:

1. **Wspólny header i footer** - identyczna nawigacja z menu
2. **Te same style** - Tailwind CSS + komponenty Preline
3. **Wspólne zasoby** - CSS, JS, obrazy kopiowane z bloga
4. **Spójny branding** - Ten sam motyw kolorystyczny

### Dodanie linku do dokumentacji w nawigacji

W głównym `src/index.html` dodaj:

```html
<li>
    <a href="/docs" class="text-default-800 hover:text-primary transition duration-300">
        Dokumentacja
    </a>
</li>
```

## Stylowanie i Tematy

### Tworzenie custom color scheme

Utwórz nowy plik w `_sass/color_schemes/`:

```scss
// _sass/color_schemes/custom.scss
$blue-500: #your-color;
$grey-dk-000: #your-color;
// ... inne kolory
```

Następnie w `_config.yml`:

```yaml
color_scheme: custom
```

### Dodawanie custom CSS

Utwórz plik `assets/css/custom.css` i dodaj w `_layouts/default.html`:

```html
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/custom.css">
```

## Wsparcie i problemy

### Częste problemy

**Problem: Jekyll nie startuje**
```bash
# Sprawdź wersję Ruby
ruby -v  # Wymagane 3.0+

# Reinstaluj bundler
gem install bundler
bundle install
```

**Problem: Strona nie ładuje stylów**
```bash
# Sprawdź baseurl w _config.yml
# Upewnij się że jest zgodny z rzeczywistym URL
```

**Problem: Zmiany nie są widoczne**
```bash
# Wyczyść cache Jekyll
bundle exec jekyll clean
bundle exec jekyll serve
```

### Debugowanie

Uruchom Jekyll w trybie verbose:

```bash
bundle exec jekyll serve --verbose --trace
```

## Współtworzenie

Aby dodać nową funkcjonalność lub poprawić dokumentację:

1. Fork repozytorium
2. Stwórz branch: `git checkout -b feature/new-docs`
3. Dodaj/edytuj pliki dokumentacji
4. Commit: `git commit -m "docs: Add new feature documentation"`
5. Push: `git push origin feature/new-docs`
6. Otwórz Pull Request

## Licencja

© 2025 Mailist. Wszelkie prawa zastrzeżone.

## Linki

- [Just the Docs Documentation](https://just-the-docs.com/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Mailist API](https://api.mailist.pl)
- [Mailist Blog](https://mailist.pl/blog)
