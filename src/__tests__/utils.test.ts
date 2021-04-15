import { reduceWhitespaces } from '../utils'

describe('reduceWhitespaces', () => {
  it('replaces multiple consecutive spaces with a single space', () => {
    expect(reduceWhitespaces('abc  de   f')).toEqual('abc de f')
  })

  it('replaces linebreaks with a single space', () => {
    expect(reduceWhitespaces('abc\n f')).toEqual('abc f')
  })
})
