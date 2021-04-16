# RGAA Crawler

Ce projet parcourt la page "Critères et test" du **Référentiel général
d'amélioration de l'accessibilité"** afin de générer un fichier au format JSON.

## Utilisation

```javascript
const { crawlRgaa } = require('rgaa-crawler')

crawlRgaa().then(data => {
  console.log(
    `Crawled ${data.criteria.length} criteria and ${data.tests.length} tests.`
  )
})
```

## Format de donnée

```json
{
  "criteria": [
    {
      "id": "1.1",
      "title": "Chaque image porteuse d’information a-t-elle une alternative textuelle ?"
    }
  ],
  "tests": [
    {
      "id": "1.1.1",
      "text": "Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role=\"img\") porteuse d’information a-t-elle une alternative textuelle ?\n- Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role=\"img\") porteuse d’information a-t-elle une alternative textuelle ?"
    }
  ]
}
```
