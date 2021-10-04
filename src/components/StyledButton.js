import React from 'react'

function StyledButton ({onMouseEnter, onMouseLeave, onClick, isActive, buttonLabel}) {
    return(
        <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={isActive ? 'active': ''} onClick={onClick}>{buttonLabel}</button>
    )
}

export default StyledButton