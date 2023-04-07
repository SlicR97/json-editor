/* istanbul ignore file */
import { Json } from '../types/jobject.type'

// This is a placeholder for a complex JSON object, including nested objects, arrays, and all primitive types.
export const defaultValue: Json = {
  type: 'object',
  value: {
    string: {
      type: 'string',
      value: 'string',
    },
    number: {
      type: 'number',
      value: '123',
    },
    boolean: {
      type: 'boolean',
      value: true,
    },
    null: {
      type: 'null',
    },
    array: {
      type: 'array',
      value: [
        {
          type: 'string',
          value: 'string',
        },
        {
          type: 'number',
          value: '123',
        },
        {
          type: 'boolean',
          value: true,
        },
        {
          type: 'null',
        },
      ],
    },
    object: {
      type: 'object',
      value: {
        string: {
          type: 'string',
          value: 'string',
        },
        number: {
          type: 'number',
          value: '123',
        },
        boolean: {
          type: 'boolean',
          value: true,
        },
        null: {
          type: 'null',
        },
      },
    },
  },
}
