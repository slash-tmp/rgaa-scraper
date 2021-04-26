import RgaaCriterionWrapper from './RgaaCriterionWrapper'
import RgaaTopicWrapper from './RgaaTopicWrapper'
import { RgaaRootWrapper } from './RgaaRootWrapper'
import type {
  RgaaRawCrawlerResult,
  RgaaRawTest,
  RgaaTest,
  RgaaCriterion,
  RgaaTopic,
} from './types'

export default class RgaaTestWrapper
  extends RgaaRootWrapper
  implements RgaaTest {
  id: string
  title: string

  constructor(data: RgaaRawTest, root: RgaaRawCrawlerResult) {
    super(root)
    this.id = data.id
    this.title = data.title
  }

  get criterion(): RgaaCriterion {
    const criterionId = this.id.split('.').slice(0, 2).join('.')
    return new RgaaCriterionWrapper(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._root.criteria.find(criterion => criterion.id === criterionId)!,
      this._root
    )
  }

  get topic(): RgaaTopic {
    const topicId = this.id.split('.')[0]
    return new RgaaTopicWrapper(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._root.topics.find(topic => topic.id === topicId)!,
      this._root
    )
  }
}
