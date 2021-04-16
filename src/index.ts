import Crawler from 'crawler'
import type { CrawlerRequestResponse } from 'crawler'

import { parseCriteriaArticle, parseTestLi } from './parser'
import { RgaaCrawlerResult } from './types'

const RGAA_URL =
  'https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/'

function queueAsPromise(
  uri: string,
  crawler: Crawler
): Promise<CrawlerRequestResponse> {
  return new Promise((resolve, reject) => {
    crawler.direct({
      uri,
      callback(error, response) {
        if (error) {
          reject(error)
        }
        resolve(response)
      },
    })
  })
}

function parseRgaaPage({ $ }: CrawlerRequestResponse): RgaaCrawlerResult {
  const criteria = $('#criteres article')
    .toArray()
    .map(el => parseCriteriaArticle($(el)))

  const tests = $('#criteres li[id*="test"]')
    .toArray()
    .map(el => parseTestLi($(el)))

  return {
    criteria,
    tests,
  }
}

export async function crawlRgaa(): Promise<RgaaCrawlerResult> {
  const crawler = new Crawler({})

  // fetch RGAA page
  const res = await queueAsPromise(RGAA_URL, crawler)

  // parse the page for criteria and tests
  const data = parseRgaaPage(res)

  return data
}
