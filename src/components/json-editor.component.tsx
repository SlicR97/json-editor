import Editor from '@monaco-editor/react'

type Props = {
  json: string
  onChange: (json: string | undefined) => void
}

const JsonEditor = (props: Props) => {
  return (
    <Editor
      theme="vs-dark"
      height="100%"
      defaultLanguage="json"
      defaultValue={props.json}
      onChange={(v) => props.onChange(v)}
    />
  )
}

export default JsonEditor
