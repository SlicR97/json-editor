/* istanbul ignore file */

type JMeta = {
  line: number
  column: number
}

export type JNull = JMeta & {
  type: 'null'
}

export type JBoolean = JMeta & {
  type: 'boolean'
  value: boolean
}

export type JNumber = JMeta & {
  type: 'number'
  value: string
}

export type JString = JMeta & {
  type: 'string'
  value: string
}

export type JArray = JMeta & {
  type: 'array'
  value: Element[]
}

export type JObject = JMeta & {
  type: 'object'
  value: {
    [key: string]: Element
  }
}

export type Element = JObject | JArray | JString | JNumber | JBoolean | JNull

export type Json = Element
