import React from 'react'

const Badge = React.forwardRef(({ className = '', variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'badge-default',
    secondary: 'badge-secondary',
    destructive: 'badge-destructive',
    outline: 'badge-outline',
  }

  return (
    <div
      ref={ref}
      className={`badge ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'

export { Badge }
