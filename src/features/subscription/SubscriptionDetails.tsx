import { useNavigate } from 'react-router-dom'
import { Button } from '@pars/shared/components/ui/button'

const SubscriptionDetails = () => {
  const navigate = useNavigate()
  return (
    <div className="">
      <h3>Sub</h3>
      <Button onClick={() => navigate(-1)}>Nahhh</Button>
    </div>
  )
}

export default SubscriptionDetails
