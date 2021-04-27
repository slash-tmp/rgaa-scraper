import RgaaTopicWrapper from '../RgaaTopicWrapper'
import { RgaaLevel } from '../types'

const testData = {
  criteria: [
    {
      id: '1.1',
      title:
        'Chaque image porteuse d’information a-t-elle une alternative textuelle ?',
      references: {},
      level: 'A' as RgaaLevel,
    },
    {
      id: '1.2',
      title:
        'Chaque image de décoration est-elle correctement ignorée par les technologies d’assistance ?',
      references: {},
      level: 'A' as RgaaLevel,
    },
    {
      id: '1.3',
      title:
        'Pour chaque image porteuse d’information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?',
      references: {},
      level: 'AA' as RgaaLevel,
    },
    {
      id: '1.4',
      title:
        'Pour chaque image utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d’identifier la nature et la fonction de l’image ?',
      references: {},
      level: 'A' as RgaaLevel,
    },
    {
      id: '1.5',
      title:
        'Pour chaque image utilisée comme CAPTCHA, une solution d’accès alternatif au contenu ou à la fonction du CAPTCHA est-elle présente ?',
      references: {},
      level: 'AA' as RgaaLevel,
    },
    {
      id: '2.1',
      title: 'Chaque cadre a-t-il un titre de cadre ?',
      references: {},
      level: 'AA' as RgaaLevel,
    },
    {
      id: '2.2',
      title:
        'Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?',
      references: {},
      level: 'AA' as RgaaLevel,
    },
    {
      id: '3.1',
      title:
        'Dans chaque page web, l’information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?',
      references: {},
      level: 'AA' as RgaaLevel,
    },
    {
      id: '3.2',
      title:
        'Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé (hors cas particuliers) ?',
      references: {},
      level: 'AA' as RgaaLevel,
    },
  ],
  tests: [
    {
      id: '1.1.1',
      title:
        'Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role="img") porteuse d’information a-t-elle une alternative textuelle ?\n- Chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role="img") porteuse d’information a-t-elle une alternative textuelle ?',
    },
    {
      id: '1.1.2',
      title:
        'Chaque zone d’une image réactive (balise <area>) porteuse d’information a-t-elle une alternative textuelle ?\n- Chaque zone d’une image réactive (balise <area>) porteuse d’information a-t-elle une alternative textuelle ?',
    },

    {
      id: '1.2.1',
      title:
        'Chaque image (balise <img>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?\n- La balise <img> possède un attribut alt vide (alt="") et est dépourvue de tout autre attribut permettant de fournir une alternative textuelle ;\n- La balise <img> possède un attribut WAI-ARIA aria-hidden="true" ou role="presentation".',
    },
    {
      id: '1.2.2',
      title:
        'Chaque zone non cliquable (balise <area> sans attribut href) de décoration, vérifie-t-elle une de ces conditions ?\n- La balise <area> possède un attribut alt vide (alt="") et est dépourvue de tout autre attribut permettant de fournir une alternative textuelle ;\n- La balise <area> possède un attribut WAI-ARIA aria-hidden="true" ou role="presentation".',
    },

    {
      id: '1.3.1',
      title:
        'Pour chaque image (balise <img> ou balise possédant l’attribut WAI-ARIA role="img") porteuse d’information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?\n- S’il est présent, le contenu de l’attribut alt est pertinent ;\n- S’il est présent, le contenu de l’attribut title est pertinent ;\n- S’il est présent, le contenu de l’attribut WAI-ARIA aria-label est pertinent ;\n- S’il est présent, le passage de texte associé via l’attribut WAI-ARIA aria-labelledby est pertinent.',
    },
    {
      id: '1.3.2',
      title:
        'Pour chaque zone (balise <area>) d’une image réactive porteuse d’information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?\n- S’il est présent, le contenu de l’attribut alt est pertinent ;\n- S’il est présent, le contenu de l’attribut title est pertinent ;\n- S’il est présent, le contenu de l’attribut WAI-ARIA aria-label est pertinent ;\n- S’il est présent, le passage de texte associé via l’attribut WAI-ARIA aria-labelledby est pertinent.',
    },

    {
      id: '1.4.1',
      title:
        'Pour chaque image (balise <img>) utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ?\n- S’il est présent, le contenu de l’attribut alt est pertinent ;\n- S’il est présent, le contenu de l’attribut title est pertinent ;\n- S’il est présent, le contenu de l’attribut WAI-ARIA aria-label est pertinent ;\n- S’il est présent, le passage de texte associé via l’attribut WAI-ARIA aria-labelledby est pertinent.',
    },
    {
      id: '1.4.2',
      title:
        'Pour chaque zone (balise <area>) d’une image réactive utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ?\n- S’il est présent, le contenu de l’attribut alt est pertinent ;\n- S’il est présent, le contenu de l’attribut title est pertinent ;\n- S’il est présent, le contenu de l’attribut WAI-ARIA aria-label est pertinent ;\n- S’il est présent, le passage de texte associé via l’attribut WAI-ARIA aria-labelledby est pertinent.',
    },

    {
      id: '1.5.1',
      title:
        'Chaque image (balises <img>, <area>, <object>, <embed>, <svg>, <canvas> ou possédant un attribut WAI-ARIA role="img") utilisée comme CAPTCHA vérifie-t-elle une de ces conditions ?\n- Il existe une autre forme de CAPTCHA non graphique, au moins ;\n- Il existe une autre solution d’accès à la fonctionnalité qui est sécurisée par le CAPTCHA.',
    },
    {
      id: '1.5.2',
      title:
        'Chaque bouton associé à une image (balise input avec l’attribut type="image") utilisée comme CAPTCHA vérifie-t-il une de ces conditions ?\n- Il existe une autre forme de CAPTCHA non graphique, au moins ;\n- Il existe une autre solution d’accès à la fonctionnalité sécurisée par le CAPTCHA.',
    },
    {
      id: '2.1.1',
      title:
        'Chaque cadre (balise <iframe> ou <frame>) a-t-il un attribut title ?',
    },
    {
      id: '2.2.1',
      title:
        'Pour chaque cadre (balise <iframe> ou <frame>) ayant un attribut title, le contenu de cet attribut est-il pertinent ?',
    },
    {
      id: '3.1.1',
      title:
        'Pour chaque mot ou ensemble de mots dont la mise en couleur est porteuse d’information, l’information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?',
    },
    {
      id: '3.1.2',
      title:
        'Pour chaque indication de couleur donnée par un texte, l’information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?',
    },
  ],
  topics: [
    {
      id: '1',
      title: 'Images',
    },
    {
      id: '2',
      title: 'Cadres',
    },
    {
      id: '3',
      title: 'Couleurs',
    },
  ],
}

describe('RgaaTopicWrapper', () => {
  it('can be instanciated', () => {
    new RgaaTopicWrapper(testData.topics[0], testData)
  })

  describe('criteria', () => {
    it('returns a list of criteria', () => {
      const topic = new RgaaTopicWrapper(testData.topics[0], testData)
      expect(topic.criteria()).toHaveLength(5)
    })
  })

  describe('tests', () => {
    it('returns a list of tests', () => {
      const topic = new RgaaTopicWrapper(testData.topics[0], testData)
      expect(topic.tests()).toHaveLength(10)
    })
  })
})
