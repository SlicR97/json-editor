import './App.css'

import { Tab, Tabs } from "react-bootstrap";
import JsonGui from "./components/json-gui.component";
import JsonEditor from "./components/json-editor.component";

function App() {
  return (
    <Tabs
      defaultActiveKey="editor"
    >
      <Tab title="GUI" eventKey="gui">
        <JsonGui />
      </Tab>
      <Tab title="Editor" eventKey="editor">
        <JsonEditor />
      </Tab>
    </Tabs>
  )
}

export default App
