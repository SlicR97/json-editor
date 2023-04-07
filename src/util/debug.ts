/* istanbul ignore file */
import { Json } from '../types/jobject.type'

export const defaultValue: Json = {
  type: 'array',
  value: [
    {
      type: 'number',
      value: '1',
    },
    {
      type: 'string',
      value: 'hello',
    },
    {
      type: 'boolean',
      value: true,
    },
    {
      type: 'boolean',
      value: false,
    },
    {
      type: 'null',
    },
    {
      type: 'array',
      value: [
        {
          type: 'number',
          value: '2',
        },
        {
          type: 'string',
          value: 'world',
        },
      ],
    },
  ],
}
