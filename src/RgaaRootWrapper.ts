import { RgaaRawScraperResult } from './types'

export abstract class RgaaRootWrapper {
  protected _root: RgaaRawScraperResult

  constructor(root: RgaaRawScraperResult) {
    this._root = root
    // hides the _root property from console.log and JSON.stringify
    Object.defineProperty(this, '_root', {
      enumerable: false,
    })
  }
}
