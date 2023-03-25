import Editor from '@monaco-editor/react'
import { defaultValue } from '../debug'

const CodeEditor = () => {
  return (
    <Editor
      theme="vs-dark"
      height="100%"
      defaultLanguage="json"
      defaultValue={defaultValue}
    />
  )
}

export default CodeEditor
