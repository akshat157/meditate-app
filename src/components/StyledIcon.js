import React from 'react';

function StyledIcon({ className, url, alt = '', handleOnClick }) {
  return (
    <img
      className={className}
      src={url}
      alt={alt}
      onClick={() => handleOnClick()}
    />
  );
}

export default StyledIcon;
