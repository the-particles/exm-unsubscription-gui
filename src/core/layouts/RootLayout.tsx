import { type ForwardedRef, useEffect, useRef, useState } from 'react'
import NavigationBar from '@pars/core/components/NavigationBar'
import RefreshingPull from '@pars/core/components/RefreshingPull'
import { useDimension } from '@pars/core/contexts/dimension/useDimension'
import { useHeader } from '@pars/core/contexts/header/useHeader'
import { useNavigation } from '@pars/core/contexts/navigation/useNavigation'
import { AnimatePresence, motion } from 'motion/react'
import { useNavigationType, useOutlet } from 'react-router-dom'
import { ScrollArea } from '@pars/shared/components/ui/scroll-area'

const RootLayout = () => {
  // Navigation
  const navigationType = useNavigationType()
  const outlet = useOutlet()

  const isBack = navigationType === 'POP'

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Contexts
  const { navigationBarHeight } = useDimension()

  // States
  const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0)

  const bottomInset = Number(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--safe-area-inset-bottom')
      .replace('px', ''),
  )

  // Effects
  useEffect(() => {
    const _calculateHeightForMainContainer = () => {
      if (headerRef.current && scrollRef.current) {
        setScrollAreaHeight(
          window.innerHeight - headerRef.current.getBoundingClientRect().height,
        )
      }
    }

    _calculateHeightForMainContainer()
    window.addEventListener('resize', _calculateHeightForMainContainer)

    return () =>
      window.removeEventListener('resize', _calculateHeightForMainContainer)
  }, [])

  return (
    <div className="relative flex flex-col items-center w-full h-dvh overflow-hidden select-none isolate">
      <RefreshingPull />

      <Header ref={headerRef} />

      <NavigationBar />

      <div className="w-full relative grow overflow-hidden">
        <ScrollArea
          style={{ height: `${scrollAreaHeight}px` }}
          className="w-full relative"
          ref={scrollRef}
        >
          <AnimatePresence mode="popLayout" initial={true} custom={isBack}>
            <motion.main
              key={location.pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={isBack}
              style={{
                paddingBottom: `${navigationBarHeight + bottomInset + 20}px`,
              }}
              className="flex flex-col items-center px-5 pt-5 relative w-full"
            >
              {outlet}
            </motion.main>
          </AnimatePresence>
        </ScrollArea>
      </div>
    </div>
  )
}

export default RootLayout

// Internal
const Header = ({ ref }: { ref: ForwardedRef<HTMLDivElement> }) => {
  const { current } = useNavigation()
  const { Action, description } = useHeader()

  return (
    <div
      ref={ref}
      className="relative p-5 bg-background text-foreground shrink-0 w-full flex justify-between"
    >
      <div className="flex flex-col justify-start h-full">
        <h1 className="font-bold text-xl capitalize text-setting-card-foreground">
          {current}
        </h1>
        <span className="text-xs text-setting-card-foreground-muted">
          {description}
        </span>
      </div>

      <div className="self-center">{Action ? <Action /> : <></>}</div>
    </div>
  )
}
