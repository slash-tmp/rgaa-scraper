import RgaaTestWrapper from '../RgaaTestWrapper'
import { RgaaLevel } from '../types'

const testData = {
  tests: [
    {
      id: '1.2.3',
      title: 'Foobar foo',
    },
  ],
  criteria: [
    {
      id: '1.2',
      title: 'Criterium foobar foo',
      references: {},
      level: 'AA' as RgaaLevel,
    },
    {
      id: '1.3',
      title: 'Criterium foobar foo',
      references: {},
      level: 'A' as RgaaLevel,
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

describe('RgaaTestWrapper', () => {
  it('works', () => {
    const test = new RgaaTestWrapper(
      {
        id: '1.2.3',
        title: 'Foobar foo',
      },
      testData
    )

    expect(test.id).toEqual('1.2.3')
    expect(test.title).toEqual('Foobar foo')

    expect(test.criterion).toHaveProperty('id', '1.2')
    expect(test.criterion).toHaveProperty('title', 'Criterium foobar foo')

    expect(test.topic).toHaveProperty('id', '1')
    expect(test.topic).toHaveProperty('title', 'Topic foobar foo')
  })
})
