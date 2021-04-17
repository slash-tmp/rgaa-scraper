export interface Criterion {
  id: string
  title: string
}

export interface CriterionTest {
  id: string
  text: string
}

export interface Topic {
  id: string
  topic: string
}

export interface RgaaCrawlerResult {
  criteria: Criterion[]
  tests: CriterionTest[]
  topics: Topic[]
}
