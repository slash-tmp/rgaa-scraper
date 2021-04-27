import cheerio from 'cheerio'
import { promises as fs } from 'fs'
import path from 'path'

import { parseCriteriaArticle, parseTestLi, parseTopicA } from '../parser'

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

  it('returns a criterion with technical notes', async () => {
    const html = await loadFixtureHtml('criteria_1-8.html')

    const result = parseCriteriaArticle(cheerio.load(html)('article'))

    expect(result.technicalNotes).toEqual(
      'Le texte dans les images vectorielles étant du texte réel, il n’est pas concerné par ce critère.\n' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus velit, luctus vel dolor ut, ullamcorper lacinia lacus. Nunc sit amet tellus luctus, auctor enim nec, gravida ligula.'
    )
  })

  it('returns a criterion with list technical notes', async () => {
    const html = await loadFixtureHtml('criteria_6-1.html')

    const result = parseCriteriaArticle(cheerio.load(html)('article'))

    expect(result.technicalNotes).toEqual(
      'Lorsque l’intitulé visible est complété par une autre expression dans le nom accessible :\n' +
        '- WCAG insiste sur le placement de l’intitulé visible au début du nom accessible sans toutefois réserver l’exclusivité de cet emplacement ;\n' +
        '- WCAG considère comme un cas d’échec une correspondance non exacte de la chaîne de caractères de l’intitulé visible au sein du nom accessible.\n' +
        'Par exemple, si l’on considère l’intitulé visible « Commander maintenant » complété dans le nom accessible par l’expression «produit X », on peut avoir les différents cas suivants :\n' +
        '- « Commander maintenant produit X» est valide (bonne pratique) ;\n' +
        '- « Produit X : commander maintenant » est valide ;\n' +
        '- « Commander produit X maintenant » est non valide.'
    )
  })
})

describe('parseTestLi', () => {
  it('returns a multiline CriterionTest', async () => {
    const html = await loadFixtureHtml('test_1-4-1.html')

    const result = parseTestLi(cheerio.load(html)('li'))

    expect(result.id).toEqual('1.4.1')
    expect(result.title).toEqual(
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
    expect(result.title).toEqual(
      'Pour chaque image véhiculant une information, l’information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?'
    )
  })
})

describe('parseTopicA', () => {
  it('returns a Topic', async () => {
    const html = `<a href="#topic11">11. Structuration de l'information</a>`
    const result = parseTopicA(cheerio.load(html)('a'))

    expect(result.id).toEqual('11')
    expect(result.title).toEqual("Structuration de l'information")
  })
})
