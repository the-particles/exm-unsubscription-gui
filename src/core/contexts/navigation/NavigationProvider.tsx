import { useState } from 'react'
import NavigationContext from '@pars/core/contexts/NavigationContext'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'

const NavigationProvider = ({ children }: ProviderProps) => {
  // States
  const [current, setCurrent] = useState(
    () => window.location.pathname.split('/')[1] || 'dashboard',
  )
  const [description, setDescription] = useState('')

  const _value = {
    current,
    setCurrent,
    description,
    setDescription,
  }

  return (
    <NavigationContext.Provider value={_value}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
