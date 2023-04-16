import './App.css'

import { Tab, Tabs } from 'react-bootstrap'
import JsonGui from './components/json-gui.component'
import JsonEditor from './components/json-editor.component'
import { useState } from 'react'
import { parseJson } from './parser/parse-json'
import { Json } from './types/jobject.type'
import { defaultValue } from './util/debug'
import { scanJson } from './scanner/scan-json'
import { Result } from './types/result.type'

function App() {
  const [json, setJson] = useState<Json>(defaultValue)

  const onChange = (v: string | undefined) => {
    if (v) {
      const tokenResult = scanJson(v)
      const jsonResult = Result.bind(tokenResult, parseJson)
      if (jsonResult.isSuccess) {
        setJson(jsonResult.value)
      }
    }
  }

  return (
    <Tabs defaultActiveKey="editor">
      <Tab title="GUI" eventKey="gui">
        <JsonGui json={json} />
      </Tab>
      <Tab title="Editor" eventKey="editor">
        <JsonEditor onChange={onChange} json={json} />
      </Tab>
    </Tabs>
  )
}

export default App
