const fs = require('fs').promises
const path = require('path')
const { scrapeRgaa } = require('@slash-tmp/rgaa-scraper')

/** Create a .json file and fill it with RGAA tests. */
scrapeRgaa().then(async data => {
  const json = JSON.stringify(
    {
      topics: [],
      criteria: [],
      tests: data.tests(),
    },
    null,
    2
  )

  const rgaaFilePath = path.join(
    __dirname,
    '..',
    'src',
    'assets',
    'rgaa-data.json'
  )
  await fs.writeFile(rgaaFilePath, json, { encoding: 'utf-8' })

  console.log('RGAA data was successfully generated.')
})
