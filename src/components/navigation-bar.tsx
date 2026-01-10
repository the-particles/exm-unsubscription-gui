import { useEffect, useRef } from 'react'
import { ChartPie, CreditCard, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@pars/shared/components/ui/button'
import { useDimension } from '@pars/hooks/use-dimension'
import { useNavigation } from '@pars/hooks/use-navigation'
import './navigation-bar.css'

const NAVIGATION_ITEMS = [
  { name: 'dashboard', label: 'Dashboard', icon: ChartPie, href: '/' },
  {
    name: 'subscriptions',
    label: 'Subscriptions',
    icon: CreditCard,
    href: '/subscriptions',
  },
  {
    name: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
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
    navigate(href)
  }

  return (
    <Button asChild withChildrenStyle onClick={_onNavigate}>
      <div
        className={`flex flex-col justify-center items-center gap-1 transition-transform active:scale-90 active:transition-[transform_0.25s_ease] ${
          isCurrentNavigation && 'text-teal-400'
        }`}
      >
        <Icon strokeWidth={isCurrentNavigation ? 2.75 : undefined} />
        <span className={`text-xxs`}>{label}</span>
      </div>
    </Button>
  )
}

const NavigationBar = () => {
  // Refs
  const navigationBarRef = useRef<HTMLDivElement>(null)

  // Contexts
  const { setNavigationBarHeight } = useDimension()

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
      className="fixed bottom-0 left-0 w-full h-28 flex justify-between items-center p-5 navigation-bar"
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
