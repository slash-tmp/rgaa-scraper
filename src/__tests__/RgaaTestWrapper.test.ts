import RgaaTestWrapper from '../RgaaTestWrapper'

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
    },
    {
      id: '1.3',
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
    expect(test.criterion).toEqual({
      id: '1.2',
      title: 'Criterium foobar foo',
    })
    expect(test.topic).toEqual({
      id: '1',
      title: 'Topic foobar foo',
    })
  })
})
