import Theme from '../resources/sop.json'

import Editor, { OnMount } from '@monaco-editor/react'
import { Json } from '../types/jobject.type'
import { toJsonString } from '../util/to-json-string'

type Props = {
  json: Json
  onChange: (json: string | undefined) => void
}

const JsonEditor = (props: Props) => {
  const handleEditorDidMount: OnMount = (_, monaco) => {
    monaco.editor.defineTheme('my-dark', Theme)
    monaco.editor.setTheme('my-dark')
  }

  const jsonString = toJsonString(props.json)

  return (
    <Editor
      theme="vs-dark"
      height="100%"
      defaultLanguage="json"
      defaultValue={jsonString}
      onChange={props.onChange}
      onMount={handleEditorDidMount}
    />
  )
}

export default JsonEditor
