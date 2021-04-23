import { RgaaRawTest } from '../types'
import { filterTests, reduceWhitespaces } from '../utils'

describe('reduceWhitespaces', () => {
  it('replaces multiple consecutive spaces with a single space', () => {
    expect(reduceWhitespaces('abc  de   f')).toEqual('abc de f')
  })

  it('replaces linebreaks with a single space', () => {
    expect(reduceWhitespaces('abc\n f')).toEqual('abc f')
  })
})

describe('filterTests', () => {
  const testFixture: RgaaRawTest = {
    id: '1.1.1',
    title: 'Foobar bar test foo',
  }

  it('returns true if there are no filters or filters is empty', () => {
    expect(filterTests()(testFixture)).toBe(true)
    expect(filterTests({})(testFixture)).toBe(true)
  })

  it('filters tests based on search text', () => {
    expect(filterTests({ search: 'bar' })(testFixture)).toBe(true)
    expect(filterTests({ search: 'abracadabra' })(testFixture)).toBe(false)
  })

  it('filters based on topic', () => {
    expect(filterTests({ topic: '1' })(testFixture)).toBe(true)
    expect(filterTests({ topic: '2' })(testFixture)).toBe(false)
  })

  it('filters based on criterion', () => {
    expect(filterTests({ criterion: '1.1' })(testFixture)).toBe(true)
    expect(filterTests({ criterion: '1.2' })(testFixture)).toBe(false)
  })

  it('filters based on search and topic', () => {
    expect(filterTests({ search: 'bar', topic: '1' })(testFixture)).toBe(true)
    expect(filterTests({ search: 'bar', topic: '2' })(testFixture)).toBe(false)
    expect(filterTests({ search: 'toto', topic: '1' })(testFixture)).toBe(false)
    expect(filterTests({ search: 'toto', topic: '2' })(testFixture)).toBe(false)
  })
})
