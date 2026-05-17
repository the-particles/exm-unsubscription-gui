import { useState } from 'react'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'
import NavigationContext from './NavigationContext'

const NavigationProvider = ({ children }: ProviderProps) => {
  // States
  const [current, setCurrent] = useState(
    () => window.location.pathname.split('/')[1] || 'dashboard',
  )
  const _value = {
    current,
    setCurrent,
  }

  return (
    <NavigationContext.Provider value={_value}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
