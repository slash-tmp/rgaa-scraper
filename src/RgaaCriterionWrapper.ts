import RgaaTestWrapper from './RgaaTestWrapper'
import RgaaTopicWrapper from './RgaaTopicWrapper'
import {
  RgaaCrawlerResult,
  RgaaCriterion,
  RgaaFilter,
  RgaaRawCrawlerResult,
  RgaaRawCriterion,
} from './types'

export default class RgaaCriterionWrapper implements RgaaCriterion {
  id: string
  title: string
  references?: {
    wcag?: string[]
    techniques?: string[]
  }
  particularCases?: string
  technicalNotes?: string
  private _root: RgaaRawCrawlerResult

  constructor(data: RgaaRawCriterion, root: RgaaRawCrawlerResult) {
    this.id = data.id
    this.title = data.title
    this.references = data.references
    this.particularCases = data.particularCases
    this.technicalNotes = data.technicalNotes
    this._root = root
  }

  get topic() {
    const topicId = this.id.split('.')[0]
    return new RgaaTopicWrapper(
      this._root.topics.find(topic => topic.id === topicId)!,
      this._root
    )
  }

  tests(filters?: RgaaFilter) {
    return this._root.tests
      .filter(test => test.id.startsWith(this.id))
      .filter(test => {
        if (!filters || Object.keys(filters).length === 0) {
          return true
        }

        if (
          filters.search &&
          !test.title.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false
        }

        if (filters.topic && !test.id.startsWith(filters.topic)) {
          return false
        }

        if (filters.criterion && !test.id.startsWith(filters.criterion)) {
          return false
        }

        return true
      })
      .map(test => new RgaaTestWrapper(test, this._root))
  }
}
