import { useState } from 'react'
import NavigationContext from '@pars/contexts/navigation-context'
import type { ProviderProps } from '@pars/interfaces/context-provider'

const NavigationProvider = ({ children }: ProviderProps) => {
  // States
  const [current, setCurrent] = useState(
    () => window.location.pathname.split('/')[1] || 'dashboard',
  )

  return (
    <NavigationContext.Provider value={{ current, setCurrent }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
