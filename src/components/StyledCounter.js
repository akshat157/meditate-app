import React, { useRef } from 'react'
import { arrowButton } from '../constants'
import styles from './styled-counter.module.css'

function StyledCounter(props) {
  const { duration, setDuration, min, max } = props
  // unit of "duration" in minutes
  const incrTimeoutID = useRef(null)
  const decrTimeoutID = useRef(null)
  
  const getNewRate = (rate) => {
    switch (rate) {
      case 1:
        rate = 2
        break
      case 2:
        rate = 5
        break
      case 5:
        rate = 10
        break
      case 10:
        rate = 15
        break

      default:
        break
    }
    return rate
  }

  const incr = (rate, oldDuration) => {
    let newDuration = oldDuration + rate
    if (newDuration <= max) {
      incrTimeoutID.current = setTimeout(() => {
        setDuration(newDuration)
        incr(getNewRate(rate), newDuration)
      }, 450)
    } else if (oldDuration + 1 <= max) {
      rate = 1
      newDuration = oldDuration + rate
      incrTimeoutID.current = setTimeout(() => {
        setDuration(newDuration)
        incr(getNewRate(rate), newDuration)
      }, 450)
    }
  }

  const decr = (rate, oldDuration) => {
    let newDuration = oldDuration - rate
    if (newDuration >= min) {
      decrTimeoutID.current = setTimeout(() => {
        setDuration(newDuration)
        decr(getNewRate(rate), newDuration)
      }, 450)
    } else if (oldDuration - 1 >= min) {
      rate = 1
      newDuration = oldDuration - rate
      decrTimeoutID.current = setTimeout(() => {
        setDuration(newDuration)
        decr(getNewRate(rate), newDuration)
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
              duration + 1 <= max && setDuration(duration + 1)
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
              duration - 1 >= min && setDuration(duration - 1)
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
