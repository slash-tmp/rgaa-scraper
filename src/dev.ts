import { promises as fs } from 'fs'

import { crawlRgaa } from './index'

crawlRgaa().then(async data => {
  const json = JSON.stringify(
    {
      topics: data.topics(),
      criteria: data.criteria(),
      tests: data.tests(),
    },
    null,
    2
  )
  await fs.writeFile('rgaa.json', json, { encoding: 'utf-8' })
  console.log(
    `Written ${data.topics().length} topics, ${
      data.criteria().length
    } criteria and ${data.tests().length} tests to rgaa.json`
  )

  const altMatch = data.tests({ search: 'alt' })
  console.log(`'alt' search returned ${altMatch.length} tests`)
})
