import React from 'react'
import style from './styled-slider.module.css'

function StyledSlider(props) {
  const { value } = props

  return (
    <div className={style.range}>
      <div className={style.sliderBg} style={{ width: `${value}%` }}></div>
      <input type="range" {...props} />
    </div>
  )
}

export default StyledSlider
