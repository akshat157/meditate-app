import React from "react";

function BackgroundImage({ currentImage }) {
  return (
    <div className='bg' style={{ backgroundImage: `url(${currentImage})` }} />
  );
}

export default BackgroundImage;
