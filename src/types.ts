export interface RgaaFilter {
  // TODO: implement the `level` filter
  // level?: 'A' | 'AA'
  topic?: string
  search?: string
  criterion?: string
}

export interface RgaaRawTopic {
  id: string
  title: string
}

export interface RgaaTopic extends RgaaRawTopic {
  criteria: (filter?: RgaaFilter) => RgaaCriterion[]
  tests: (filter?: RgaaFilter) => RgaaTest[]
}

export interface RgaaRawCriterion {
  id: string
  title: string
  references: {
    wcag?: string[]
    techniques?: string[]
  }
  particularCases?: string
  technicalNotes?: string
}

export interface RgaaCriterion extends RgaaRawCriterion {
  tests: (filter?: RgaaFilter) => RgaaTest[]
  topic: RgaaTopic
}

export interface RgaaRawTest {
  id: string
  title: string
}

export interface RgaaTest extends RgaaRawTest {
  criterion: RgaaCriterion
  topic: RgaaTopic
}

export interface RgaaCrawlerOptions {
  /** Text format of the returned texts : `markdown` or `text`. Defaults to `text`. */
  format?: 'markdown' | 'text'
}

export interface RgaaRawCrawlerResult {
  topics: RgaaRawTopic[]
  criteria: RgaaRawCriterion[]
  tests: RgaaRawTest[]
}

export interface RgaaCrawlerResult {
  topics: (filter?: RgaaFilter) => RgaaTopic[]
  criteria: (filter?: RgaaFilter) => RgaaCriterion[]
  tests: (filter?: RgaaFilter) => RgaaTest[]
}
