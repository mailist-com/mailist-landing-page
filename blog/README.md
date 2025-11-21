# Blog Mailist - Jekyll

Blog techniczny dla platformy Mailist, zbudowany w Jekyll z wykorzystaniem stylów z głównej landing page.

## Struktura projektu

```
blog/
├── _config.yml           # Konfiguracja Jekyll
├── _layouts/             # Layouty stron
│   ├── default.html      # Główny layout
│   └── post.html         # Layout pojedynczego posta
├── _includes/            # Komponenty wielokrotnego użytku
│   ├── header.html       # Nagłówek strony
│   └── footer.html       # Stopka strony
├── _posts/               # Posty blogowe
│   ├── 2025-01-15-jak-zwiekszyc-wskaznik-otwarc-emaili.md
│   ├── 2025-01-10-automatyzacja-email-marketingu-poradnik.md
│   └── 2025-01-05-5-bledow-email-marketingu.md
├── assets/               # Zasoby statyczne
│   └── css/              # Dodatkowe style (jeśli potrzebne)
├── index.html            # Strona główna bloga
├── Gemfile               # Zależności Ruby
└── README.md             # Ten plik
```

## Instalacja i uruchomienie

### Wymagania

- Ruby 3.0+
- Bundler
- Jekyll 4.3+

### Instalacja zależności

```bash
cd blog
bundle install
```

### Uruchomienie lokalnie

```bash
bundle exec jekyll serve
```

Blog będzie dostępny pod adresem: `http://localhost:4000/blog/`

### Uruchomienie z auto-reload

```bash
bundle exec jekyll serve --livereload
```

## Dodawanie nowego posta

1. Stwórz nowy plik w katalogu `_posts/` z nazwą w formacie:
   ```
   YYYY-MM-DD-tytul-posta.md
   ```

2. Dodaj front matter na początku pliku:
   ```yaml
   ---
   layout: post
   title: "Tytuł twojego posta"
   date: 2025-01-20 10:00:00 +0100
   author: "Imię Nazwisko"
   category: "Email Marketing"
   tags: ["tag1", "tag2", "tag3"]
   featured: false
   read_time: "8 min"
   image: "/assets/images/landing/email.jpg"
   excerpt: "Krótki opis posta (150-160 znaków)"
   ---
   ```

3. Napisz treść posta w Markdown poniżej front matter

### Przykładowy post

```markdown
---
layout: post
title: "Jak napisać skuteczny subject line?"
date: 2025-01-20 10:00:00 +0100
author: "Anna Kowalska"
category: "Email Marketing"
tags: ["subject line", "copywriting", "wskaźnik otwarć"]
featured: true
read_time: "6 min"
image: "/assets/images/landing/email.jpg"
excerpt: "Poznaj 7 sprawdzonych szablonów tematów emaili, które zwiększą Twoje otwarcia o 50%+"
---

# Wprowadzenie

Treść posta w Markdown...

## Sekcja 1

Lorem ipsum dolor sit amet...

### Podsekcja

- Punkt 1
- Punkt 2
- Punkt 3

## Podsumowanie

Podsumowanie posta...
```

## Konfiguracja

### Zmiana URL bloga

W pliku `_config.yml` zmień:

```yaml
baseurl: "/blog"
url: "https://twoja-domena.pl"
```

### Paginacja

Domyślnie: 10 postów na stronę. Aby zmienić, edytuj w `_config.yml`:

```yaml
paginate: 15  # lub inna liczba
```

### Meta tagi i SEO

Jekyll automatycznie generuje meta tagi dzięki pluginowi `jekyll-seo-tag`.

Możesz dodać/edytować w `_config.yml`:

```yaml
title: Blog Mailist
description: Twój opis
author:
  name: Mailist
  email: blog@mailist.pl
  twitter: mailist_pl
```

## Stylowanie

Blog wykorzystuje te same style co główna landing page:
- Tailwind CSS
- Lucide Icons
- Preline UI components

### Dodawanie custom CSS

Jeśli potrzebujesz dodatkowych stylów, utwórz plik:

```
assets/css/custom.css
```

I dodaj w `_layouts/default.html`:

```html
<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
```

## Deployment

### GitHub Pages

1. Skopiuj zawartość `blog/` do katalogu `docs/` w głównym repo
2. W ustawieniach GitHub repo włącz GitHub Pages z folderu `docs/`
3. Blog będzie dostępny pod: `https://twoja-nazwa.github.io/repo-name/blog/`

### Netlify

1. Połącz repo z Netlify
2. Ustaw w ustawieniach build:
   - **Build command:** `cd blog && bundle exec jekyll build`
   - **Publish directory:** `blog/_site`

### Własny serwer

1. Zbuduj statyczne pliki:
   ```bash
   cd blog
   bundle exec jekyll build
   ```

2. Skopiuj zawartość `_site/` na serwer

3. Skonfiguruj Nginx/Apache aby serwował pliki z tego katalogu

## Integracja z główną stroną

Blog jest zintegrowany z główną landing page poprzez:

1. **Wspólny header i footer** - identyczna nawigacja
2. **Te same style** - Tailwind CSS + komponenty Preline
3. **Wspólne linki** - nawigacja prowadzi do głównej strony (`/`) i bloga (`/blog`)

### Dodanie linku do bloga w main navigation

W pliku `src/index.html` dodaj w menu:

```html
<li>
    <a href="/blog" class="text-default-800 hover:text-primary transition duration-300">Blog</a>
</li>
```

## Tworzenie kategorii i tagów

### Kategorie

Każdy post może mieć jedną kategorię:

```yaml
category: "Email Marketing"
```

Dostępne kategorie (możesz dodawać własne):
- Email Marketing
- Automatyzacja
- Case Studies
- Poradniki

### Tagi

Każdy post może mieć wiele tagów:

```yaml
tags: ["wskaźnik otwarć", "subject line", "segmentacja"]
```

## Wsparcie i problemy

Jeśli napotkasz problemy:

1. Sprawdź logi Jekyll: `bundle exec jekyll serve --verbose`
2. Upewnij się, że wszystkie zależności są zainstalowane: `bundle install`
3. Sprawdź wersję Ruby: `ruby -v` (wymagane 3.0+)

## Licencja

© 2025 Mailist. Wszelkie prawa zastrzeżone.
