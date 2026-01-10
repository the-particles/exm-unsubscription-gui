import {
  insertSubscription,
  selectSubscriptions,
  truncateSubscriptions,
} from '@pars/database/subscription'
import type { Subscription } from '@pars/interfaces/subscription'
import { useMutation, useQuery } from '@tanstack/react-query'

export const SUBSCRIPTIONS_KEY = 'subscriptions'

export const useSubscriptions = () =>
  useQuery({
    queryKey: [SUBSCRIPTIONS_KEY],
    queryFn: selectSubscriptions,
  })

export const useSubscriptionCreation = (onSuccess = () => {}) =>
  useMutation({
    mutationFn: async (subscription: Omit<Subscription, 'id'>) =>
      await insertSubscription(subscription),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: [SUBSCRIPTIONS_KEY] })
      onSuccess()
    },
  })

export const useSubscriptionsDeletion = (onSuccess = () => {}) =>
  useMutation({
    mutationFn: truncateSubscriptions,
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: [SUBSCRIPTIONS_KEY] })
      onSuccess()
    },
  })
