import React, { useRef, useCallback } from 'react'
import { arrowButton } from '../constants'
import styles from './styled-counter.module.css'

const StyledCounter = ({ duration, setDuration, min, max, ...props }) => {
  const incrTimeoutID = useRef(null)
  const decrTimeoutID = useRef(null)

  const getNewRate = useCallback((rate) => {
    switch (rate) {
      case 1:
        return 2
      case 2:
        return 5
      case 5:
        return 10
      case 10:
        return 15
      default:
        return rate
    }
  }, [])

  const incr = useCallback(
    (rate, oldDuration) => {
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
    },
    [getNewRate, max, setDuration]
  )

  const decr = useCallback(
    (rate, oldDuration) => {
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
    },
    [getNewRate, min, setDuration]
  )

  return (
    <div className={styles.root} {...props}>
      <div className={styles.main}>
        <span className={styles.buttonWrap}>
          <img
            className={styles.increase}
            src={arrowButton}
            alt="inc"
            onMouseDown={() => {
              if (duration + 1 <= max) setDuration(duration + 1)
              incr(1, duration)
            }}
            onMouseUp={() => clearTimeout(incrTimeoutID.current)}
            onMouseLeave={() => clearTimeout(incrTimeoutID.current)}
          />
        </span>
        <input
          className={styles.display}
          type="number"
          value={duration}
          readOnly
        />
        <span className={styles.buttonWrap}>
          <img
            className={styles.decrease}
            src={arrowButton}
            alt="dec"
            onMouseDown={() => {
              if (duration - 1 >= min) setDuration(duration - 1)
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
