import React from 'react'

function StyledIcon(props) {
  const { alt = '', handleOnClick } = props
  return <img alt={alt} onClick={() => handleOnClick()} {...props} />
}

export default StyledIcon
