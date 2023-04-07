import { JArray, JBoolean, JNumber, Json, JString } from '../types/jobject.type'

const printJsonNumber = (json: JNumber, indentation: number): string => {
  return `${'\t'.repeat(indentation)}${json.value}`
}

const printJsonBoolean = (json: JBoolean, indentation: number): string => {
  return `${'\t'.repeat(indentation)}${json.value}`
}

const printJsonNull = (indentation: number): string => {
  return `${'\t'.repeat(indentation)}null`
}

const printJsonString = (json: JString, indentation: number): string => {
  return `${'\t'.repeat(indentation)}"${json.value}"`
}

const printJsonArray = (json: JArray, indentation: number): string => {
  let str = `${'\t'.repeat(indentation)}[\n`

  json.value.forEach((item, index) => {
    str += toJsonString(item, indentation + 1)
    if (index < json.value.length - 1) {
      str += ','
    }
    str += '\n'
  })
  str += `${'\t'.repeat(indentation)}]`

  return str
}

export const toJsonString = (json: Json, indentation = 0): string => {
  if (json.type === 'number') {
    return printJsonNumber(json, indentation)
  }

  if (json.type === 'boolean') {
    return printJsonBoolean(json, indentation)
  }

  if (json.type === 'null') {
    return printJsonNull(indentation)
  }

  if (json.type === 'string') {
    return printJsonString(json, indentation)
  }

  if (json.type === 'array') {
    return printJsonArray(json, indentation)
  }

  return ''
}
