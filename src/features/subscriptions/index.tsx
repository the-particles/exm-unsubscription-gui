import { useEffect, useState } from 'react'
import { useHeader } from '@pars/core/contexts/header/useHeader'
import { database } from '@pars/core/database'
import SubscriptionCard from '@pars/features/subscriptions/SubscriptionCard'
import { useLiveQuery } from 'dexie-react-hooks'
import SubscriptionCalendar from './SubscriptionCalendar'
import SubscriptionContext from './SubscriptionContext'
import SubscriptionCreation from './SubscriptionCreation'

const Subscriptions = () => {
  // Contexts
  const { setAction } = useHeader()

  // States
  const subscriptions = useLiveQuery(() => database.subscriptions.toArray())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const _subscriptionState = { selectedDate, setSelectedDate }

  // Effects
  useEffect(() => setAction(() => SubscriptionCreation), [setAction])

  // Functions

  return (
    <SubscriptionContext.Provider value={_subscriptionState}>
      <div className="w-full">
        <SubscriptionCalendar />

        <h1 className="font-semibold text-lg">Active Subscriptions</h1>
        <div className="flex flex-col gap-3 my-5">
          {subscriptions &&
            subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          {Array.from({ length: selectedDate.getDay() + 1 })
            .map((_, i) => i)
            .map((ordinal) => (
              <SubscriptionCard
                key={ordinal}
                subscription={{ id: ordinal, name: ordinal.toLocaleString() }}
              />
            ))}
        </div>
      </div>
    </SubscriptionContext.Provider>
  )
}

export default Subscriptions
