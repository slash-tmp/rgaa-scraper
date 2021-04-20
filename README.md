# RGAA Crawler

Ce projet parcourt [la page "Critères et test" du **Référentiel général
d'amélioration de l'accessibilité"**](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/) afin de générer un fichier au format JSON.

⚠️ Cette API est fournie en crawlant la page cible et son code HTML. Par conséquent, si ce dernier change, il se peut que les résultats ne soient pas accessibles.

## Utilisation

Installer le package dans le projet souhaité :

```
yarn add @slash-tmp/rgaa-crawler
```

Lancer la promesse et récupérer les résultats :

```javascript
const { crawlRgaa } = require('rgaa-crawler')

crawlRgaa().then(data => {
  console.log(
    `Crawled ${data.criteria.length} criteria and ${data.tests.length} tests.`
  )
})
```

Voici le format de données en sortie :

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

## Développement

Installer les dépendances :

```shell
yarn install
```

Tester le crawler en local :

```shell
yarn dev
```

Lancer les tests :

```shell
yarn test
```

## À propos

[![Site de /tmp](https://slash-tmp.dev/favicon.svg)](https://slash-tmp.dev)

**/tmp** est un petit studio web qui fait du développement et de la qualité.