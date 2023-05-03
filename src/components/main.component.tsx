import './main.component.scss'

import JsonGui from './json-gui.component'
import JsonEditor from './json-editor.component'
import { useState } from 'react'
import { Json } from '../types/jobject.type'
import { defaultValue } from '../util/debug'
import { scanJson } from '../scanner/scan-json'
import { Result } from '../types/result.type'
import { parseJson } from '../parser/parse-json'
import { Tab, Tabs } from 'react-bootstrap'

const Main = () => {
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
    <Tabs defaultActiveKey="editor" className="d-flex border-1" justify={true}>
      <Tab title="GUI" eventKey="gui" className="overflow-scroll">
        <JsonGui json={json} />
      </Tab>
      <Tab title="Editor" eventKey="editor">
        <JsonEditor onChange={onChange} json={json} />
      </Tab>
    </Tabs>
  )
}

export default Main
