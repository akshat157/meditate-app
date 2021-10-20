import React, { useRef } from 'react'
import { arrowButton } from '../constants'
import styles from './styled-counter.module.css'

function StyledCounter(props) {
  const {duration, setDuration} = props;
  // unit of "duration" in minutes
  const incrTimeoutID = useRef(null)
  const decrTimeoutID = useRef(null)

  const getNewRate = (rate) => {
    if (rate < 16) {
      rate = rate * 2 //rate increases exponentially upto 16 only
    } else {
      rate = 16
    }

    return rate
  }

  const incr = (rate, oldDuration) => {
    const newDuration = oldDuration + rate
    if (newDuration <= 999) {
      incrTimeoutID.current = setTimeout(() => {
        console.log('trigger up')
        setDuration(newDuration)
        let newRate = getNewRate(rate)
        incr(newRate, newDuration)
      }, 450)
    }
  }

  const decr = (rate, oldDuration) => {
    const newDuration = oldDuration - rate
    if (newDuration >= 1) {
      decrTimeoutID.current = setTimeout(() => {
        console.log('trigger down')
        setDuration(newDuration)
        let newRate = getNewRate(rate)
        decr(newRate, newDuration)
      }, 450)
    }
  }

  return (
    <div className={styles.root} {...props}>
      <div className={styles.main}>
        <span className={styles.buttonWrap}>
          <img
            className={styles.increase}
            src={arrowButton}
            alt="inc"
            onMouseDown={() => {
              duration + 1 <= 999 && setDuration(duration + 1)
              incr(1, duration)
            }}
            onMouseUp={() => clearTimeout(incrTimeoutID.current)}
            onMouseLeave={() => clearTimeout(incrTimeoutID.current)}
          />
        </span>
        <input className={styles.display} type="number" value={duration} />
        <span className={styles.buttonWrap}>
          <img
            className={styles.decrease}
            src={arrowButton}
            alt="dec"
            onMouseDown={() => {
              duration - 1 >= 1 && setDuration(duration - 1)
              decr(1, duration)
            }}
            onMouseUp={() => clearTimeout(decrTimeoutID.current)}
            onMouseLeave={() => clearTimeout(decrTimeoutID.current)}
          />
        </span>
      </div>
      <p className={styles.minutes}>Minutes</p>
    </div>
  )
}

export default StyledCounter
