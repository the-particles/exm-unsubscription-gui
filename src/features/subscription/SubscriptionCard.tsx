import { getSubscriptionColorClass } from '@pars/core/constants/subscription'
import type { Subscription } from '@pars/core/database'
import { formatCurrency } from '@pars/core/utils/currency'
import { haptic } from '@pars/core/utils/document'
import { useNavigate } from 'react-router-dom'

interface SubscriptionCardProps {
  subscription: Subscription
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  const navigate = useNavigate()

  const _onClick = () => {
    haptic()
    navigate(`/subscription/${subscription.id}`)
  }

  return (
    <div
      onClick={_onClick}
      className="border border-border bg-subscription-card-background rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/10 transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div
          className={`size-3 ${getSubscriptionColorClass(
            subscription.id,
          )} rounded-full shrink-0`}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-subscription-card-foreground text-sm">
            {subscription.name}
          </p>
          {subscription.cycle && (
            <p className="text-xxs text-subscription-card-foreground-muted capitalize mt-0.5">
              {subscription.cycle}
            </p>
          )}
        </div>
      </div>

      {subscription.amount !== undefined && subscription.currency && (
        <p className="font-bold text-subscription-card-foreground text-sm">
          {formatCurrency(subscription.amount, subscription.currency)}
        </p>
      )}
    </div>
  )
}

export default SubscriptionCard
