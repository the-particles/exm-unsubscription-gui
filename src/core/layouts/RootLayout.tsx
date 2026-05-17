import { type ForwardedRef, useEffect, useRef, useState } from 'react'
import NavigationBar from '@pars/core/components/NavigationBar'
import RefreshingPull from '@pars/core/components/RefreshingPull'
import { useDimension } from '@pars/core/contexts/dimension/useDimension'
import { useHeader } from '@pars/core/contexts/header/useHeader'
import { useNavigation } from '@pars/core/contexts/navigation/useNavigation'
import { Outlet } from 'react-router-dom'
import { ScrollArea } from '@pars/shared/components/ui/scroll-area'

const RootLayout = () => {
  // Refs
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Contexts
  const { navigationBarHeight } = useDimension()

  // States
  const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0)

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
    <div className="flex flex-col items-center w-full min-h-dvh h-dvh overflow-hidden select-none">
      <RefreshingPull />

      <Header ref={headerRef} />

      <ScrollArea
        style={{ height: `${scrollAreaHeight}px` }}
        className="w-full"
        ref={scrollRef}
      >
        <main
          style={{ paddingBottom: `${navigationBarHeight + 20}px` }}
          className="flex flex-col items-center px-5 pt-5 relative w-full"
        >
          <Outlet />
        </main>
      </ScrollArea>

      <NavigationBar />
    </div>
  )
}

export default RootLayout

// Internal
const Header = ({ ref }: { ref: ForwardedRef<HTMLDivElement> }) => {
  const { current, description } = useNavigation()
  const { Action } = useHeader()

  return (
    <div
      ref={ref}
      className="relative p-5 bg-background text-foreground shrink-0 w-full flex justify-between items-center h-20"
    >
      <div className="flex flex-col justify-start h-full">
        <h1 className="font-bold text-xl capitalize">{current}</h1>
        <span className="text-xs text-setting-card-foreground-muted">
          {description}
        </span>
      </div>

      <div>{Action ? <Action /> : <></>}</div>
    </div>
  )
}
