import type { Subscription } from '@pars/interfaces/subscription'
import './subscription-card.css'

interface SubscriptionCardProps {
  subscription: Subscription
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <div className="subscription-card border border-subscription-card-border rounded-xl p-5 flex flex-col gap-2">
      <p className="font-medium mb-1">{subscription.name}</p>
      <span className="font-bold text-xl text-rose-300">$2.00</span>
      <div className="text-xs text-slate-400 flex gap-2">
        <span>0.00% APR</span>
        <span>$10.00/mo min</span>
      </div>
    </div>
  )
}

export default SubscriptionCard
