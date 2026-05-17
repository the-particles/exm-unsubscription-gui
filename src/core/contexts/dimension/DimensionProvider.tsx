import { useState } from 'react'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'
import DimensionContext from './DimensionContext'

const DimensionProvider = ({ children }: ProviderProps) => {
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
