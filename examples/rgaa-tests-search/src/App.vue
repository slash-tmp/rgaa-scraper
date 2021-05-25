<template>
  <header class="header">
    <h1 class="title">Recherche des tests du RGAA</h1>
  </header>

  <main class="main">
    <form class="form" @submit.prevent="search">
      <div class="field">
        <label class="label" for="search">Mot clé ou expression</label>
        <input class="input" v-model="searchValue" id="search" type="text" />
      </div>
      <button class="button">Rechercher</button>
      <button class="button" @click="reset" type="reset">Réinitialiser</button>
    </form>

    <div aria-live="polite" aria-atomic="true" class="count">
      {{ filteredTests.length }}
      {{ filteredTests.length === 1 ? 'résultat' : 'résultats' }}
    </div>

    <ul class="tests">
      <li class="test" v-for="test in filteredTests" :key="test.id">
        <strong>{{ test.id }}</strong>
        {{ test.title }}
      </li>
    </ul>
  </main>
</template>

<script>
import rgaaData from './assets/rgaa-data.json'
import { RgaaResultWrapper } from '@slash-tmp/rgaa-scraper'

const rgaa = new RgaaResultWrapper(rgaaData)

export default {
  name: 'App',
  data() {
    return {
      searchValue: '',
      submittedSearch: '',
    }
  },
  computed: {
    filteredTests() {
      return rgaa.tests({ search: this.submittedSearch })
    },
  },
  methods: {
    search() {
      this.submittedSearch = this.searchValue
    },
    reset() {
      this.submittedSearch = ''
    },
  },
}
</script>

<style>
:root {
  --c-black: 0, 0%, 11%;
  --c-white: 0, 0%, 100%;
}

*:focus {
  outline: 3px dashed hsl(var(--c-black));
  outline-offset: 2px;
}

body {
  margin: 0;
  font-size: 1.2rem;
  font-family: sans-serif;
}

.header {
  background: hsl(var(--c-black));
  color: hsl(var(--c-white));
  padding: 6rem 1rem 6rem;
  text-align: center;
}

.main {
  max-width: 56rem;
  margin: 0 auto;
  padding: 1rem;
}

.form {
  background: hsl(var(--c-white));
  border-radius: 4px;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 2rem;
  max-width: 40rem;
  margin: 0 auto;
  transform: translateY(-50%);
  box-shadow: hsla(var(--c-black), 0.1) 0px 4px 6px -1px,
    hsla(var(--c-black), 0.06) 0px 2px 4px -1px;
}

.field {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.input {
  border: 1px solid hsl(var(--c-black));
  border-radius: 4px;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font: inherit;
}

.button {
  background: hsl(var(--c-black));
  color: hsl(var(--c-white));
  border: 1px solid hsl(var(--c-black));
  border-radius: 4px;
  padding: 0.5rem;
  font: inherit;
}

.count {
  text-align: center;
}

.tests {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
}

.test {
  list-style: none;
}

.test::before {
  content: '\200B';
}
</style>
