import Crawler from 'crawler'
import type { CrawlerRequestResponse } from 'crawler'

import type { Criteria, CriteriaTest } from './types'

const RGAA_URL =
  'https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/'

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

async function crawlRgaa({ $ }: CrawlerRequestResponse): Promise<void> {
  const title = $('title').text()
  console.log('Title', title)

  const criteriaRegEx = /^Critère ((\d+\.)+) (.*)$/

  const criterias = $('#criteres article h4')
    .map(
      (_, el): Criteria => {
        const title = $(el)
        title.find('button').remove()
        const match = title.text().trim().match(criteriaRegEx)

        if (!match || !match[1] || !match[3]) {
          throw new Error('Cant parse criteria : ' + title.text())
        }

        return {
          id: match[1],
          title: match[3],
        }
      }
    )
    .toArray()

  console.log(criterias)
}
