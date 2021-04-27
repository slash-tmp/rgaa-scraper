import RgaaResultWrapper from '../RgaaResultWrapper'

const testData = {
  tests: [
    {
      id: '1.2.3',
      title: 'Foo',
    },
    {
      id: '1.2.4',
      title: 'Bar',
    },
    {
      id: '2.1.2',
      title: 'Baz',
    },
  ],
  criteria: [
    {
      id: '1.2',
      title: 'Criterium foobar foo',
      references: {},
    },
    {
      id: '1.3',
      title: 'Criterium foobar bar',
      references: {},
    },
    {
      id: '2.1',
      title: 'Criterium foobar baz',
      references: {},
    },
  ],
  topics: [
    {
      id: '1',
      title: 'Topic foobar foo',
    },
    {
      id: '2',
      title: 'Topic foobar baz',
    },
  ],
}

describe('RgaaResultWrapper', () => {
  it('return topics', () => {
    const rgaaResultWrapper = new RgaaResultWrapper(testData)

    expect(rgaaResultWrapper.topics()).toHaveLength(2)
    expect(rgaaResultWrapper.topics({ topic: '1' })).toHaveLength(1)
    expect(rgaaResultWrapper.topics({ search: 'baz' })).toHaveLength(1)
  })

  it('return criteria', () => {
    const rgaaResultWrapper = new RgaaResultWrapper(testData)

    expect(rgaaResultWrapper.criteria()).toHaveLength(3)
    expect(rgaaResultWrapper.criteria({ topic: '1' })).toHaveLength(2)
    expect(rgaaResultWrapper.criteria({ criterion: '1.2' })).toHaveLength(1)
    expect(rgaaResultWrapper.criteria({ search: 'baz' })).toHaveLength(1)
  })

  it('return tests', () => {
    const rgaaResultWrapper = new RgaaResultWrapper(testData)

    expect(rgaaResultWrapper.tests()).toHaveLength(3)
    expect(rgaaResultWrapper.tests({ topic: '1' })).toHaveLength(2)
    expect(rgaaResultWrapper.tests({ criterion: '1.2' })).toHaveLength(2)
    expect(rgaaResultWrapper.tests({ search: 'baz' })).toHaveLength(1)
  })
})
