import React from 'react'
import { arrowButton } from '../constants'
import styles from './styled-counter.module.css'

function StyledCounter({ duration, setDuration, style }) {
  // unit of "duration" in minutes

  const incr = () => {
    if (!(duration + 1 > 999)) setDuration(duration + 1)
  }

  const decr = () => {
    if (!(duration - 1 < 1)) setDuration(duration - 1)
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
