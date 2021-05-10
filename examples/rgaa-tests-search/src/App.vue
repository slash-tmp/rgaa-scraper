<template>
  <h1>Recherche des tests du RGAA</h1>

  <form @submit.prevent="search">
    <label for="search">Recherche textuelle</label>
    <input v-model="searchValue" id="search" type="text" />
    <button>Rechercher</button>
    <button @click="reset" type="reset">Réinitialiser</button>
  </form>

  <ul>
    <li v-for="test in filteredTests" :key="test.id">
      <strong>{{ test.id }}</strong>
      {{ test.title }}
    </li>
  </ul>
</template>

<script>
import rgaaData from './assets/rgaa-data.json'
import RgaaResultWrapper from '@slash-tmp/rgaa-scraper/build/esm/RgaaResultWrapper'

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
