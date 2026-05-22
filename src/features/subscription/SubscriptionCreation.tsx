import { useState } from 'react'
import AnimatedPage from '@pars/core/components/AnimatedPage'
import { database } from '@pars/core/database'
import { haptic } from '@pars/core/utils/document'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
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

const SubscriptionCreation = () => {
  // Navigation
  const navigate = useNavigate()

  // States
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('VND')
  const [cycle, setCycle] = useState('monthly')
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })

  // Functions
  const _onCreate = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name.trim()) {
      toast.error('Please enter a subscription name.')
      return
    }

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount < 0) {
      toast.error('Please enter a valid amount.')
      return
    }

    const id = crypto.randomUUID()

    database.subscriptions.add({
      id,
      name: name.trim(),
      amount: numericAmount,
      currency,
      cycle,
      date,
    })

    toast.success(`Subscription "${name}" created!`)
    haptic()
    navigate(-1)
  }

  return (
    <AnimatedPage>
      <div className="relative flex flex-col gap-5 w-full max-w-md mx-auto">
        <div className="bg-card border border-border rounded-3xl p-6 shadow-xs">
          <h3 className="text-lg font-bold text-foreground mb-4">
            New Subscription
          </h3>

          <form className="w-full flex flex-col gap-5" onSubmit={_onCreate}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="sub-name">Name</FieldLabel>
                  <Input
                    id="sub-name"
                    placeholder="e.g., Spotify, Netflix"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="sub-amount">Amount</FieldLabel>
                    <Input
                      id="sub-amount"
                      type="number"
                      step="any"
                      min="0"
                      placeholder="e.g., 50000"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="sub-currency">Currency</FieldLabel>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="sub-currency" className="w-full">
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
                    <FieldLabel htmlFor="sub-cycle">Billing Cycle</FieldLabel>
                    <Select value={cycle} onValueChange={setCycle}>
                      <SelectTrigger id="sub-cycle" className="w-full">
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
                    <FieldLabel htmlFor="sub-date">
                      First Payment Date
                    </FieldLabel>
                    <Input
                      id="sub-date"
                      type="date"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
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
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default SubscriptionCreation
