import type { LucideIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { colors } from '@/greenvelly/config/colors'
import './AppButton.css'

interface AppButtonProps {
  text: string
  onClick?: () => void
  isLoading?: boolean
  isOutlined?: boolean
  icon?: LucideIcon
  backgroundColor?: string
  textColor?: string
  width?: string
  height?: number
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function AppButton({
  text,
  onClick,
  isLoading = false,
  isOutlined = false,
  icon: Icon,
  backgroundColor = colors.primary,
  textColor,
  width,
  height = 52,
  type = 'button',
  disabled,
}: AppButtonProps) {
  const fg = textColor ?? (isOutlined ? colors.primary : '#fff')
  const cls = isOutlined ? 'app-button app-button-outlined' : 'app-button app-button-filled'

  return (
    <button
      type={type}
      className={cls}
      style={{
        width: width ?? '100%',
        height,
        ...(isOutlined
          ? { borderColor: backgroundColor, color: fg }
          : { backgroundColor, color: fg }),
      }}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="app-button-spinner" size={22} />
      ) : (
        <>
          {Icon && <Icon size={18} />}
          <span>{text}</span>
        </>
      )}
    </button>
  )
}
