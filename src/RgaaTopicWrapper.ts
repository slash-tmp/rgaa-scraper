import RgaaCriterionWrapper from './RgaaCriterionWrapper'
import RgaaTestWrapper from './RgaaTestWrapper'
import {
  RgaaCriterion,
  RgaaFilter,
  RgaaRawCrawlerResult,
  RgaaRawTopic,
  RgaaTest,
  RgaaTopic,
} from './types'

export default class RgaaTopicWrapper implements RgaaTopic {
  id: string
  title: string
  private _root: RgaaRawCrawlerResult

  constructor(data: RgaaRawTopic, root: RgaaRawCrawlerResult) {
    this.id = data.id
    this.title = data.title
    this._root = root
  }

  criteria() {
    return this._root.criteria
      .filter(criterion => criterion.id.startsWith(this.id))
      .map(criterion => new RgaaCriterionWrapper(criterion, this._root))
  }

  tests() {
    return this._root.tests
      .filter(test => test.id.startsWith(this.id))
      .map(test => new RgaaTestWrapper(test, this._root))
  }
}
