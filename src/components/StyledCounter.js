import React from 'react'
import { arrowButton } from '../constants'
import style from './styled-counter.module.css'

function StyledCounter({ duration, setDuration }) {
  // unit of "duration" in minutes

  const incr = () => {
    if (!(duration + 1 > 999))setDuration(duration + 1)
  }

  const decr = () => {
    if (!(duration - 1 < 1)) setDuration(duration - 1)
  }

  return (
    <div className={style.root}>
      <div className={style.main}>
        <span className={style.buttonWrap}>
          <img
            className={style.increase}
            src={arrowButton}
            alt="inc"
            onClick={incr}
          />
        </span>
        <input className={style.display} type="number" value={duration} />
        <span className={style.buttonWrap}>
          <img
            className={style.decrease}
            src={arrowButton}
            alt="dec"
            onClick={decr}
          />
        </span>
      </div>
      <p className={style.minutes}>Minutes</p>
    </div>
  )
}

export default StyledCounter
