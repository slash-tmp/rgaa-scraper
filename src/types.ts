export interface RgaaFilter {
  level?: 'A' | 'AA'
  topic?: string
  search?: string
  criterion?: string
}

export interface RawRgaaTopic {
  id: string
  title: string
}

export interface RgaaTopic extends RawRgaaTopic {
  criteria: (filter?: RgaaFilter) => RgaaCriterion[]
  tests: (filter?: RgaaFilter) => RgaaTest[]
}

export interface RgaaRawCriterion {
  id: string
  title: string
  references?: {
    wcag: null | string[]
    techniques: null | string[]
  }
  particularCases?: string
  technicalNotes?: string
}

export interface RgaaCriterion extends RgaaRawCriterion {
  tests: (filter?: RgaaFilter) => RgaaTest[]
  topic: RawRgaaTopic
}

export interface RgaaRawTest {
  id: string
  title: string
}

export interface RgaaTest extends RgaaRawTest {
  criterion: RgaaCriterion
  topic: RawRgaaTopic
}

export interface RgaaCrawlerOptions {
  /**
   * Text format of the returned texts : `markdown` or `text`.
   * Defaults to `text`.
   */
  format?: 'markdown' | 'text'
}

export interface RgaaCrawlerResult {
  topics: (filter?: RgaaFilter) => RgaaTopic[]
  criteria: (filter?: RgaaFilter) => RgaaCriterion[]
  tests: (filter?: RgaaFilter) => RgaaTest[]
}
