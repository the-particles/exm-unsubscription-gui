import { useState } from 'react'
import {
  useHeaderAction,
  useHeaderDescription,
} from '@pars/core/contexts/header/useHeader'
import { database } from '@pars/core/database'
import { haptic } from '@pars/core/utils/document'
import SubscriptionCard from '@pars/features/subscription/SubscriptionCard'
import { useLiveQuery } from 'dexie-react-hooks'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SubscriptionCalendar from './SubscriptionCalendar'
import SubscriptionContext from './SubscriptionContext'

const CreationButton = () => {
  // Navigation
  const navigate = useNavigate()

  // Functions
  const _onClick = () => {
    haptic()
    navigate('/subscription/creation')
  }

  return <Plus onClick={_onClick} />
}

const Subscriptions = () => {
  // Contexts
  useHeaderDescription('The Subscriptions')
  useHeaderAction(CreationButton)

  // States
  const subscriptions = useLiveQuery(() => database.subscriptions.toArray())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const _subscriptionState = { selectedDate, setSelectedDate }

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
