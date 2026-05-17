import { useState } from 'react'
import DimensionContext from '@pars/core/contexts/DimensionContext'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'

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
