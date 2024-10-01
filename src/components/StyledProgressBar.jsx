import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

// Define custom styles for the progress bar
const progressBarStyle = buildStyles({
  // Customize the path, i.e. the part that's "complete"
  pathColor: '#0086ffcc',
  pathTransition: 'stroke-dashoffset 0.5s ease 0s',
  pathLinecap: 'butt',

  // Customize the circle behind the path
  trailColor: '#ffffffcc',

  // Customize the text
  textColor: '#f88',
  textSize: '30px',
})

const StyledProgressBar = ({ percentage, text, strokeWidth = 3 }) => (
  <CircularProgressbar
    value={percentage}
    text={text}
    strokeWidth={strokeWidth}
    styles={progressBarStyle}
  />
)

export default StyledProgressBar
