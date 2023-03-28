import { toJsonString } from './to-json-string'
import { JNull, JNumber } from '../types/jobject.type'

describe('toJsonString', () => {
  it('returns a string when the json is a number', () => {
    const json: JNumber = {
      type: 'number',
      value: '123',
    }
    expect(toJsonString(json)).toEqual('123')
  })

  it('returns an empty string when the json is null', () => {
    const json: JNull = {
      type: 'null',
    }
    expect(toJsonString(json)).toEqual('')
  })
})
