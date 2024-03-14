import './App.scss'

import SplitPane from './components/split-pane.component'
import Sidebar from './components/sidebar.component'
import Main from './components/main.component'
import { FileProvider } from './context/file.context'

function App() {
  const Left = (
    <>
      <div
        className="col-3 pe-1 d-flex flex-column w-100"
        style={{ height: '100vh' }}
      >
        <div className="ms-2 my-2 border flex-grow-1">
          <Sidebar />
        </div>
      </div>
    </>
  )

  const Right = (
    <>
      <div
        className="col-9 ps-1 d-flex flex-column w-100"
        style={{ height: '100vh' }}
      >
        <div className="me-2 my-2 flex-grow-1">
          <Main />
        </div>
      </div>
    </>
  )

  return (
    <FileProvider>
      <div className="row h-100">
        <SplitPane initialLeftWidth={300} left={Left} right={Right} />
      </div>
    </FileProvider>
  )
}

export default App
