import type {
  RgaaRawCrawlerResult,
  RgaaRawTest,
  RgaaTest,
  RgaaRawCriterion,
  RgaaRawTopic,
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

  get criterion(): RgaaRawCriterion {
    const criterionId = this.id.split('.').slice(0, 2).join('.')
    return this._root.criteria.find(criterion => criterion.id === criterionId)!
  }

  get topic(): RgaaRawTopic {
    const topicId = this.id.split('.')[0]
    return this._root.topics.find(topic => topic.id === topicId)!
  }
}
