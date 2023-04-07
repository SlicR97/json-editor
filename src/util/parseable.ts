export class Parseable<T> {
  private _start = 0
  private _current = 0

  constructor(
    private readonly elements: T[],
    private readonly end: T,
    private readonly equalityComparer: (a: T, b: T) => boolean,
  ) {}

  synchronize() {
    this._start = this._current
  }

  isAtEnd() {
    return this._current >= this.elements.length
  }

  consume(value: T, message: string): T {
    if (this.check(value)) return this.advance()!

    throw new Error(message)
  }

  check(value: T) {
    if (this.isAtEnd()) return false
    return this.equalityComparer(this.peek(), value)
  }

  advance(positions = 1) {
    this._current += positions

    const element = this.elements[this._current - 1]
    if (element) {
      return element
    }

    return this.end
  }

  peek(offset = 0) {
    if (this._current + offset >= this.elements.length) return this.end
    return this.elements[this._current + offset]!
  }

  peekNext() {
    return this.peek(1)
  }

  slice() {
    return this.elements.slice(this._start, this._current)
  }
}
