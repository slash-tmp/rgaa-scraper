import { RgaaRawCrawlerResult } from './types'

export abstract class RgaaRootWrapper {
  protected _root: RgaaRawCrawlerResult

  constructor(root: RgaaRawCrawlerResult) {
    this._root = root
    // hides the _root property from console.log and JSON.stringify
    Object.defineProperty(this, '_root', {
      enumerable: false,
    })
  }
}
