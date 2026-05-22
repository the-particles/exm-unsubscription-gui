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
import { isSubscriptionDueOnDate } from './SubscriptionCalendar.utils'
import SubscriptionContext from './SubscriptionContext'

const CreationButton = () => {
  // Navigation
  const navigate = useNavigate()

  // Functions
  const _onClick = () => {
    haptic()
    navigate('/subscription/creation')
  }

  return (
    <Plus
      onClick={_onClick}
      className="cursor-pointer text-foreground hover:opacity-80 transition-opacity"
      size={24}
    />
  )
}

const Subscriptions = () => {
  // Contexts
  useHeaderDescription('Track and manage your active subscriptions')
  useHeaderAction(CreationButton)

  // States
  const subscriptions =
    useLiveQuery(() => database.subscriptions.toArray()) || []
  const [selectedDate, setSelectedDate] = useState(new Date())
  const _subscriptionState = { selectedDate, setSelectedDate }

  // Filter subscriptions due on the selected date
  const dueSubscriptions = subscriptions.filter((sub) =>
    isSubscriptionDueOnDate(sub, selectedDate),
  )

  const formattedSelectedDate = selectedDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <SubscriptionContext.Provider value={_subscriptionState}>
      <div className="w-full flex flex-col gap-6 max-w-md mx-auto">
        <div className="bg-card border border-border rounded-3xl p-4 shadow-xs">
          <SubscriptionCalendar />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-base text-foreground flex items-center justify-between">
            <span>Due on {formattedSelectedDate}</span>
            <span className="text-xxs px-2.5 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground font-semibold rounded-full">
              {dueSubscriptions.length}
            </span>
          </h2>
          <div className="flex flex-col gap-2.5">
            {dueSubscriptions.length > 0 ? (
              dueSubscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                />
              ))
            ) : (
              <div className="text-center py-6 border border-dashed border-border bg-card/40 rounded-2xl text-xs text-foreground-muted">
                No payments due on this date.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <h2 className="font-bold text-base text-foreground flex items-center justify-between">
            <span>All Subscriptions</span>
            <span className="text-xxs px-2.5 py-1 bg-muted text-muted-foreground font-semibold rounded-full">
              {subscriptions.length}
            </span>
          </h2>
          <div className="flex flex-col gap-2.5">
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                />
              ))
            ) : (
              <div className="text-center py-10 border border-dashed border-border bg-card/40 rounded-2xl flex flex-col gap-2 items-center justify-center">
                <span className="text-xs text-foreground-muted">
                  No subscriptions tracked yet.
                </span>
                <button
                  onClick={() => {
                    haptic()
                    window.location.hash = '#/subscription/creation'
                    // Using react-router navigate instead if click is triggered
                  }}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SubscriptionContext.Provider>
  )
}

export default Subscriptions
