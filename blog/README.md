# Mailist Blog

Blog platformy email marketingu Mailist - najlepsze praktyki, poradniki i aktualizacje produktu.

## Technologia

Blog zbudowany na **Jekyll** - statyczny generator stron.

## Struktura

```
blog/
├── _config.yml          # Konfiguracja Jekyll
├── _layouts/            # Szablony stron
│   ├── default.html     # Layout bazowy
│   └── post.html        # Layout postów
├── _posts/              # Artykuły blogowe (format: YYYY-MM-DD-slug.md)
├── index.html           # Strona główna bloga
├── changelog.html       # Historia zmian produktu
└── assets/              # Zasoby (CSS, JS, obrazy)
```

## Instalacja lokalna

### Wymagania

- Ruby 2.7+
- Bundler

### Setup

```bash
cd blog
bundle install
bundle exec jekyll serve
```

Blog dostępny pod: `http://localhost:4000/blog/`

## Dodawanie nowych postów

1. Utwórz plik w `_posts/` z datą w nazwie:
   ```
   _posts/2024-11-15-jak-zwiekszyc-sprzedaz-email.md
   ```

2. Dodaj front matter:
   ```yaml
   ---
   layout: post
   title: "Jak zwiększyć sprzedaż przez email marketing"
   date: 2024-11-15
   category: Email Marketing
   author: Jan Kowalski
   reading_time: 8
   tags: [email marketing, sprzedaż, konwersja]
   excerpt: "Poznaj sprawdzone strategie..."
   ---
   ```

3. Napisz treść w Markdown

4. Zapisz i Jekyll automatycznie wygeneruje stronę

## Kategorie

- **Email Marketing** - Poradniki i best practices
- **Automatyzacja** - Workflow i scenariusze
- **Analityka** - Metryki i optymalizacja
- **Case Studies** - Historie sukcesu klientów

## Formaty wspierane

- Markdown
- HTML
- Liquid templates ({{ }}, {% %})
- Syntax highlighting dla kodu

## Deployment

Blog jest automatycznie budowany i deployowany przy push do głównej gałęzi.

### Build production

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Wygenerowane pliki znajdą się w `_site/`

## Customizacja

### Kolory i style

Edytuj `_layouts/default.html` w sekcji `<style>`

### Dodatkowe strony

Utwórz plik `.html` lub `.md` w głównym katalogu `blog/`

## Wsparcie

Pytania? Kontakt: blog@mailist.com
