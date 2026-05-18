import { type Dispatch, type SetStateAction, createContext } from 'react'

interface SubscriptionState {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
}

const INITIAL_STATE: SubscriptionState = {
  selectedDate: new Date(),
  setSelectedDate: () => {},
}
const SubscriptionContext = createContext<SubscriptionState>(INITIAL_STATE)

export default SubscriptionContext
