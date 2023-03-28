import { toJsonString } from './to-json-string'
import { JBoolean, JNull, JNumber } from '../types/jobject.type'

describe('toJsonString', () => {
  it('returns a string when the json is a number', () => {
    const json: JNumber = {
      type: 'number',
      value: '123',
    }
    expect(toJsonString(json)).toEqual('123')
  })

  it("returns 'true' when the json is true", () => {
    const json: JBoolean = {
      type: 'boolean',
      value: true,
    }
    expect(toJsonString(json)).toEqual('true')
  })

  it("returns 'false' when the json is false", () => {
    const json: JBoolean = {
      type: 'boolean',
      value: false,
    }
    expect(toJsonString(json)).toEqual('false')
  })

  it('returns an empty string when the json is null', () => {
    const json: JNull = {
      type: 'null',
    }
    expect(toJsonString(json)).toEqual('')
  })
})
