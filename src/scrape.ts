import 'isomorphic-fetch'
import cheerio from 'cheerio'

import RgaaResultWrapper from './RgaaResultWrapper'
import { parseCriteriaArticle, parseTestLi, parseTopicA } from './parser'
import type {
  RgaaScraperResult,
  RgaaRawScraperResult,
  RgaaRawTopic,
} from './types'

const RGAA_URL =
  'https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/'

function parseRgaaPage($: cheerio.Root): RgaaRawScraperResult {
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
 * Scrapes the RGAA website and returns a promise to an object representing
 * topics, criteria and tests.
 */
export default async function scrapeRgaa(): Promise<RgaaScraperResult> {
  const response = await fetch(RGAA_URL)
  const html = await response.text()

  const $ = cheerio.load(html)

  // parse the page for criteria and tests
  const data = parseRgaaPage($)

  return new RgaaResultWrapper(data)
}
