import { useEffect } from 'react'
import { database } from '@pars/database'
import SubscriptionCard from '@pars/pages/subscriptions/subscription-card'
import { addCategory, addProvider } from '@pars/services/subscription'
import { useLiveQuery } from 'dexie-react-hooks'
import { Button } from '@pars/shared/components/ui/button'
import { useHeader } from '@pars/hooks/use-header'
import SubscriptionCreation from './subscription-creation'

const Subscriptions = () => {
  // Contexts
  const { setAction } = useHeader()

  // States
  const subscriptions = useLiveQuery(() => database.subscriptions.toArray())
  const categories = useLiveQuery(() => database.categories.toArray())
  const providers = useLiveQuery(() => database.providers.toArray())

  // Effects
  useEffect(() => setAction(() => SubscriptionCreation), [setAction])

  // Functions
  const _onTruncate = () => database.subscriptions.clear()
  const _onAddCategory = () => addCategory({ name: 'Expense' })
  const _onAddProvider = () => addProvider({ name: 'Spotify' })

  return (
    <>
      <div className="w-full">
        <h1 className="font-semibold text-lg">Active Subscriptions</h1>
        <div className="flex flex-col gap-3 my-5">
          {subscriptions &&
            subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          {categories &&
            categories.map((category) => (
              <div key={category.id}>{category.name}</div>
            ))}
          {providers &&
            providers.map((provider) => (
              <div key={provider.id}>{provider.name}</div>
            ))}
        </div>
        <Button onClick={_onTruncate}>Truncate</Button>
        <Button onClick={_onAddCategory}>Add category</Button>
        <Button onClick={_onAddProvider}>Add provider</Button>
      </div>
    </>
  )
}

export default Subscriptions
