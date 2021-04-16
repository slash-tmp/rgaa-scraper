import cheerio from 'cheerio'
import { promises as fs } from 'fs'
import path from 'path'

import { parseCriteriaArticle, parseTestLi } from '../parser'

async function loadFixtureHtml(filename: string): Promise<string> {
  const htmlPath = path.join(__dirname, 'criteria-articles', filename)
  const html = await fs.readFile(htmlPath, { encoding: 'utf-8' })
  return html
}

describe('parseCriteriaArticle', () => {
  it('returns a criterion', async () => {
    const html = await loadFixtureHtml('criteria_1-1.html')

    const result = parseCriteriaArticle(cheerio.load(html)('article'))

    expect(result.id).toEqual('1.1')
    expect(result.title).toEqual(
      'Chaque image porteuse d’information a-t-elle une alternative textuelle ?'
    )
  })
})

describe('parseTestLi', () => {
  it('returns a multiline CriterionTest', async () => {
    const html = await loadFixtureHtml('test_1-4-1.html')

    const result = parseTestLi(cheerio.load(html)('li'))

    expect(result.id).toEqual('1.4.1')
    expect(result.text).toEqual(
      'Pour chaque image (balise <img>) utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ?\n' +
        '- S’il est présent, le contenu de l’attribut alt est pertinent ;\n' +
        '- S’il est présent, le contenu de l’attribut title est pertinent ;\n' +
        '- S’il est présent, le contenu de l’attribut WAI-ARIA aria-label est pertinent ;\n' +
        '- S’il est présent, le passage de texte associé via l’attribut WAI-ARIA aria-labelledby est pertinent.'
    )
  })

  it('returns a single line CriterionTest', async () => {
    const html = await loadFixtureHtml('test_3-1-3.html')

    const result = parseTestLi(cheerio.load(html)('li'))

    expect(result.id).toEqual('3.1.3')
    expect(result.text).toEqual(
      'Pour chaque image véhiculant une information, l’information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?'
    )
  })
})
