import { useEffect, useRef } from 'react'
import { useDimension } from '@pars/core/contexts/dimension/useDimension'
import { useNavigation } from '@pars/core/contexts/navigation/useNavigation'
import { ChartPie, CreditCard, Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@pars/shared/components/ui/button'
import './NavigationBar.css'

const NAVIGATION_ITEMS = [
  { name: 'dashboard', label: 'Dashboard', icon: ChartPie, href: '/dashboard' },
  {
    name: 'subscription',
    label: 'Subscription',
    icon: CreditCard,
    href: '/subscription',
  },
  {
    name: 'setting',
    label: 'Setting',
    icon: Settings,
    href: '/setting',
  },
]

const NavigationItem = ({
  name,
  icon: Icon,
  label,
  href,
}: (typeof NAVIGATION_ITEMS)[number]) => {
  // Hooks
  const navigate = useNavigate()

  // Contexts
  const { current, setCurrent } = useNavigation()

  // States
  const isCurrentNavigation = current === name

  // Functions
  const _onNavigate = () => {
    setCurrent(name)
    navigate(href, { replace: true })
  }

  return (
    <Button asChild withChildrenStyle onClick={_onNavigate}>
      <div
        className={`flex flex-col justify-center items-center gap-1 transition-transform active:scale-90 active:transition-[transform_0.25s_ease] ${
          isCurrentNavigation && 'text-or-accent'
        }`}
      >
        <Icon strokeWidth={isCurrentNavigation ? 2.75 : undefined} />
        <span className="text-xxs">{label}</span>
      </div>
    </Button>
  )
}

const NavigationBar = () => {
  // Refs
  const navigationBarRef = useRef<HTMLDivElement>(null)

  // Hooks
  const location = useLocation()

  // Contexts
  const { setNavigationBarHeight } = useDimension()

  // States
  const isSubPage = location.pathname.split('/').filter(Boolean).length > 1

  // Effects
  useEffect(() => {
    const calculateHeight = () => {
      if (navigationBarRef.current) {
        setNavigationBarHeight(
          navigationBarRef.current.getBoundingClientRect().height,
        )
      }
    }

    calculateHeight()
    window.addEventListener('resize', calculateHeight)

    return () => window.removeEventListener('resize', calculateHeight)
  }, [setNavigationBarHeight])

  return (
    <nav
      ref={navigationBarRef}
      className={`fixed bottom-0 left-0 w-full h-28 z-30 translate-z-0 flex justify-between items-center p-5 navigation-bar transition-all duration-300 ease-in-out ${
        isSubPage
          ? 'translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-background/50 rounded-full flex justify-around items-center w-full py-3 border backdrop-blur-lg">
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationItem key={item.name} {...item} />
        ))}
      </div>
    </nav>
  )
}

export default NavigationBar
