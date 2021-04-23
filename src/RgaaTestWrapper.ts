import RgaaCriterionWrapper from './RgaaCriterionWrapper'
import RgaaTopicWrapper from './RgaaTopicWrapper'
import type {
  RgaaRawCrawlerResult,
  RgaaRawTest,
  RgaaTest,
  RgaaCriterion,
  RgaaTopic,
} from './types'

export default class RgaaTestWrapper implements RgaaTest {
  id: string
  title: string
  private _root: RgaaRawCrawlerResult

  constructor(data: RgaaRawTest, root: RgaaRawCrawlerResult) {
    this.id = data.id
    this.title = data.title
    this._root = root
  }

  get criterion(): RgaaCriterion {
    const criterionId = this.id.split('.').slice(0, 2).join('.')
    return new RgaaCriterionWrapper(
      this._root.criteria.find(criterion => criterion.id === criterionId)!,
      this._root
    )
  }

  get topic(): RgaaTopic {
    const topicId = this.id.split('.')[0]
    return new RgaaTopicWrapper(
      this._root.topics.find(topic => topic.id === topicId)!,
      this._root
    )
  }
}
