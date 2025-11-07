# Mailist Documentation

Kompletna dokumentacja platformy email marketingu Mailist.

## Technologia

Dokumentacja zbudowana na **Jekyll** z motywem **Just the Docs** - profesjonalny theme dla dokumentacji technicznej.

## Struktura

```
docs/
├── _config.yml              # Konfiguracja Jekyll + Just the Docs
├── index.md                 # Strona główna dokumentacji
├── getting-started/         # Przewodnik dla początkujących
│   └── index.md
├── api/                     # Dokumentacja API
│   └── index.md
├── automation/              # Automatyzacja i workflows
├── integrations/            # Integracje z innymi platformami
├── guides/                  # Szczegółowe poradniki
└── assets/                  # Zasoby (CSS, JS, obrazy)
```

## Instalacja lokalna

### Wymagania

- Ruby 2.7+
- Bundler

### Setup

```bash
cd docs
bundle install
bundle exec jekyll serve
```

Dokumentacja dostępna pod: `http://localhost:4000/docs/`

## Dodawanie nowej dokumentacji

### 1. Utwórz plik Markdown

```bash
docs/getting-started/new-page.md
```

### 2. Dodaj front matter

```yaml
---
layout: default
title: Twoja Strona
nav_order: 3
parent: Getting Started
---
```

### 3. Napisz treść

```markdown
# Nagłówek

Treść w Markdown...

## Sekcja

Więcej treści...
```

## Front Matter - Parametry

### Podstawowe

```yaml
layout: default          # Layout (default, page)
title: "Tytuł strony"   # Tytuł w nawigacji
nav_order: 2            # Kolejność w menu (1, 2, 3...)
```

### Hierarchia

```yaml
parent: "API Reference"           # Strona rodzic
grand_parent: "Documentation"     # Strona pradziadek
```

### Nawigacja

```yaml
has_children: true      # Ma podstrony
has_toc: false         # Wyłącz table of contents
nav_exclude: true      # Ukryj w nawigacji
```

### SEO

```yaml
description: "Opis strony dla SEO"
permalink: /custom-url/
```

## Funkcje Just the Docs

### Table of Contents

Automatyczny spis treści z nagłówków h2-h6:

```markdown
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
```

### Przyciski

```markdown
[Link button](http://example.com/){: .btn }
[Primary button](http://example.com/){: .btn .btn-primary }
[Outline button](http://example.com/){: .btn .btn-outline }
```

### Callouts

```markdown
{: .note }
To jest ważna notatka.

{: .warning }
Ostrzeżenie dla użytkownika.

{: .important }
Krytyczna informacja.
```

### Code Blocks

````markdown
```javascript
const mailist = new Mailist({
  apiKey: 'your_key'
});
```
````

### Labels

```markdown
New feature
{: .label .label-green }

Deprecated
{: .label .label-red }

Beta
{: .label .label-yellow }
```

## Wyszukiwarka

Just the Docs ma wbudowaną wyszukiwarkę. Konfiguracja w `_config.yml`:

```yaml
search_enabled: true
search:
  heading_level: 2
  previews: 3
```

## Kolory i theme

### Custom color scheme

Edytuj `_config.yml`:

```yaml
color_scheme: mailist  # custom scheme
```

Dodaj plik `_sass/color_schemes/mailist.scss`:

```scss
$body-background-color: #ffffff;
$link-color: #4f46e5;
$btn-primary-color: #4f46e5;
```

## Deployment

### Build production

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

Wygenerowane pliki w `_site/`

### GitHub Pages

Automatyczny deployment przy push do `main`:

```yaml
# .github/workflows/pages.yml
name: Deploy Jekyll
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: helaili/jekyll-action@v2
```

## API Documentation Best Practices

### Struktura endpoint

```markdown
## POST /api/v3/campaigns

Creates a new email campaign.

### Request

```json
{
  "name": "Campaign Name",
  "subject": "Email Subject"
}
```

### Response

```json
{
  "id": "cmp_123",
  "status": "created"
}
```

### Errors

| Code | Message | Description |
|------|---------|-------------|
| 400 | Invalid request | Missing required field |
| 401 | Unauthorized | Invalid API key |
```

## Wsparcie

- Docs: [docs.mailist.com](https://docs.mailist.com)
- API Status: [status.mailist.com](https://status.mailist.com)
- Support: support@mailist.com
- GitHub: [github.com/mailist](https://github.com/mailist)

## Contributing

1. Fork repozytorium
2. Utwórz branch (`git checkout -b feature/new-docs`)
3. Commit zmiany (`git commit -m 'Add new documentation'`)
4. Push branch (`git push origin feature/new-docs`)
5. Otwórz Pull Request

## License

Documentation © 2024 Mailist. All rights reserved.
