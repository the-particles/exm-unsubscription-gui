import type { ComponentType, ReactNode } from 'react'

export interface SettingItemProps {
  Icon: ComponentType<{ className: string }>
  title: string
  rightContent: ReactNode
  onClick: () => void
}

const SettingItem = ({
  Icon,
  title,
  rightContent,
  onClick,
}: SettingItemProps) => {
  return (
    <div
      className="flex items-center justify-between rounded-2xl w-full p-5 text-card-text bg-setting-card-background"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 text-setting-card-foreground">
        <Icon className="size-4" />
        <span className="font-medium">{title}</span>
      </div>
      <div className="text-sm capitalize text-setting-card-foreground-muted">
        {rightContent}
      </div>
    </div>
  )
}

export default SettingItem
