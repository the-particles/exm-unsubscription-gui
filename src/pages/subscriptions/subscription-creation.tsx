import { useState } from 'react'
import { useSubscriptionCreation } from '@pars/states/subscriptions'
import { Plus } from 'lucide-react'
import { Button } from '@pars/shared/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
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

const SubscriptionCreation = () => {
  // States
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  // Mutations
  const subscriptionCreation = useSubscriptionCreation()

  // Functions
  const _reset = () => {
    setName('')
  }
  const _onCreate = () => {
    subscriptionCreation.mutate({ name })
    _reset()
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon-lg" variant="ghost">
          <Plus className="size-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Track new subscription</DrawerTitle>
          <DrawerDescription>
            Add new subscription to start tracking now
          </DrawerDescription>
        </DrawerHeader>

        <form className="w-full px-5 my-5">
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Name
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
          <Button onClick={_onCreate}>Add</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default SubscriptionCreation
