import { JArray, JObject, Json } from '../types/jobject.type'
import { toJsonString } from '../util/to-json-string'
import { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
  json: Json
}

const RenderPrimitive = (json: Json, key: string) => {
  return (
    <div className="card">
      <div className="card-body">
        {key && (
          <div className="card-title">
            <span>{key}</span>
          </div>
        )}
        <div className="card-text">
          <p>{toJsonString(json)}</p>
        </div>
      </div>
    </div>
  )
}

const RenderArray = (json: JArray, key: string) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={open ? faAngleDown : faAngleRight} />
          {key ? (
            <span className="ps-2">{key}</span>
          ) : (
            <span className="ps-2">Array ({json.value.length})</span>
          )}
        </div>
        <Collapse in={open}>
          <div className="card-text">
            {json.value.map((item, index) => (
              <div key={index}>{renderJson(item, '')}</div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  )
}

const RenderObject = (json: JObject, key: string) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={open ? faAngleDown : faAngleRight} />
          {key ? (
            <span className="ps-2">{key}</span>
          ) : (
            <span className="ps-2">
              Object ({Object.keys(json.value).length})
            </span>
          )}
        </div>
        <Collapse in={open}>
          <div className="card-text">
            {Object.entries(json.value).map(([key, value], index) => (
              <div key={index}>{renderJson(value, key)}</div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  )
}

const renderJson = (json: Json, key: string) => {
  switch (json.type) {
    case 'object':
      return RenderObject(json, key)
    case 'array':
      return RenderArray(json, key)
    default:
      return RenderPrimitive(json, key)
  }
}

const JsonGui = (props: Props) => {
  return renderJson(props.json, '')
}

export default JsonGui
