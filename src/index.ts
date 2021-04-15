import Crawler from 'crawler'
import type { CrawlerRequestResponse } from 'crawler'
import { promises as fs } from 'fs'

import { parseCriteriaArticle } from './parser'

const RGAA_URL =
  'https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/'

async function crawlRgaa({ $ }: CrawlerRequestResponse): Promise<void> {
  const criterias = $('#criteres article')
    .toArray()
    .map(el => parseCriteriaArticle($(el)))

  const json = JSON.stringify(criterias, null, 2)
  await fs.writeFile('rgaa.json', json, { encoding: 'utf-8' })

  console.log(`${criterias.length} criterias writter to \`rgaa.json\``)
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
