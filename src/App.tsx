import './App.css'

import Sidebar from './components/sidebar.component'
import Main from './components/main.component'

function App() {
  return (
    <div className="row h-100" style={{ backgroundColor: '#1e1e1e' }}>
      <div className="col-2 pe-1 d-flex flex-column">
        <div className="ms-2 my-2 bg-dark border flex-grow-1">
          <Sidebar />
        </div>
      </div>
      <div className="col-10 ps-1 d-flex flex-column">
        <div className="me-2 my-2 bg-dark border flex-grow-1">
          <Main />
        </div>
      </div>
    </div>
  )
}

export default App
