import $ from 'cheerio'
import { RgaaRawCriterion, RgaaRawTest, RgaaRawTopic } from './types'
import { reduceWhitespaces } from './utils'

const criteriaRegEx = /^Critère ((\d+\.)+) (.*)$/

function parseCriterionAside(elements: cheerio.Cheerio[]): string {
  return elements
    .map(el => $(el))
    .map(el => {
      if (el.is('ul')) {
        const res = el
          .children()
          .toArray()
          .map(childEl => '- ' + reduceWhitespaces($(childEl).text().trim()))
          .join('\n')
        return res
      } else {
        return reduceWhitespaces(el.text().trim())
      }
    })
    .join('\n')
}

export function parseCriteriaArticle(
  articleCheerio: cheerio.Cheerio
): RgaaRawCriterion {
  const h4 = articleCheerio.find('h4')

  // remove the button element from the title
  articleCheerio.find('button').remove()

  // get the title text and clean it
  const titleText = reduceWhitespaces(h4.text().trim())

  const match = titleText.match(criteriaRegEx)

  if (!match || !match[1] || !match[3]) {
    throw new Error('Cant parse criteria : ' + articleCheerio.find('h4').text())
  }

  const id = match[1]
    .split('.')
    .filter(i => i)
    .join('.')

  const title = match[3]

  const asideElements = {
    technicalNotes: [] as cheerio.Cheerio[],
    particularCases: [] as cheerio.Cheerio[],
    references: [] as cheerio.Cheerio[],
  }
  let currentSection: null | keyof typeof asideElements = null

  articleCheerio
    .find('.aside > *')
    .toArray()
    .map(el => $(el))
    .forEach(el => {
      if (el.is('h5') && el.text().includes('Notes techniques')) {
        currentSection = 'technicalNotes'
      } else if (el.is('h5') && el.text().includes('Cas particuliers')) {
        currentSection = 'particularCases'
      } else if (
        el.is('h5') &&
        (el.text().includes('Correspondances WCAG 2.1') ||
          el.text().includes('Correspondances EN 301 549 V2.1.2 (2018-08)'))
      ) {
        currentSection = 'references'
      } else if (currentSection) {
        asideElements[currentSection].push(el)
      }
    })

  const technicalNotes = parseCriterionAside(asideElements.technicalNotes)
  const particularCases = parseCriterionAside(asideElements.particularCases)

  return {
    id,
    title,
    references: {},
    ...(!!technicalNotes && { technicalNotes }),
    ...(!!particularCases && { particularCases }),
  }
}

export function parseTestLi(liCheerio: cheerio.Cheerio): RgaaRawTest {
  // should have the following format : "test-1-2-3"
  const liId = liCheerio.attr('id')
  if (!liId) throw new Error('Cant parse test : no id attribute')
  const id = liId.split('-').slice(1).join('.')

  const pText = reduceWhitespaces(liCheerio.find('p').first().text()).trim()

  const listText = liCheerio
    .find('ul li p')
    .toArray()
    .map(el => '- ' + reduceWhitespaces($(el).text()).trim())
    .join('\n')

  return {
    id,
    title: `${pText}${listText.length ? '\n' + listText : ''}`,
  }
}

const topicRegex = /(\d\d?)\. (.+)/

export function parseTopicA(aCheerio: cheerio.Cheerio): RgaaRawTopic {
  const match = aCheerio.text().match(topicRegex)
  if (!match || !match[1] || !match[2]) {
    throw new Error('Cant parse topic : ' + aCheerio.text())
  }
  return {
    id: match[1],
    title: match[2],
  }
}
