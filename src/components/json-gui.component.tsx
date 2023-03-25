type Props = {
  json: string
}

const JsonGui = (props: Props) => {
  return (
    <div>
      <p>{props.json}</p>
    </div>
  )
}

export default JsonGui
