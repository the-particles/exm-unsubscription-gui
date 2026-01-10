import type { Subscription } from '@pars/interfaces/subscription'
import { SUBSCRIPTION_NAME } from './configuration'
import { openDatabase } from './database'

export const insertSubscription = async (
  subscription: Omit<Subscription, 'id'>,
): Promise<void> => {
  const database = await openDatabase()

  const transaction = database.transaction(SUBSCRIPTION_NAME, 'readwrite')
  await transaction.store.add(subscription)
  await transaction.done
}

export const selectSubscriptions = async (): Promise<Subscription[]> => {
  const database = await openDatabase()

  return database.getAll(SUBSCRIPTION_NAME)
}

export const truncateSubscriptions = async (): Promise<void> => {
  const database = await openDatabase()

  return database.clear(SUBSCRIPTION_NAME)
}
