import './App.css'

import SplitPane from './components/split-pane.component'
import Sidebar from './components/sidebar.component'
import Main from './components/main.component'

function App() {
  const Left = (
    <>
      <div
        className="col-3 pe-1 d-flex flex-column w-100"
        style={{ height: '100vh' }}
      >
        <div
          className="ms-2 my-2 border flex-grow-1"
          style={{ backgroundColor: '#2D2B55' }}
        >
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
        <div className="me-2 my-2 bg-dark border flex-grow-1">
          <Main />
        </div>
      </div>
    </>
  )

  return (
    <div className="row h-100 app">
      <SplitPane initialLeftWidth={300} left={Left} right={Right} />
    </div>
  )

  /*return (
    <div className="row h-100" style={{ backgroundColor: '#1e1e1e' }}>
      <SplitView 
        left={(
          <div className="col-3 pe-1 d-flex flex-column w-100" style={{ height: '100vh' }}>
            <div className="ms-2 my-2 bg-dark border flex-grow-1">
              <Sidebar />
            </div>
          </div>
        )}
        right={(
          <div className="col-9 ps-1 d-flex flex-column w-100" style={{ height: '100vh' }}>
            <div className="me-2 my-2 bg-dark border flex-grow-1">
              <Main />
            </div>
          </div>
        )}
      />
    </div>
  )*/
}

export default App
