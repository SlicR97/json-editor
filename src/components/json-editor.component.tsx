import Editor from '@monaco-editor/react'
import { Json } from '../types/jobject.type'
import { toJsonString } from '../util/to-json-string'

type Props = {
  json: Json
  onChange: (json: string | undefined) => void
}

const JsonEditor = (props: Props) => {
  const jsonString = toJsonString(props.json)

  return (
    <Editor
      theme="vs-dark"
      height="100%"
      defaultLanguage="json"
      defaultValue={jsonString}
      onChange={(v) => props.onChange(v)}
    />
  )
}

export default JsonEditor
