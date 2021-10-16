import React from 'react'
import CircularProgressbar from 'react-circular-progressbar'

const progressBarStyle = {
  // Customize the root svg element
  root: {},
  // Customize the path, i.e. the part that's "complete"
  path: {
    // Tweak path color:
    stroke: '#0086ffcc',
    // Tweak path to use flat or rounded ends:
    strokeLinecap: 'butt',
    // Tweak transition animation:
    transition: 'stroke-dashoffset 0.5s ease 0s',
  },
  // Customize the circle behind the path
  trail: {
    // Tweak the trail color:
    stroke: '#ffffffcc',
  },
  // Customize the text
  text: {
    // Tweak text color:
    fill: '#f88',
    // Tweak text size:
    fontSize: '30px',
  },
}

function StyledProgressBar({ percentage, text, strokeWidth = 3 }) {
  return (
    <CircularProgressbar
      percentage={percentage}
      text={text}
      // Path width must be customized with strokeWidth,
      // since it informs dimension calculations.
      strokeWidth={strokeWidth}
      // You can override styles either by specifying this "styles" prop,
      // or by overriding the default CSS here:
      // https://github.com/iqnivek/react-circular-progressbar/blob/master/src/styles.css
      styles={progressBarStyle}
    />
  )
}
export default StyledProgressBar
