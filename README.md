# RGAA Crawler

Ce projet parcourt [la page **"Critères et tests"** du RGAA (Référentiel général
d'amélioration de l'accessibilité)"](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/) afin de fournir l'ensemble des données au format texte brut (plain text).

⚠️ **Cette API est fournie en [scrapant](https://fr.wiktionary.org/wiki/scraper) la page cible et son code HTML. Par conséquent, si ce dernier change, il se peut que les résultats ne soient plus accessibles.**

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
  console.log(data.topics())
  console.log(data.criteria())
  console.log(data.tests())

  console.log(
    `Crawled ${data.topics().length} topics, ${data.criteria().length} criteria and ${data.tests().length} tests.`
  )
})
```

Voici le format de données en sortie :

```javascript
{
  "topics": [
    {
      "id": "1",
      "title": "Images"
    },
    // ... suite des thématiques
  ],
  "criteria": [
    {
      "id": "1.1",
      "title": "Chaque image porteuse d’information a-t-elle une alternative textuelle ?"
    },
    // ... suite des critères
  ],
  "tests": [
    {
      "id": "1.1.1",
      "title": "Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role=\"img\") porteuse d’information a-t-elle une alternative textuelle ?\n- Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role=\"img\") porteuse d’information a-t-elle une alternative textuelle ?"
    },
    // ... suite des tests
  ]
}
```

## API

Les propriétés marquée d'un astérisque (*) sont des [accesseurs](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Property_accessors) et les propriétés marquée d'un double astérisque (**) sont des méthodes.

### Thématiques (`topics`)

Liste l'ensemble des thématiques du RGAA ("Images", "Cadres"...).

| Propriété | Description |
|-----------|-------------|
| `id` | Numéro de la thématique. |
| `title` | Descriptif de la thématique. |
| `criteria()`** | Critères appartenant à la thématique. [**Filtrable**](#filtrer-les-résultats) par thématique (`topic`), niveau WCAG (`level`) et texte (`search`). |
| `tests()`** | Tests appartenant aux critères de la thématique. [**Filtrable**](#filtrer-les-résultats) par thématique (`topic`), critère (`criterion`) et texte (`search`). |

Exemple de thématique :

```javascript
{
  id: '1',
  title: 'Images',
  criteria: (filtres) =>  {
    [
      {
        id: '1.3',
        title: 'Pour chaque image porteuse d’information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?',
        references: {
          wcag: ['9.1.1.1 / 1.1.1 Non-text Content (A)', '9.4.1.2 / 4.1.2 Name, Role, Value (A)'],
          techniques: ['G94', 'G95', 'F30', 'F71', 'G196', 'ARIA6', 'ARIA9', 'ARIA10']
        },
        particularCases: "Il existe une gestion de cas particuliers lorsque l’image est utilisée comme CAPTCHA ou comme image-test. Dans cette situation, où il n’est pas possible de donner une alternative pertinente sans détruire l’objet du CAPTCHA ou du test, le critère est non applicable.\n" + "Note : le cas des CAPTCHA et des images-test est traité de manière spécifique par le critère 1.4.",
        technicalNotes: '',
        level: 'A'
      },
      // {...}
      ]
    }
  ],
  tests: (filtres) => {
    [
      {
        id: '1.3.9',
        title: 'Pour chaque image porteuse d’information et ayant une alternative textuelle, l’alternative textuelle est-elle courte et concise (hors cas particuliers) ?'
      },
      // {...}
    ]
  }
}
```

### Critères (`criteria`)

Liste l'ensemble des critères du RGAA.

| Propriété | Description |
|-----------|-------------|
| `id` | Numéro du critère |
| `title` | Descriptif du critère. |
| `level` | Niveau WCAG du critère. |
| `references` | Références au WCAG et au W3 du critère. |
| `particularCases` | Cas particuliers d'application du critère. |
| `technicalNotes` | Note technique sur l'implémentation du critère. |
| `topic`* | Thématique à laquelle est rattaché le critère. |
| `tests()`** | Tests appartenant au critère. [**Filtrable**](#filtrer-les-résultats) par thématique (`topic`), critère (`criterion`) et texte (`search`). |

Exemple de critère :

```javascript
{
  id: '1.8',
  title: 'Chaque image texte porteuse d’information, en l’absence d’un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?',
  level: 'AA',
  references: {
    wcag: ['9.1.4.5 / 1.4.5 Images of Text (AA)'],
    techniques: ['G136', 'G140', 'C22', 'C30']
  },
  particularCases: 'Pour ce critère, il existe une gestion de cas particulier lorsque le texte fait partie du logo, d’une dénomination commerciale, d’un CAPTCHA, d’une image-test ou d’une image dont l’exactitude graphique serait considérée comme essentielle à la bonne transmission de l’information véhiculée par l’image. Dans ces situations, le critère est non applicable pour ces éléments.',
  technicalNotes: 'Le texte dans les images vectorielles étant du texte réel, il n’est pas concerné par ce critère.',
  topic: {
    id: '1',
    title: 'Images'
  },
  tests: (filtres) => {
    [
      {
        id: '1.3.9',
        title: 'Pour chaque image porteuse d’information et ayant une alternative textuelle, l’alternative textuelle est-elle courte et concise (hors cas particuliers) ?'
      },
      // {...}
    ]
  }
}
```
### Tests (`tests`)

Liste l'ensemble des tests du RGAA.

| Propriété | Description |
|-----------|-------------|
| `id` | Numéro du test. |
| `title` | Descriptif du test. |
| `topic`* | Thématique à laquelle est rattaché le test. |
| `criterion`* | Critère auquel est rattaché le test. |

Exemple de test :

```javascript
{
  id: '1.8.1',
  title: 'Chaque image texte (balise <img> ou possédant un attribut WAI-ARIA role="img") porteuse d’information, en l’absence d’un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?',
  topic: {
    id: '1',
    title: 'Images'
  },
  criterion: {
    id: '1.8',
    title: 'Chaque image texte porteuse d’information, en l’absence d’un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?',
    level: 'AA',
    references: {
     wcag: ['9.1.4.5 / 1.4.5 Images of Text (AA)'],
     techniques: ['G136', 'G140', 'C22', 'C30']
    },
    particularCases: 'Pour ce critère, il existe une gestion de cas particulier lorsque le texte fait partie du logo, d’une dénomination commerciale, d’un CAPTCHA, d’une image-test ou d’une image dont l’exactitude graphique serait considérée comme essentielle à la bonne transmission de l’information véhiculée par l’image. Dans ces situations, le critère est non applicable pour ces éléments.',
    technicalNotes: 'Le texte dans les images vectorielles étant du texte réel, il n’est pas concerné par ce critère.'
  }
}
```

### Filtrer les résultats

Les méthodes mentionnées "Filtrable" ci-dessus prennent en paramètre optionnel un objet de filtre avec plusieurs propriétés :

- `topic` : filtrer par numéro de thématique.
- `criterion` : filtrer par numéro de critère.
- `search` : filtrer par recherche textuelle.
- `level` : filtrer par niveau de conformance WCAG.

Quelques exemples d'utilisation des filtres :

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
