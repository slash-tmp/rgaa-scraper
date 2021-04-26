import { promises as fs } from 'fs'

import { crawlRgaa } from './index'
import RgaaCriterionWrapper from './RgaaCriterionWrapper'
import RgaaTestWrapper from './RgaaTestWrapper'
import RgaaTopicWrapper from './RgaaTopicWrapper'

crawlRgaa().then(async data => {
  const json = JSON.stringify(data, null, 2)
  await fs.writeFile('rgaa.json', json, { encoding: 'utf-8' })
  console.log(
    `Written ${data.topics.length} topics, ${data.criteria.length} criteria and ${data.tests.length} tests to rgaa.json`
  )

  const topic = new RgaaTopicWrapper(data.topics[0], data)
  const criterion = new RgaaCriterionWrapper(data.criteria[0], data)
  const test = new RgaaTestWrapper(data.tests[0], data)
  console.log(topic, criterion, test)
})
