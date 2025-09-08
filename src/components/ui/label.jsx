import React from 'react'

const Label = React.forwardRef(({ className = '', ...props }, ref) => (
  <label
    ref={ref}
    className={`label ${className}`}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
