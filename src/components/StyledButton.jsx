import React from 'react'

const StyledButton = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  isActive,
  buttonLabel,
  className,
}) => {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={isActive ? `active ${className}` : className}
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  )
}

export default StyledButton
