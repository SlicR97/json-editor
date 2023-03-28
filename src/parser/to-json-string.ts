import { Json } from '../types/jobject.type'

export const toJsonString = (json: Json): string => {
  if (json.type === 'number') {
    return `${json.value}`
  }

  if (json.type === 'boolean') {
    return `${json.value}`
  }

  return ''
}
