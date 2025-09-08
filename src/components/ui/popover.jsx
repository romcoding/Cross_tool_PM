import React, { useState, useRef, useEffect } from 'react'

const Popover = ({ children, ...props }) => {
  return <div {...props}>{children}</div>
}

const PopoverTrigger = React.forwardRef(({ asChild = false, children, ...props }, ref) => {
  if (asChild) {
    return React.cloneElement(children, { ref, ...props })
  }
  return <button ref={ref} {...props}>{children}</button>
})
PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = React.forwardRef(({ className = '', children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={contentRef}
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverContent, PopoverTrigger }
