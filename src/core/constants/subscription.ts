export const CHIP_COLORS = [
  'bg-cyan-600 dark:bg-cyan-500',
  'bg-amber-600 dark:bg-amber-500',
  'bg-slate-600 dark:bg-slate-500',
  'bg-teal-600 dark:bg-teal-500',
  'bg-green-600 dark:bg-green-500',
  'bg-yellow-600 dark:bg-yellow-500',
  'bg-purple-600 dark:bg-purple-500',
]

export const getSubscriptionColorClass = (id: string | number) => {
  if (typeof id === 'number') {
    return CHIP_COLORS[id % CHIP_COLORS.length]
  }
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % CHIP_COLORS.length
  return CHIP_COLORS[index]
}
