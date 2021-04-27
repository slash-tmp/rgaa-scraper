import { RgaaRawCriterion, RgaaRawTest } from '../types'
import { filterElements, reduceWhitespaces } from '../utils'

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
    expect(filterElements()(testFixture)).toBe(true)
    expect(filterElements({})(testFixture)).toBe(true)
  })

  it('filters tests based on search text', () => {
    expect(filterElements({ search: 'bar' })(testFixture)).toBe(true)
    expect(filterElements({ search: 'abracadabra' })(testFixture)).toBe(false)
  })

  it('filters based on topic', () => {
    expect(filterElements({ topic: '1' })(testFixture)).toBe(true)
    expect(filterElements({ topic: '2' })(testFixture)).toBe(false)
  })

  it('filters based on criterion', () => {
    expect(filterElements({ criterion: '1.1' })(testFixture)).toBe(true)
    expect(filterElements({ criterion: '1.2' })(testFixture)).toBe(false)
  })

  it('filters based on search and topic', () => {
    expect(filterElements({ search: 'bar', topic: '1' })(testFixture)).toBe(
      true
    )
    expect(filterElements({ search: 'bar', topic: '2' })(testFixture)).toBe(
      false
    )
    expect(filterElements({ search: 'toto', topic: '1' })(testFixture)).toBe(
      false
    )
    expect(filterElements({ search: 'toto', topic: '2' })(testFixture)).toBe(
      false
    )
  })

  it('filters based on level', () => {
    const textCriterion: RgaaRawCriterion = {
      id: '1.1',
      title: 'Foobar foo',
      level: 'A',
      references: {},
    }
    const testCriterion2: RgaaRawCriterion = {
      id: '1.2',
      title: 'Lorem ipsum',
      level: 'AA',
      references: {},
    }
    expect(filterElements({ level: 'A' })(textCriterion)).toBe(true)
    expect(filterElements({ level: 'AA' })(textCriterion)).toBe(false)
    expect(filterElements({ level: 'A' })(testCriterion2)).toBe(false)
    expect(filterElements({ level: 'AA' })(testCriterion2)).toBe(true)
  })
})
