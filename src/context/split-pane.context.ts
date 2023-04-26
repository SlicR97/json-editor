import { createContext } from 'react'

type ContextProps = {
  onMouseHoldDown: (e: MouseEvent) => void
  clientWidth: number
  setClientWidth: (clientWidth: number) => void
}

const SplitPaneContext = createContext<ContextProps | undefined>(undefined)

export default SplitPaneContext
