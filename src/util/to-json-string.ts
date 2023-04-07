import {
  JArray,
  JBoolean,
  JNumber,
  JObject,
  Json,
  JString,
} from '../types/jobject.type'

const printJsonNumber = (
  json: JNumber,
  indentation: number,
  indentValue: boolean,
): string => {
  if (indentValue) {
    return `${'\t'.repeat(indentation)}${json.value}`
  }

  return json.value
}

const printJsonBoolean = (
  json: JBoolean,
  indentation: number,
  indentValue: boolean,
): string => {
  if (indentValue) {
    return `${'\t'.repeat(indentation)}${json.value}`
  }

  return json.value ? 'true' : 'false'
}

const printJsonNull = (indentation: number, indentValue: boolean): string => {
  if (indentValue) {
    return `${'\t'.repeat(indentation)}null`
  }

  return 'null'
}

const printJsonString = (
  json: JString,
  indentation: number,
  indentValue: boolean,
): string => {
  if (indentValue) {
    return `${'\t'.repeat(indentation)}"${json.value}"`
  }

  return `"${json.value}"`
}

const printJsonArray = (
  json: JArray,
  indentation: number,
  indentFirstValue: boolean,
): string => {
  let str = ''
  if (indentFirstValue) {
    str += `${'\t'.repeat(indentation)}[`
  } else {
    str += '['
  }

  if (json.value.length === 0) {
    str += `]`
    return str
  } else {
    str += '\n'
  }

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

const printJsonObject = (
  json: JObject,
  indentation: number,
  indentFirstValue: boolean,
): string => {
  let str = ''
  if (indentFirstValue) {
    str += `${'\t'.repeat(indentation)}{\n`
  } else {
    str += '{\n'
  }

  Object.entries(json.value).forEach(([key, value], index) => {
    str += `${'\t'.repeat(indentation + 1)}"${key}": `
    str += toJsonString(value, indentation + 1, false)
    if (index < Object.entries(json.value).length - 1) {
      str += ','
    }
    str += '\n'
  })
  str += `${'\t'.repeat(indentation)}}`

  return str
}

export const toJsonString = (
  json: Json,
  indentation = 0,
  indentValue = true,
): string => {
  if (json.type === 'number') {
    return printJsonNumber(json, indentation, indentValue)
  }

  if (json.type === 'boolean') {
    return printJsonBoolean(json, indentation, indentValue)
  }

  if (json.type === 'null') {
    return printJsonNull(indentation, indentValue)
  }

  if (json.type === 'string') {
    return printJsonString(json, indentation, indentValue)
  }

  if (json.type === 'array') {
    return printJsonArray(json, indentation, indentValue)
  }

  if (json.type === 'object') {
    return printJsonObject(json, indentation, indentValue)
  }

  return ''
}
