export interface Criterion {
  id: string
  title: string
}

export interface CriterionTest {
  id: string
  text: string
}

export interface RgaaCrawlerResult {
  criteria: Criterion[]
  tests: CriterionTest[]
}
