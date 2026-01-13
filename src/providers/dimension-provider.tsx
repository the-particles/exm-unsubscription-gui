import { useState } from 'react'
import DimensionContext from '@pars/contexts/dimension-context'
import type { ProviderProps } from '@pars/interfaces/context-provider'

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
