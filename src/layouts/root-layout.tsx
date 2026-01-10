import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ScrollArea } from '@pars/shared/components/ui/scroll-area'
import { useDimension } from '@pars/hooks/use-dimension'
import { useHeader } from '@pars/hooks/use-header'
import { useNavigation } from '@pars/hooks/use-navigation'
import NavigationBar from '@pars/components/navigation-bar'
import RefreshingPull from '@pars/components/refreshing-pull'
import './root-layout.css'

const RootLayout = () => {
  // Refs
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Contexts
  const { current } = useNavigation()
  const { Action } = useHeader()
  const { navigationBarHeight } = useDimension()

  // States
  const [scrollAreaHeight, setScrollAreaHeight] = useState<number>(0)

  // Effects
  useEffect(() => {
    const calculateHeight = () => {
      if (headerRef.current && scrollRef.current) {
        setScrollAreaHeight(
          window.innerHeight - headerRef.current.getBoundingClientRect().height,
        )
      }
    }

    calculateHeight()
    window.addEventListener('resize', calculateHeight)

    return () => window.removeEventListener('resize', calculateHeight)
  }, [])

  return (
    <main className="flex flex-col items-center w-full h-dvh overflow-hidden">
      <RefreshingPull />
      <div
        ref={headerRef}
        className="p-5 bg-background text-foreground shrink-0 w-full flex justify-between items-center"
      >
        <div>
          <h1 className="font-semibold text-2xl capitalize">{current}</h1>
          <span className="text-sm text-accent-foreground">
            Your subscription overview
          </span>
        </div>
        {Action ? <Action /> : <></>}
      </div>
      <ScrollArea
        style={{ height: `${scrollAreaHeight}px` }}
        className="w-full scroll-area"
        ref={scrollRef}
      >
        <div
          style={{ paddingBottom: `${navigationBarHeight + 40}px` }}
          className="flex flex-col items-center px-5 pt-5 relative w-full"
        >
          <Outlet />
        </div>
      </ScrollArea>
      <NavigationBar />
    </main>
  )
}

export default RootLayout
