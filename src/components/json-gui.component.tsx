import { Json } from '../types/jobject.type'
import { toJsonString } from '../util/to-json-string'

type Props = {
  json: Json
}

const JsonGui = (props: Props) => {
  return (
    <div>
      <p>{toJsonString(props.json)}</p>
    </div>
  )
}

export default JsonGui
