import { type ComponentType, useContext, useEffect } from 'react'
import HeaderContext from './HeaderContext'

export const useHeader = () => {
  const context = useContext(HeaderContext)

  if (context === undefined)
    throw new Error(
      `${useHeader.name} must be used within a its corresponding context`,
    )

  return context
}

export const useHeaderDescription = (description: string) => {
  const { setDescription } = useHeader()

  useEffect(() => {
    setDescription(description)
  }, [description, setDescription])
}

export const useHeaderAction = (Action: ComponentType | null) => {
  const { setAction } = useHeader()

  useEffect(
    () =>
      //! Must not use `setAction(Action)` because `Action` is actually an function and `setAction` will immediately execute `Action` function and return raw JSW
      //! Must wrap the Component inside an anonymous function `() => Action`
      setAction(() => Action),
    [Action, setAction],
  )
}
