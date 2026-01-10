import { useEffect } from 'react'
import SubscriptionCard from '@pars/pages/subscriptions/subscription-card'
import {
  useSubscriptions,
  useSubscriptionsDeletion,
} from '@pars/states/subscriptions'
import { Button } from '@pars/shared/components/ui/button'
import { useHeader } from '@pars/providers/use-header'
import SubscriptionCreation from './subscription-creation'

const Subscriptions = () => {
  // Contexts
  const { setAction } = useHeader()

  // States
  const subscriptions = useSubscriptions()

  // Mutations
  const subscriptionsDeletion = useSubscriptionsDeletion()

  // Effects
  useEffect(() => setAction(() => SubscriptionCreation), [setAction])

  // Functions
  const _onTruncate = () => subscriptionsDeletion.mutate()

  return (
    <>
      <div className="w-full">
        <h1 className="font-semibold text-lg">Active Subscriptions</h1>
        <div className="flex flex-col gap-3 my-5">
          {subscriptions.data &&
            subscriptions.data.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))}
        </div>
        <Button onClick={_onTruncate}>Truncate</Button>
      </div>
    </>
  )
}

export default Subscriptions
