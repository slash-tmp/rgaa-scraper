import $ from 'cheerio'
import { Criterion, CriterionTest, Topic } from './types'
import { reduceWhitespaces } from './utils'

const criteriaRegEx = /^Critère ((\d+\.)+) (.*)$/

export function parseCriteriaArticle(
  articleCheerio: cheerio.Cheerio
): Criterion {
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

export function parseTestLi(liCheerio: cheerio.Cheerio): CriterionTest {
  // should have the following format : "test-1-2-3"
  const liId = liCheerio.attr('id')
  if (!liId) throw new Error('Cant parse test : no id attribute')
  const id = liId.split('-').slice(1).join('.')

  const pText = reduceWhitespaces(liCheerio.find('p').first().text())

  const listText = liCheerio
    .find('ul li p')
    .toArray()
    .map(el => '- ' + reduceWhitespaces($(el).text()))
    .join('\n')

  return {
    id,
    text: `${pText}${listText.length ? '\n' + listText : ''}`,
  }
}

const topicRegex = /(\d\d?)\. (.+)/

export function parseTopicA(aCheerio: cheerio.Cheerio): Topic {
  const match = aCheerio.text().match(topicRegex)
  if (!match || !match[1] || !match[2]) {
    throw new Error('Cant parse topic : ' + aCheerio.text())
  }
  return {
    id: match[1],
    topic: match[2],
  }
}
