import { Parseable } from './parseable'

export class StringParseable extends Parseable<string> {
  private _currentLine = 1
  private _currentColumn = 1

  get currentLine() {
    return this._currentLine
  }

  get currentColumn() {
    return this._currentColumn
  }

  constructor(input: string) {
    super(input.split(''), '\0', (a, b) => a === b)
  }

  advanceLine() {
    this._currentLine++
    this._currentColumn = 1
    super.advance()
  }

  override advance(positions?: number): string
  override advance(positions?: number, advanceColumn?: boolean): string

  override advance(positions = 1, advanceColumn = true) {
    if (advanceColumn) this._currentColumn += positions
    return super.advance(positions)
  }
}
