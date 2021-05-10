export type RgaaLevel = 'A' | 'AA'

export interface RgaaFilter {
  /** Criterion level filter. */
  level?: RgaaLevel

  /** Topic id filter. Only topics, criteria or tests matching this id will be returned. */
  topic?: string

  /** String matching filter. Case insensitive. */
  search?: string

  /** Criterion id filter. Only criteria or tests matching this id will be returned. */
  criterion?: string
}

/** Represent an RGAA topic category. */
export interface RgaaRawTopic {
  /** Unique id of the topic. Example: `"1"` */
  id: string
  title: string
}

export interface RgaaTopic extends RgaaRawTopic {
  /** Get a list of children criteria, optionnaly filtered. */
  criteria: (filter?: RgaaFilter) => RgaaCriterion[]

  /** Get a list of tests for children criteria, optionnaly filtered. */
  tests: (filter?: RgaaFilter) => RgaaTest[]
}

export interface RgaaRawCriterion {
  /** Unique id of the criterion. Example: `"1.2"` */
  id: string
  title: string

  references: {
    /** References to the Web Content Accessibility Guidelines standard. */
    wcag?: string[]

    /**
     * References to the W3 techniques for WCAG.
     *
     * For example :
     *
     * - `"H53"` refers to `https://www.w3.org/WAI/WCAG21/Techniques/html/H53`
     * - `"F65"` refers to `https://www.w3.org/WAI/WCAG21/Techniques/failures/F65`
     */
    techniques?: string[]
  }

  /** Notes concerning particular cases related to the criterion. In plain text format. */
  particularCases?: string

  /** Technical notes related to the criterion. In plain text format. */
  technicalNotes?: string

  /** Corresponding WCAG conformance level of the criterion. */
  level: RgaaLevel
}

export interface RgaaCriterion extends RgaaRawCriterion {
  /** Get a list of children tests, optionnaly filtered. */
  tests: (filter?: RgaaFilter) => RgaaTest[]

  /** Topic category of the criterion. */
  topic: RgaaTopic
}

export interface RgaaRawTest {
  /** Unique id of the criterion. Example: `"1.2.3"` */
  id: string
  title: string
}

export interface RgaaTest extends RgaaRawTest {
  /** Parent criterion. */
  criterion: RgaaCriterion

  /** Topic category of the test. */
  topic: RgaaTopic
}

export interface RgaaRawScraperResult {
  topics: RgaaRawTopic[]
  criteria: RgaaRawCriterion[]
  tests: RgaaRawTest[]
}

export interface RgaaScraperResult {
  /** Get a list of topics, optionnaly filtered. */
  topics: (filter?: RgaaFilter) => RgaaTopic[]

  /** Get a list of criteria, optionnaly filtered. */
  criteria: (filter?: RgaaFilter) => RgaaCriterion[]

  /** Get a list of tests, optionnaly filtered. */
  tests: (filter?: RgaaFilter) => RgaaTest[]
}
