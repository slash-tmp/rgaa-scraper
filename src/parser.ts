import { Criteria } from './types'
import { reduceWhitespaces } from './utils'

const criteriaRegEx = /^Critère ((\d+\.)+) (.*)$/

export function parseCriteriaArticle(
  articleCheerio: cheerio.Cheerio
): Criteria {
  const title = articleCheerio.find('h4')

  // remove the button element from the title
  articleCheerio.find('button').remove()

  // get the title text and clean it
  const titleText = reduceWhitespaces(title.text().trim())

  const match = titleText.match(criteriaRegEx)

  if (!match || !match[1] || !match[3]) {
    throw new Error('Cant parse criteria : ' + articleCheerio.find('h4').text())
  }

  return {
    id: match[1]
      .split('.')
      .filter(i => i)
      .join('.'),
    title: match[3],
  }
}
