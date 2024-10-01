import React from 'react'

const StyledIcon = ({ alt = '', handleOnClick, ...rest }) => (
  <img alt={alt} onClick={handleOnClick} {...rest} />
)

export default StyledIcon
