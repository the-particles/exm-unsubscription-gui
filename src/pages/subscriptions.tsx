import { useEffect } from 'react'
import { useHeader } from '@pars/providers/use-header'

const Subscriptions = () => {
  const { setAction } = useHeader()

  useEffect(() => setAction(null), [setAction])

  return (
    <>
      <div className="w-full">
        <h1 className="font-medium text-lg">Active Subscriptions</h1>
      </div>
    </>
  )
}

export default Subscriptions
