import Crawler from 'crawler'
import type { CrawlerRequestResponse } from 'crawler'
import { promises as fs } from 'fs'

import { parseCriteriaArticle, parseTestLi } from './parser'

const RGAA_URL =
  'https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/'

async function crawlRgaa({ $ }: CrawlerRequestResponse): Promise<void> {
  const criteria = $('#criteres article')
    .toArray()
    .map(el => parseCriteriaArticle($(el)))

  const tests = $('#criteres li[id*="test"]')
    .toArray()
    .map(el => parseTestLi($(el)))

  const json = JSON.stringify({ criteria, tests }, null, 2)
  await fs.writeFile('rgaa.json', json, { encoding: 'utf-8' })

  console.log(`${criteria.length} criterias written to \`rgaa.json\``)
  console.log(`${tests.length} tests written to \`rgaa.json\``)
}

function run() {
  const crawler = new Crawler({})

  crawler.queue({
    uri: RGAA_URL,
    callback(error, res, done) {
      if (error) {
        console.log(error)
        done()
      }
      crawlRgaa(res).finally(done)
    },
  })
}

run()
