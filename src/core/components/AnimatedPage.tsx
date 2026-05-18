import { ArrowLeft } from 'lucide-react'
import { type Variants, motion } from 'motion/react'
import { useNavigate, useNavigationType } from 'react-router-dom'
import { haptic } from '../utils/document'

const variants: Variants = {
  initial: (isBack: boolean) => ({
    x: isBack ? '-30%' : '100%',
  }),
  animate: {
    x: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.25,
      ease: 'backOut',
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? '100%' : '-30%',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.25,
      ease: 'backOut',
    },
  }),
}

export default function AnimatedPage({
  children,
  zIndex = 'z-10',
}: {
  children: React.ReactNode
  zIndex?: string
}) {
  // Navigation
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const isBack = navigationType === 'POP'

  const _onNavigateBack = () => {
    haptic()
    navigate(-1)
  }

  return (
    <motion.div
      custom={isBack}
      variants={variants}
      initial="initial"
      animate="animate"
      // exit="exit"
      className={`fixed top-0 left-0 p-5 pt-[calc(var(--safe-area-inset-top)+var(--spacing)*5)] flex flex-col gap-5 w-full h-full bg-background ${zIndex} shadow-[-10px_0_20px_rgba(0,0,0,0.05)]`}
    >
      <div>
        <ArrowLeft onClick={_onNavigateBack} />
      </div>
      <div>{children}</div>
    </motion.div>
  )
}
