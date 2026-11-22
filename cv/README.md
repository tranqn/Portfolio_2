# Öffentlicher Lebenslauf

Quellen für die PDFs, die das Portfolio unter `/cv/` ausliefert. Basis ist
`Bewerbungen/go-e/Lebenslauf_go-e.md` (DE) plus englische Übersetzung. Ohne Straße,
Telefon und Geburtsdatum, weil die Dateien öffentlich sind (die Adresse steht im Impressum).

```bash
node ~/Desktop/repos/Bewerbungen/_render/build.mjs cv/Quoc-Nam-Tran-Lebenslauf.md cv/Quoc-Nam-Tran-CV-en.md
cp cv/*.pdf public/cv/
```

Danach `HERO.CV_META` in `public/i18n/{de,en}.json` an die Dateigröße anpassen.
