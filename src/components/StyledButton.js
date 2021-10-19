import React from 'react'

function StyledButton({
  onMouseEnter,
  onMouseLeave,
  onClick,
  isActive,
  buttonLabel,
  className,
}) {
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
