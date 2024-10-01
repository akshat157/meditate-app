import React from 'react'
import style from './styled-slider.module.css'

const StyledSlider = ({ value, ...props }) => (
  <div className={style.range}>
    <div className={style.sliderBg} style={{ width: `${value}%` }}></div>
    <input type="range" value={value} {...props} />
  </div>
)

export default StyledSlider
