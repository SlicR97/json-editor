/* istanbul ignore file */
import { Json } from '../types/jobject.type'

// This is a placeholder for a complex JSON object, including nested objects, arrays, and all primitive types.
export const defaultValue: Json = {
  type: 'object',
  value: {
    string: {
      type: 'string',
      value: 'string',
      line: 2,
      column: 6,
    },
    number: {
      type: 'number',
      value: '123',
      line: 3,
      column: 6,
    },
    boolean: {
      type: 'boolean',
      value: true,
      line: 4,
      column: 6,
    },
    null: {
      type: 'null',
      line: 5,
      column: 6,
    },
    array: {
      type: 'array',
      value: [
        {
          type: 'string',
          value: 'string',
          line: 7,
          column: 10,
        },
        {
          type: 'number',
          value: '123',
          line: 8,
          column: 10,
        },
        {
          type: 'boolean',
          value: true,
          line: 9,
          column: 10,
        },
        {
          type: 'null',
          line: 10,
          column: 10,
        },
      ],
      line: 6,
      column: 6,
    },
    object: {
      type: 'object',
      value: {
        string: {
          type: 'string',
          value: 'string',
          line: 13,
          column: 10,
        },
        number: {
          type: 'number',
          value: '123',
          line: 14,
          column: 10,
        },
        boolean: {
          type: 'boolean',
          value: true,
          line: 15,
          column: 10,
        },
        null: {
          type: 'null',
          line: 16,
          column: 10,
        },
      },
      line: 12,
      column: 15,
    },
  },
  line: 1,
  column: 1,
}
