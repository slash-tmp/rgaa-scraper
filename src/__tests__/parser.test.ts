import cheerio from 'cheerio'
import { promises as fs } from 'fs'
import path from 'path'

import { parseCriteriaArticle } from '../parser'

describe('parseCriteriaArticle', () => {
  it('works', async () => {
    // TODO: move the html loading somewhere else
    const htmlPath = path.join(
      __dirname,
      'criteria-articles',
      'criteria_1-1.html'
    )
    const html = await fs.readFile(htmlPath, { encoding: 'utf-8' })

    const result = parseCriteriaArticle(cheerio.load(html)('article'))

    expect(result.id).toEqual('1.1')
    expect(result.title).toEqual(
      'Chaque image porteuse d’information a-t-elle une alternative textuelle ?'
    )
  })
})
