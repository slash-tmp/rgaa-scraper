import { RgaaFilter, RgaaRawTest, RgaaRawTopic } from './types'

export function reduceWhitespaces(str: string): string {
  return str.replace(/\s+/g, ' ')
}

export function filterTests(
  filters?: RgaaFilter
): (test: RgaaRawTest) => boolean {
  return test => {
    if (!filters || Object.keys(filters).length === 0) {
      return true
    }

    if (
      filters.search &&
      !test.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    if (filters.topic && !test.id.startsWith(filters.topic)) {
      return false
    }

    if (filters.criterion && !test.id.startsWith(filters.criterion)) {
      return false
    }

    return true
  }
}
