export class Parseable<T> {
  private _start = 0
  private _current = 0

  get start() {
    return this._start
  }

  get current() {
    return this._current
  }

  constructor(private readonly elements: T[], private readonly end: T) {}

  synchronize() {
    this._start = this.current
  }

  isAtEnd() {
    return this.current >= this.elements.length
  }

  advance() {
    this._current += 1
    return this.elements[this.current - 1]
  }

  peek() {
    if (this.isAtEnd()) return this.end
    return this.elements[this.current]!
  }

  peekNext() {
    if (this.current + 1 >= this.elements.length) return this.end
    return this.elements[this.current + 1]!
  }

  slice() {
    return this.elements.slice(this.start, this.current)
  }
}
