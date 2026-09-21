import { Eye, EyeOff } from 'lucide-react'
import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { colors } from '@/greenvelly/config/colors'
import './CustomTextField.css'

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefixIcon?: ReactNode
  multiline?: boolean
  rows?: number
}

export function CustomTextField({
  label,
  error,
  prefixIcon,
  multiline,
  rows = 3,
  className = '',
  ...props
}: CustomTextFieldProps) {
  const inputClass = [
    'custom-field-input',
    error ? 'has-error' : '',
    prefixIcon && !multiline ? 'has-prefix' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className="custom-field">
      {label && <span className="custom-field-label">{label}</span>}
      <div className="custom-field-wrap">
        {prefixIcon && !multiline && <span className="custom-field-prefix">{prefixIcon}</span>}
        {multiline ? (
          <textarea
            className={inputClass}
            rows={rows}
            {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input className={inputClass} {...props} />
        )}
      </div>
      {error && <span className="custom-field-error">{error}</span>}
    </label>
  )
}

export function EmailField(props: Omit<CustomTextFieldProps, 'type'>) {
  return <CustomTextField type="email" autoComplete="email" {...props} />
}

export function PasswordField(props: Omit<CustomTextFieldProps, 'type'>) {
  const [visible, setVisible] = useState(false)
  return (
    <CustomTextFieldWithSuffix
      type={visible ? 'text' : 'password'}
      autoComplete="current-password"
      {...props}
      suffix={
        <button
          type="button"
          className="custom-field-suffix-btn"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={18} color={colors.textHint} /> : <Eye size={18} color={colors.textHint} />}
        </button>
      }
    />
  )
}

// Extended PasswordField with suffix support
function CustomTextFieldWithSuffix({
  suffix,
  label,
  error,
  prefixIcon,
  multiline: _multiline,
  rows: _rows,
  className = '',
  ...props
}: CustomTextFieldProps & { suffix?: ReactNode }) {
  const inputClass = [
    'custom-field-input',
    error ? 'has-error' : '',
    prefixIcon ? 'has-prefix' : '',
    suffix ? 'has-suffix' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className="custom-field">
      {label && <span className="custom-field-label">{label}</span>}
      <div className="custom-field-wrap">
        {prefixIcon && <span className="custom-field-prefix">{prefixIcon}</span>}
        <input className={inputClass} {...props} />
        {suffix && <span className="custom-field-suffix">{suffix}</span>}
      </div>
      {error && <span className="custom-field-error">{error}</span>}
    </label>
  )
}

export function PasswordFieldWithToggle(props: Omit<CustomTextFieldProps, 'type'>) {
  const [visible, setVisible] = useState(false)
  return (
    <CustomTextFieldWithSuffix
      type={visible ? 'text' : 'password'}
      autoComplete="current-password"
      {...props}
      suffix={
        <button
          type="button"
          className="custom-field-suffix-btn"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff size={18} color={colors.textHint} /> : <Eye size={18} color={colors.textHint} />}
        </button>
      }
    />
  )
}
