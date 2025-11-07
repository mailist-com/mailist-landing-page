# Mailist Documentation

Dokumentacja platformy Mailist zbudowana z wykorzystaniem [Fumadocs](https://fumadocs.vercel.app/).

## Wymagania

- Node.js >= 18.0.0
- npm lub pnpm

## Instalacja

```bash
cd docs
npm install
# lub
pnpm install
```

## Uruchomienie lokalnie

```bash
npm run dev
```

Dokumentacja będzie dostępna pod adresem `http://localhost:3001/docs/`

## Dodawanie nowej dokumentacji

1. Utwórz nowy plik `.mdx` w katalogu `content/docs/`
2. Dodaj front matter:

```yaml
---
title: Tytuł strony
description: Opis strony
---
```

3. Napisz treść w MDX (Markdown + React components)
4. Commit i push

## Struktura katalogów

```
docs/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── global.css      # Global styles
├── content/            # Dokumentacja
│   └── docs/           # Pliki .mdx
├── public/             # Statyczne assety
├── next.config.js      # Next.js config
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

## Funkcje Fumadocs

- **MDX Support** - Markdown z React components
- **Search** - Wbudowane wyszukiwanie
- **Dark Mode** - Automatyczny dark mode
- **Syntax Highlighting** - Kolorowanie kodu
- **Table of Contents** - Automatyczny spis treści
- **i18n** - Wsparcie dla wielu języków

## Budowanie produkcyjne

```bash
npm run build
```

Wygenerowane pliki znajdą się w katalogu `out/`

## Deployment

Dokumentacja może być hostowana na:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting

## Więcej informacji

- [Fumadocs Documentation](https://fumadocs.vercel.app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
