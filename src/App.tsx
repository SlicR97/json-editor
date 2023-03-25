import './App.css'

import { Tab, Tabs } from 'react-bootstrap'
import JsonGui from './components/json-gui.component'
import JsonEditor from './components/json-editor.component'
import { useState } from 'react'
import { defaultValue } from './debug'

function App() {
  const [json, setJson] = useState(defaultValue)

  const onChange = (v: string | undefined) => {
    if (v) {
      setJson(v)
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
