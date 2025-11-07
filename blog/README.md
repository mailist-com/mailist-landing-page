# Mailist Blog

Blog firmy Mailist zbudowany z wykorzystaniem Jekyll.

## Wymagania

- Ruby >= 2.7
- Bundler
- Jekyll >= 4.3

## Instalacja

```bash
cd blog
bundle install
```

## Uruchomienie lokalnie

```bash
bundle exec jekyll serve
```

Blog będzie dostępny pod adresem `http://localhost:4000/blog/`

## Dodawanie nowych postów

1. Utwórz nowy plik w katalogu `_posts/` z formatem nazwy: `YYYY-MM-DD-tytul-posta.md`
2. Dodaj front matter:

```yaml
---
layout: post
title: "Tytuł posta"
date: 2025-01-15 10:00:00 +0100
categories: [email-marketing, best-practices]
author: "Mailist Team"
excerpt: "Krótki opis posta"
---
```

3. Napisz treść w Markdown
4. Commit i push do repozytorium

## Struktura katalogów

```
blog/
├── _config.yml          # Konfiguracja Jekyll
├── _posts/              # Posty na blogu
├── _layouts/            # Szablony
├── _includes/           # Komponenty wielokrotnego użytku
├── assets/              # CSS, JS, obrazy
├── Gemfile              # Ruby dependencies
└── index.html           # Strona główna bloga
```

## Budowanie produkcyjne

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Wygenerowane pliki znajdą się w katalogu `_site/`

## Deployment

Blog może być hostowany na:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

## Więcej informacji

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
