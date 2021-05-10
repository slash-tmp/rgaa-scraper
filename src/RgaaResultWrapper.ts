import { RgaaRootWrapper } from './RgaaRootWrapper'
import RgaaTopicWrapper from './RgaaTopicWrapper'
import RgaaCriterionWrapper from './RgaaCriterionWrapper'
import RgaaTestWrapper from './RgaaTestWrapper'
import {
  RgaaScraperResult,
  RgaaFilter,
  RgaaRawScraperResult,
  RgaaTopic,
  RgaaCriterion,
  RgaaTest,
} from './types'
import { filterElements } from './utils'

export default class RgaaResultWrapper
  extends RgaaRootWrapper
  implements RgaaScraperResult {
  constructor(root: RgaaRawScraperResult) {
    super(root)
  }

  topics(filter?: RgaaFilter): RgaaTopic[] {
    return this._root.topics
      .filter(filterElements(filter))
      .map(topic => new RgaaTopicWrapper(topic, this._root))
  }

  criteria(filter?: RgaaFilter): RgaaCriterion[] {
    return this._root.criteria
      .filter(filterElements(filter))
      .map(criterion => new RgaaCriterionWrapper(criterion, this._root))
  }

  tests(filter?: RgaaFilter): RgaaTest[] {
    return this._root.tests
      .filter(filterElements(filter))
      .map(test => new RgaaTestWrapper(test, this._root))
  }
}
