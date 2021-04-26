import RgaaCriterionWrapper from './RgaaCriterionWrapper'
import RgaaTestWrapper from './RgaaTestWrapper'
import { RgaaRootWrapper } from './RgaaRootWrapper'
import {
  RgaaCriterion,
  RgaaFilter,
  RgaaRawCrawlerResult,
  RgaaRawTopic,
  RgaaTest,
  RgaaTopic,
} from './types'
import { filterElements } from './utils'

export default class RgaaTopicWrapper
  extends RgaaRootWrapper
  implements RgaaTopic {
  id: string
  title: string

  constructor(data: RgaaRawTopic, root: RgaaRawCrawlerResult) {
    super(root)
    this.id = data.id
    this.title = data.title
  }

  criteria(filters?: RgaaFilter) {
    return this._root.criteria
      .filter(criterion => criterion.id.startsWith(this.id))
      .filter(filterElements(filters))
      .map(criterion => new RgaaCriterionWrapper(criterion, this._root))
  }

  tests(filters?: RgaaFilter) {
    return this._root.tests
      .filter(test => test.id.startsWith(this.id))
      .filter(filterElements(filters))
      .map(test => new RgaaTestWrapper(test, this._root))
  }
}
