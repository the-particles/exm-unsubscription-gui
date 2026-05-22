import { type Subscription } from '@pars/core/database'

export const isSubscriptionDueOnDate = (
  subscription: Subscription,
  targetDate: Date,
): boolean => {
  if (!subscription.date) return false

  const subDate = new Date(subscription.date)
  if (isNaN(subDate.getTime())) return false

  const cycle = (subscription.cycle || '').toLowerCase()

  if (cycle === 'weekly') {
    return subDate.getDay() === targetDate.getDay()
  }

  if (cycle === 'monthly') {
    return subDate.getDate() === targetDate.getDate()
  }

  if (cycle === 'quarterly') {
    const monthsDiff =
      (targetDate.getFullYear() - subDate.getFullYear()) * 12 +
      (targetDate.getMonth() - subDate.getMonth())
    return (
      subDate.getDate() === targetDate.getDate() &&
      monthsDiff >= 0 &&
      monthsDiff % 3 === 0
    )
  }

  if (cycle === 'annual') {
    return (
      subDate.getDate() === targetDate.getDate() &&
      subDate.getMonth() === targetDate.getMonth()
    )
  }

  // One-time or default: exact date match
  return (
    subDate.getFullYear() === targetDate.getFullYear() &&
    subDate.getMonth() === targetDate.getMonth() &&
    subDate.getDate() === targetDate.getDate()
  )
}
