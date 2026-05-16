import { useEffect, useState } from 'react'
import { database } from '@pars/database'
import SubscriptionCard from '@pars/pages/subscriptions/subscription-card'
import { addCategory, addProvider } from '@pars/services/subscription'
import { addDays } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import type { DateRange } from 'react-day-picker'
import { Button } from '@pars/shared/components/ui/button'
import {
  Calendar,
  CalendarDayButton,
} from '@pars/shared/components/ui/calendar'
import { useHeader } from '@pars/hooks/use-header'
import SubscriptionCreation from './subscription-creation'

const Subscriptions = () => {
  // Contexts
  const { setAction } = useHeader()

  // States
  const subscriptions = useLiveQuery(() => database.subscriptions.toArray())
  const categories = useLiveQuery(() => database.categories.toArray())
  const providers = useLiveQuery(() => database.providers.toArray())
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  })

  // Effects
  useEffect(() => setAction(() => SubscriptionCreation), [setAction])

  // Functions
  const _onTruncate = () => database.subscriptions.clear()
  const _onAddCategory = () => addCategory({ name: 'Expense' })
  const _onAddProvider = () => addProvider({ name: 'Spotify' })

  return (
    <div className="w-full">
      <div className="w-full">
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="bg-transparent [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString('default', { month: 'long' })
            },
          }}
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const isWeekend =
                day.date.getDay() === 0 || day.date.getDay() === 6
              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && isWeekend && (
                    <div className="size-1 rounded-full bg-red-500"></div>
                  )}
                </CalendarDayButton>
              )
            },
          }}
        />
      </div>
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
      <div className="flex gap-2">
        <Button onClick={_onTruncate}>Truncate</Button>
        <Button onClick={_onAddCategory}>Add category</Button>
        <Button onClick={_onAddProvider}>Add provider</Button>
      </div>
    </div>
  )
}

export default Subscriptions
