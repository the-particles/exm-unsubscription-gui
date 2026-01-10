import { useCallback, useEffect, useState } from 'react'
import type { Subscription } from '@pars/interfaces/subscription'
import { Button } from '@pars/shared/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@pars/shared/components/ui/drawer'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@pars/shared/components/ui/field'
import { Input } from '@pars/shared/components/ui/input'
import { useHeader } from '@pars/providers/use-header'
import SubscriptionCard from '@pars/components/subscription-card'
import {
  insertSubscription,
  selectSubscriptions,
  truncateSubscriptions,
} from '../database/subscription'

interface SubscriptionCreationProps {
  onCreate: (subscription: Omit<Subscription, 'id'>) => void
}
const SubscriptionCreation = ({ onCreate }: SubscriptionCreationProps) => {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')

  const _onCreate = () => {
    onCreate({ name: name })
    setOpen(false)
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Track new subscription</DrawerTitle>
        </DrawerHeader>

        <form className="w-full">
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Name on Card
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </Field>
            </FieldSet>
          </FieldGroup>
        </form>

        <DrawerFooter>
          <Button onClick={_onCreate}>Track</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const Subscriptions = () => {
  // Contexts
  const { setAction } = useHeader()

  // States
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  // Database functions
  const _selectAll = async () => setSubscriptions(await selectSubscriptions())
  const _add = useCallback(async (subscription: Omit<Subscription, 'id'>) => {
    await insertSubscription(subscription)
    await _selectAll()
  }, [])
  const _truncate = async () => {
    await truncateSubscriptions()
    await _selectAll()
  }

  // Effects
  useEffect(
    () => setAction(<SubscriptionCreation onCreate={_add} />),
    [_add, setAction],
  )
  useEffect(
    () =>
      (() => {
        _selectAll()
      })(),
    [],
  )

  return (
    <>
      <div className="w-full">
        <h1 className="font-medium text-lg">Active Subscriptions</h1>
        <div className="flex flex-col gap-3 my-5">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>
        <Button onClick={_truncate}>Truncate</Button>
      </div>
    </>
  )
}

export default Subscriptions
