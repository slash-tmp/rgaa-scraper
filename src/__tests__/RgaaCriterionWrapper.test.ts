import RgaaCriterionWrapper from '../RgaaCriterionWrapper'

const testData = {
  tests: [
    {
      id: '1.2.3',
      title: 'Foo',
    },
    {
      id: '2.4.3',
      title: 'Bar',
    },
    {
      id: '1.2.6',
      title: 'Baz',
    },
  ],
  criteria: [
    {
      id: '1.2',
      title: 'Criterium foobar foo',
    },
  ],
  topics: [
    {
      id: '1',
      title: 'Topic foobar foo',
    },
    {
      id: '2',
      title: 'Topic foobar foo',
    },
  ],
}

describe('Rgaa criterion Wrapper', () => {
  it('returns correct properties', () => {
    const criterion = new RgaaCriterionWrapper(
      {
        id: '1.2',
        title: 'Criterium foobar foo',
        references: {
          wcag: ['1.3.4'],
        },
        technicalNotes: 'Foobar',
        particularCases: 'Foobaz',
      },
      testData
    )

    expect(criterion.id).toEqual('1.2')
    expect(criterion.title).toEqual('Criterium foobar foo')
    expect(criterion.references).toEqual({
      wcag: ['1.3.4'],
    })
    expect(criterion.particularCases).toEqual('Foobaz')
    expect(criterion.technicalNotes).toEqual('Foobar')

    expect(criterion.topic).toHaveProperty('id', '1')
    expect(criterion.topic).toHaveProperty('title', 'Topic foobar foo')
  })

  it('only returns tests that match criterion id', () => {
    const criterion = new RgaaCriterionWrapper(
      {
        id: '1.2',
        title: 'Criterium foobar foo',
        references: {
          wcag: ['1.3.4'],
        },
        technicalNotes: 'Foobar',
        particularCases: 'Foobaz',
      },
      testData
    )

    expect(criterion.tests()).toHaveLength(2)
  })

  it('returns filtered tests based on search', () => {
    const criterion = new RgaaCriterionWrapper(
      {
        id: '1.2',
        title: 'Criterium foobar foo',
        references: {
          wcag: ['1.3.4'],
        },
        technicalNotes: 'Foobar',
        particularCases: 'Foobaz',
      },
      testData
    )

    expect(criterion.tests({ search: 'a' })).toHaveLength(1)
  })

  it('returns unfiltered tests with empty filter', () => {
    const criterion = new RgaaCriterionWrapper(
      {
        id: '1.2',
        title: 'Criterium foobar foo',
        references: {
          wcag: ['1.3.4'],
        },
        technicalNotes: 'Foobar',
        particularCases: 'Foobaz',
      },
      testData
    )

    expect(criterion.tests({})).toHaveLength(2)
  })

  it('returns filtered tests based on topic', () => {
    const criterion = new RgaaCriterionWrapper(
      {
        id: '1.2',
        title: 'Criterium foobar foo',
        references: {
          wcag: ['1.3.4'],
        },
        technicalNotes: 'Foobar',
        particularCases: 'Foobaz',
      },
      testData
    )

    expect(criterion.tests({ topic: '1' })).toHaveLength(2)
    expect(criterion.tests({ topic: '2' })).toHaveLength(0)
  })

  it('returns filtered tests based on criterion', () => {
    const criterion = new RgaaCriterionWrapper(
      {
        id: '1.2',
        title: 'Criterium foobar foo',
        references: {
          wcag: ['1.3.4'],
        },
        technicalNotes: 'Foobar',
        particularCases: 'Foobaz',
      },
      testData
    )

    expect(criterion.tests({ criterion: '1.2' })).toHaveLength(2)
    expect(criterion.tests({ criterion: '1.3' })).toHaveLength(0)
  })
})
