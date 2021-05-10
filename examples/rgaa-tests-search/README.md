# `rgaa-tests-search`

Ce projet est un exemple d'utilisation de la
[librairie `@slash-tmp/rgaa-scraper`](https://github.com/slash-tmp/rgaa-scraper).

1. Le script `script/generateRgaaData.js` appelle `scrapeRgaa()` et génère un
   fichier JSON avec les données du RGAA.
2. Dans `src/App.vue`, on wrap les données du fichier JSON pour pouvoir les
   exploiter et lister les tests.

## Développement

Lancer le serveur en local :

```sh
yarn generate
yarn dev
```

Builder le projet :

```sh
yarn build
```
