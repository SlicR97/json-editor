import './split-pane.component.scss'

import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import SplitPaneContext from '../context/split-pane.context'

type Props = {
  initialLeftWidth: number
  left: JSX.Element | JSX.Element[]
  right: JSX.Element | JSX.Element[]
}

const Divider = () => {
  const { onMouseHoldDown } = useContext(SplitPaneContext)!

  return <div className="separator-col" onMouseDown={onMouseHoldDown as any} />
}

const SplitPaneLeft = (props: React.PropsWithChildren) => {
  const topRef = createRef<HTMLDivElement>()
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext)!

  useEffect(() => {
    if (topRef.current) {
      if (!clientWidth) {
        setClientWidth(topRef.current.clientWidth / 2)
        return
      }

      topRef.current.style.minWidth = clientWidth + 'px'
      topRef.current.style.maxWidth = clientWidth + 'px'
    }
  }, [clientWidth])

  return (
    <div className="split-pane-left" ref={topRef}>
      {props.children}
    </div>
  )
}

const SplitPaneRight = (props: React.PropsWithChildren) => {
  return <div className="split-pane-right">{props.children}</div>
}

const SplitPane = (props: Props) => {
  const [clientWidth, setClientWidth] = useState<number>(props.initialLeftWidth)
  const xDividerPos = useRef<number | null>(null)

  const onMouseHoldDown = (e: MouseEvent) => {
    xDividerPos.current = e.clientX
  }

  const onMouseHoldUp = () => {
    xDividerPos.current = null
  }

  const onMouseHoldMove = (e: MouseEvent) => {
    if (!xDividerPos.current) {
      return
    }

    setClientWidth(clientWidth! + e.clientX - xDividerPos.current!)

    xDividerPos.current = e.clientX
  }

  useEffect(() => {
    document.addEventListener('mouseup', onMouseHoldUp)
    document.addEventListener('mousemove', onMouseHoldMove)

    return () => {
      document.removeEventListener('mouseup', onMouseHoldUp)
      document.removeEventListener('mousemove', onMouseHoldMove)
    }
  })

  return (
    <div className="split-pane-row">
      <SplitPaneContext.Provider
        value={{
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}
      >
        <SplitPaneLeft>{props.left}</SplitPaneLeft>
        <Divider />
        <SplitPaneRight>{props.right}</SplitPaneRight>
      </SplitPaneContext.Provider>
    </div>
  )
}

export default SplitPane
