import { CHIP_COLORS } from '@pars/core/constants/subscription'
import type { Subscription } from '@pars/core/database'

interface SubscriptionCardProps {
  subscription: Subscription
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <div className="border bg-subscription-card-background rounded-2xl p-5 flex items-center gap-2">
      <div className={`size-2 ${CHIP_COLORS[subscription.id]} rounded-full`} />
      <p className="font-medium text-subscription-card-foreground">
        {subscription.name}
      </p>
    </div>
  )
}

export default SubscriptionCard
