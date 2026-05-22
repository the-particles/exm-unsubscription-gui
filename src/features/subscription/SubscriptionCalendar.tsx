import { useContext } from 'react'
import { getSubscriptionColorClass } from '@pars/core/constants/subscription'
import { database } from '@pars/core/database'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  Calendar,
  CalendarDayButton,
} from '@pars/shared/components/ui/calendar'
import { isSubscriptionDueOnDate } from './SubscriptionCalendar.utils'
import SubscriptionContext from './SubscriptionContext'

const SubscriptionCalendar = () => {
  const { selectedDate, setSelectedDate } = useContext(SubscriptionContext)
  const subscriptions =
    useLiveQuery(() => database.subscriptions.toArray()) || []

  return (
    <div className="w-full flex justify-center">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        required
        weekStartsOn={1}
        numberOfMonths={1}
        captionLayout="dropdown"
        className="bg-transparent w-full max-w-sm pt-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
        classNames={{
          month_grid: 'w-full block',
          weeks: 'w-full block',
          week: 'mt-2 flex w-full justify-between',
          weekdays: 'flex justify-between w-full',
          weekday:
            'block w-(--cell-size) text-center text-[0.8rem] font-normal text-muted-foreground select-none',
          day: 'block w-(--cell-size) h-(--cell-size) p-0 relative aspect-square',
        }}
        formatters={{
          formatMonthDropdown: (date) => {
            return date.toLocaleString('default', { month: 'long' })
          },
          formatWeekdayName: (weekday) => {
            return weekday.toLocaleString('default', { weekday: 'short' })
          },
        }}
        components={{
          DayButton: ({ children, modifiers, day, ...props }) => {
            const dueSubscriptions = subscriptions.filter((sub) =>
              isSubscriptionDueOnDate(sub, day.date),
            )

            return (
              <CalendarDayButton
                day={day}
                modifiers={modifiers}
                {...props}
                className="p-0 flex flex-col items-center justify-center aspect-square"
              >
                <span className="text-sm font-semibold leading-none">
                  {children}
                </span>
                {!modifiers.outside && dueSubscriptions.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5 justify-center items-center">
                    {dueSubscriptions.slice(0, 4).map((sub) => (
                      <div
                        key={sub.id}
                        className={`size-1 ${getSubscriptionColorClass(
                          sub.id,
                        )} rounded-full shrink-0`}
                        title={sub.name}
                      />
                    ))}
                  </div>
                )}
              </CalendarDayButton>
            )
          },
        }}
      />
    </div>
  )
}

export default SubscriptionCalendar
