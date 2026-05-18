import { useState } from 'react'
import AnimatedPage from '@pars/core/components/AnimatedPage'
import { database } from '@pars/core/database'
import { useNavigate } from 'react-router-dom'
import { Button } from '@pars/shared/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@pars/shared/components/ui/field'
import { Input } from '@pars/shared/components/ui/input'

const SubscriptionCreation = () => {
  // Navigation
  const navigate = useNavigate()

  // States
  const [name, setName] = useState('')

  // Functions
  const _reset = () => {
    setName('')
  }
  const _onCreate = () => {
    database.subscriptions.add({
      name,
      categories: [{ id: 1, name: 'Expense' }],
      provider: { id: 1, name: 'Spotify' },
    })
    _reset()
    navigate(-1)
  }

  return (
    <AnimatedPage>
      <div className="relative flex flex-col gap-5 w-full">
        <div>
          <h3 className="text-lg font-bold text-card-text">
            Subscription Creation
          </h3>

          <form className="w-full my-5" onSubmit={_onCreate}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Name
                  </FieldLabel>
                  <Input
                    placeholder="Evil Rabbit"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Field>
              </FieldSet>
            </FieldGroup>
            <Button onClick={_onCreate} className="w-full mt-5">
              Save
            </Button>
          </form>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default SubscriptionCreation
