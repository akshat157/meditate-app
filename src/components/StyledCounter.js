import React from 'react'
import { arrowButton } from '../constants'
import styles from './styled-counter.module.css'

function StyledCounter({ duration, setDuration, style }) {
  // unit of "duration" in minutes

  const incr = () => {
    if (!(duration + 1 > 120)) setDuration(duration + 1)
    if ((duration + 1 < 15)) setDuration(duration + 1)
    if ((duration + 1 > 15 && duration + 1 < 45)) setDuration(duration + 5)
    if ((duration + 1 > 45 && duration + 1 < 120)) setDuration(duration + 15)
  }

  const decr = () => {
    if ((duration - 1 <= 0)) {
        setDuration(1)
    } else {
        if (!(duration - 1 < 1)) setDuration(duration - 1)
        if ((duration - 1 < 15)) setDuration(duration - 1)
        if ((duration - 1 > 15 && duration - 1 < 45)) setDuration(duration - 5)
        if ((duration - 1 > 45 && duration - 1 < 120)) setDuration(duration - 15)
    }
  }

  return (
    <div className={styles.root} style={style}>
      <div className={styles.main}>
        <span className={styles.buttonWrap}>
          <img
            className={styles.increase}
            src={arrowButton}
            alt="inc"
            onClick={incr}
          />
        </span>
        <input className={styles.display} type="number" value={duration} />
        <span className={styles.buttonWrap}>
          <img
            className={styles.decrease}
            src={arrowButton}
            alt="dec"
            onClick={decr}
          />
        </span>
      </div>
      <p className={styles.minutes}>Minutes</p>
    </div>
  )
}

export default StyledCounter
