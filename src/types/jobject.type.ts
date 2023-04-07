/* istanbul ignore file */

export type JNull = {
  type: 'null'
}

export type JBoolean = {
  type: 'boolean'
  value: boolean
}

export type JNumber = {
  type: 'number'
  value: string
}

export type JString = {
  type: 'string'
  value: string
}

export type JArray = {
  type: 'array'
  value: Element[]
}

export type JObject = {
  type: 'object'
  value: {
    [key: string]: Element
  }
}

export type Element = JObject | JArray | JString | JNumber | JBoolean | JNull

export type Json = Element
