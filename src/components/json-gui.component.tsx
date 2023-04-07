import { JArray, Json } from '../types/jobject.type'
import { toJsonString } from '../util/to-json-string'
import { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
  json: Json
}

const RenderPrimitive = (json: Json) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-text">
          <p>{toJsonString(json)}</p>
        </div>
      </div>
    </div>
  )
}

const RenderArray = (json: JArray) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={open ? faAngleDown : faAngleRight} />
          <span className="ps-2">Array ({json.value.length})</span>
        </div>
        <Collapse in={open}>
          <div className="card-text">
            {json.value.map((item, index) => (
              <div key={index}>{renderJson(item)}</div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  )
}

const renderJson = (json: Json) => {
  switch (json.type) {
    case 'array':
      return RenderArray(json)
    default:
      return RenderPrimitive(json)
  }
}

const JsonGui = (props: Props) => {
  return renderJson(props.json)
}

export default JsonGui
