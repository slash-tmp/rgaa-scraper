import Crawler from 'crawler'
import type { CrawlerRequestResponse } from 'crawler'

import RgaaResultWrapper from './RgaaResultWrapper'
import { parseCriteriaArticle, parseTestLi, parseTopicA } from './parser'
import { RgaaCrawlerResult, RgaaRawCrawlerResult, RgaaRawTopic } from './types'

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

function parseRgaaPage({ $ }: CrawlerRequestResponse): RgaaRawCrawlerResult {
  const criteria = $('#criteres article')
    .toArray()
    .map(el => parseCriteriaArticle($(el)))

  const tests = $('#criteres li[id*="test"]')
    .toArray()
    .map(el => parseTestLi($(el)))

  const topics: RgaaRawTopic[] = $('ol#topics-list li a')
    .toArray()
    .map(el => parseTopicA($(el)))

  return {
    criteria,
    tests,
    topics,
  }
}

/**
 * Scraps the RGAA website and returns a promise to an object representing
 * topics, criteria and tests.
 */
export async function crawlRgaa(): Promise<RgaaCrawlerResult> {
  const crawler = new Crawler({})

  // fetch RGAA page
  const res = await queueAsPromise(RGAA_URL, crawler)

  // parse the page for criteria and tests
  const data = parseRgaaPage(res)

  return new RgaaResultWrapper(data)
}
