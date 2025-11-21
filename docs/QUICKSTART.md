# Szybkie Uruchomienie Dokumentacji

## Krok 1: Wyczyść stary build
```bash
cd docs
rm -rf _site .jekyll-cache
```

## Krok 2: Zainstaluj zależności
```bash
bundle install
```

## Krok 3: Uruchom Jekyll
```bash
bundle exec jekyll serve --port 4001 --livereload --trace
```

## Krok 4: Otwórz przeglądarkę
Przejdź do: http://localhost:4001/docs/

## Co powinno się załadować:

✅ Header ze stylem landing page
✅ Boczna nawigacja (sidebar) w białym boxie
✅ Główna treść w białym boxie z Tailwind CSS
✅ Footer

## Jeśli nadal są problemy:

### Problem: Style nie ładują się
```bash
# Sprawdź czy pliki CSS są w _site
ls -la _site/assets/css/

# Powinny być:
# - app.css (209K)
# - blog-styles.css (9.8K)
# - docs-styles.css (9.7K)
```

### Problem: 404 na CSS
```bash
# Sprawdź w przeglądarce Developer Tools (F12) -> Network
# Zobacz jakie ścieżki CSS są próbowane załadować
```

### Problem: Port zajęty
```bash
# Zabij proces na porcie
lsof -ti:4001 | xargs kill -9

# Lub użyj innego portu
bundle exec jekyll serve --port 4002
```

## Debug
```bash
# Zobacz logi Jekyll szczegółowo
bundle exec jekyll serve --port 4001 --verbose --trace
```
