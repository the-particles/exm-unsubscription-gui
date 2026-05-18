import AnimatedPage from '@pars/core/components/AnimatedPage'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SettingItem from './SettingItem'

const SettingDetails = () => {
  const navigate = useNavigate()

  return (
    <AnimatedPage>
      <div className="relative flex flex-col gap-5 w-full">
        <div>
          <h3 className="text-lg font-bold text-card-text">Navigate</h3>
          <div className="mt-5 flex flex-col gap-2">
            <SettingItem
              Icon={ArrowLeft}
              title={'Go back'}
              rightContent={<></>}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default SettingDetails
