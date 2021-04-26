# RGAA Crawler

Ce projet parcourt
[la page "Critères et test" du **Référentiel général d'amélioration de l'accessibilité"**](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/)
afin de générer un fichier au format JSON.

⚠️ Cette API est fournie en crawlant la page cible et son code HTML. Par
conséquent, si ce dernier change, il se peut que les résultats ne soient pas
accessibles.

## Installation et utilisation

Installer le package :

```sh
# Avec npm
npm install @slash-tmp/rgaa-crawler

# Avec yarn
yarn add @slash-tmp/rgaa-crawler
```

Importer et lancer la fonction `crawlRgaa()` puis récupérer les résultats de la promesse :

```javascript
const { crawlRgaa } = require('rgaa-crawler')

crawlRgaa().then(data => {
  console.log(
    `Crawled ${data.topics.length} topics, ${data.criteria.length} criteria and ${data.tests.length} tests.`
  )
})
```

Voici le format de données en sortie :

```json
{
  "topics": [
    {
      "id": "1",
      "title": "Images"
    },
    ...
  ],
  "criteria": [
    {
      "id": "1.1",
      "title": "Chaque image porteuse d’information a-t-elle une alternative textuelle ?"
    },
    ...
  ],
  "tests": [
    {
      "id": "1.1.1",
      "title": "Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role=\"img\") porteuse d’information a-t-elle une alternative textuelle ?\n- Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role=\"img\") porteuse d’information a-t-elle une alternative textuelle ?"
    },
    ...
  ]
}
```

## API

### Thématiques (`topics`)

Liste l'ensemble des thématiques du RGAA ("Images", "Cadres"...).

| Propriété | Description |
|-----------|-------------|
| `id` | Numéro de la thématique (`"1"`, `"2"`...). |
| `title` | Descriptif de la thématique. |
| `criteria()` - 🧮 filtrable | Critères appartenant à la thématique. |
| `tests()` - 🧮 filtrable | Tests appartenant aux critères de la thématique. |

### Critères (`criteria`)

Liste l'ensemble des critères du RGAA.

| Propriété | Description |
|-----------|-------------|
| `id` | Numéro du critère (`"1.2"`, `"1.3"`...). |
| `title` | Descriptif du critère. |
| `level` | Niveau WCAG du critère. |
| `references` | Références au WCAG et au W3 du critère. |
| `particularCases` | Cas particuliers d'application du critère. |
| `technicalNotes` | Note technique sur l'implémentation du critère. |
| `topic` | Thématique à laquelle est rattaché le critère. |
| `tests()` - 🧮 filtrable | Tests appartenant au critère. |

### Tests (`tests`)

Liste l'ensemble des tests du RGAA.

| Propriété | Description |
|-----------|-------------|
| `id` | Numéro du test (`"1.2.3"`, `"1.3.6"`...). |
| `title` | Descriptif du test. |
| `topic` | Thématique à laquelle est rattaché le test. |
| `criterion` | Critère auquel est rattaché le test. |

### Filtrer les résultats

Les méthodes mentionnées "filtrable" ci-dessus prennent en paramètre optionnel un objet de filtre avec plusieurs propriétés cumulables :

- `topic` : filtrer par thématique.
- `criterion` : filtrer par critère.
- `search` : filtrer par texte.
- `level` : filtrer par niveau de conformance WCAG.

Quelques exemples :

```javascript
import { crawlRgaa } from '@slash-tmp/rgaa-crawler'

crawlRgaa().then(data => {
  // Critères appartenant à la thématique 1
  console.log(data.criteria({ topic: '1' }))

  // Tests appartenant au critère 1.4
  console.log(data.tests({ criterion: '1.4' }))

  // Tests mentionnant le texte "alt"
  console.log(data.tests({ search: 'alt' }))

  // Critères ayant le niveau WCAG "AA"
  console.log(data.criteria({ level: 'AA' }))

  // Tests appartenant à la thématique 3 et ayant le niveau WCAG "A"
  console.log(data.tests({ topic: '3', level: 'A' }))
})
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
