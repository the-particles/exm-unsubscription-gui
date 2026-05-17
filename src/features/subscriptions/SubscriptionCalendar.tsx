import { useContext } from 'react'
import { CHIP_COLORS } from '@pars/core/constants/subscription'
import {
  Calendar,
  CalendarDayButton,
} from '@pars/shared/components/ui/calendar'
import SubscriptionContext from './SubscriptionContext'

const SubscriptionCalendar = () => {
  const { selectedDate, setSelectedDate } = useContext(SubscriptionContext)

  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        required
        weekStartsOn={1}
        numberOfMonths={1}
        captionLayout="dropdown"
        className="bg-transparent w-full pt-0 [--cell-size:--spacing(12)] md:[--cell-size:--spacing(12)]"
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
            return (
              <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                {children}
                {!modifiers.outside && (
                  <div className="grid grid-cols-4 gap-0.5">
                    {Array.from({ length: day.date.getDay() + 1 })
                      .map((_, i) => i)
                      .map((ordinal) => (
                        <div
                          key={ordinal}
                          className={`size-1 ${CHIP_COLORS[ordinal]} rounded-full`}
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
