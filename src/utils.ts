import { RgaaFilter, RgaaRawCriterion, RgaaRawTest } from './types'

export function reduceWhitespaces(str: string): string {
  return str.replace(/\s+/g, ' ')
}

type FilterElementsFunction = (
  element: RgaaRawTest | RgaaRawCriterion
) => boolean

export function filterElements(filters?: RgaaFilter): FilterElementsFunction {
  return element => {
    if (!filters || Object.keys(filters).length === 0) {
      return true
    }

    if (
      filters.search &&
      !element.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    if (filters.topic && !element.id.startsWith(filters.topic)) {
      return false
    }

    if (filters.criterion && !element.id.startsWith(filters.criterion)) {
      return false
    }

    return true
  }
}
