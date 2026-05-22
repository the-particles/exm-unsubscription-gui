import { useState } from 'react'
import AnimatedPage from '@pars/core/components/AnimatedPage'
import { getSubscriptionColorClass } from '@pars/core/constants/subscription'
import { useHeaderDescription } from '@pars/core/contexts/header/useHeader'
import { database } from '@pars/core/database'
import { formatCurrency } from '@pars/core/utils/currency'
import { haptic } from '@pars/core/utils/document'
import { useLiveQuery } from 'dexie-react-hooks'
import { ArrowLeft, Edit, Trash2, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@pars/shared/components/ui/alert-dialog'
import { Button } from '@pars/shared/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@pars/shared/components/ui/field'
import { Input } from '@pars/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pars/shared/components/ui/select'

const SubscriptionDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Set description
  useHeaderDescription('Subscription details and settings')

  // Query subscription
  const subscription = useLiveQuery(
    () => (id ? database.subscriptions.get(id) : undefined),
    [id],
  )

  // Editing state
  const [isEditing, setIsEditing] = useState(false)

  if (subscription === undefined) {
    return (
      <div className="flex justify-center items-center h-48 text-sm text-foreground-muted">
        Loading subscription details...
      </div>
    )
  }

  if (subscription === null) {
    return (
      <AnimatedPage>
        <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto gap-4">
          <p className="text-sm text-foreground-muted">
            Subscription not found.
          </p>
          <Button onClick={() => navigate('/subscription')}>
            Back to Subscriptions
          </Button>
        </div>
      </AnimatedPage>
    )
  }

  const _onDelete = () => {
    if (id) {
      database.subscriptions.delete(id)
      toast.success(`Deleted subscription "${subscription.name}"`)
      haptic()
      navigate('/subscription')
    }
  }

  const formattedDate = subscription.date
    ? new Date(subscription.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not set'

  return (
    <AnimatedPage>
      <div className="w-full max-w-md mx-auto flex flex-col gap-4">
        {/* Navigation back */}
        <button
          onClick={() => navigate('/subscription')}
          className="flex items-center gap-2 text-xs font-semibold text-foreground-muted hover:text-foreground self-start transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Subscriptions
        </button>

        {isEditing ? (
          <SubscriptionEditForm
            subscription={subscription}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="bg-card border border-border rounded-3xl p-6 shadow-xs flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`size-12 rounded-full shrink-0 flex items-center justify-center font-bold text-white text-lg ${getSubscriptionColorClass(
                  subscription.id,
                )}`}
              >
                {subscription.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-foreground">
                  {subscription.name}
                </h2>
                <span className="text-xs text-foreground-muted capitalize">
                  {subscription.cycle} cycle
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 border-y border-border">
              <div className="flex flex-col gap-0.5">
                <span className="text-xxs text-foreground-muted uppercase font-bold tracking-wider">
                  Amount
                </span>
                <span className="text-lg font-extrabold text-foreground">
                  {subscription.amount !== undefined && subscription.currency
                    ? formatCurrency(subscription.amount, subscription.currency)
                    : '—'}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xxs text-foreground-muted uppercase font-bold tracking-wider">
                  Next Due Date
                </span>
                <span className="text-sm font-semibold text-foreground mt-1">
                  {formattedDate}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="flex-1 flex gap-2 items-center justify-center"
              >
                <Edit size={16} /> Edit
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex-1 flex gap-2 items-center justify-center"
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Subscription</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete your subscription to{' '}
                      <strong>{subscription.name}</strong>? This action cannot
                      be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={_onDelete}
                      className="bg-destructive hover:bg-destructive/90 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}

interface SubscriptionEditFormProps {
  subscription: {
    id: string
    name: string
    amount?: number
    currency?: string
    cycle?: string
    date?: string
  }
  onCancel: () => void
}

const SubscriptionEditForm = ({
  subscription,
  onCancel,
}: SubscriptionEditFormProps) => {
  const [name, setName] = useState(subscription.name || '')
  const [amount, setAmount] = useState(
    subscription.amount !== undefined ? subscription.amount.toString() : '',
  )
  const [currency, setCurrency] = useState(subscription.currency || 'VND')
  const [cycle, setCycle] = useState(subscription.cycle || 'monthly')
  const [date, setDate] = useState(subscription.date || '')

  const _onSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Please enter a subscription name.')
      return
    }

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount < 0) {
      toast.error('Please enter a valid amount.')
      return
    }

    database.subscriptions.update(subscription.id, {
      name: name.trim(),
      amount: numericAmount,
      currency,
      cycle,
      date,
    })
    toast.success('Subscription updated successfully!')
    haptic()
    onCancel()
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6 shadow-xs">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-foreground">Edit Subscription</h3>
        <button
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-muted/80 text-foreground-muted cursor-pointer transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={_onSave} className="flex flex-col gap-5">
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="edit-name">Name</FieldLabel>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="edit-amount">Amount</FieldLabel>
                <Input
                  id="edit-amount"
                  type="number"
                  step="any"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="edit-currency">Currency</FieldLabel>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="edit-currency" className="w-full">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="VND">VND (₫)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="edit-cycle">Billing Cycle</FieldLabel>
                <Select value={cycle} onValueChange={setCycle}>
                  <SelectTrigger id="edit-cycle" className="w-full">
                    <SelectValue placeholder="Cycle" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="edit-date">Payment Date</FieldLabel>
                <Input
                  id="edit-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Field>
            </div>
          </FieldSet>
        </FieldGroup>

        <div className="flex gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SubscriptionDetails
