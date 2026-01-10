import { type ReactNode, useState } from 'react'
import { DimensionContext } from './use-dimension'

interface DimensionProviderProps {
  children: ReactNode
}

const DimensionProvider = ({ children }: DimensionProviderProps) => {
  // States
  const [navigationBarHeight, setNavigationBarHeight] = useState<number>(0)

  return (
    <DimensionContext.Provider
      value={{ navigationBarHeight, setNavigationBarHeight }}
    >
      {children}
    </DimensionContext.Provider>
  )
}

export default DimensionProvider
