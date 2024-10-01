import React, { useState, useEffect, useCallback } from 'react'
import Sound from 'react-sound'

const SoundComponent = ({ url, playStatus, volume, funcPerc }) => {
  const [position, setPosition] = useState(0)
  const [loopCount, setLoopCount] = useState(0)

  const handleSongPlaying = ({ position: currentPosition, duration }) => {
    setPosition(currentPosition)

    const pos = currentPosition + loopCount * duration // loopCount to multiply for duration
    const min = Math.floor(pos / (1000 * 60))
    const sec = Math.floor((pos / 1000) % 60)

    const formattedMin = String(min).padStart(2, '0')
    const formattedSec = String(sec).padStart(2, '0')

    setTimerValues(formattedMin, formattedSec)
    funcPerc(pos / 1000)
  }

  const reset = useCallback(() => {
    setPosition(0)
    setTimerValues('00', '00')
  }, [])

  const setTimerValues = (min, sec) => {
    const timerMin = document.getElementById('timer-min')
    const timerSec = document.getElementById('timer-sec')
    timerMin.innerHTML = min
    timerSec.innerHTML = sec
  }

  useEffect(() => {
    if (playStatus === Sound.status.STOPPED) {
      reset()
    }
  }, [playStatus, reset])

  return (
    <Sound
      url={url}
      playStatus={playStatus}
      onPlaying={handleSongPlaying}
      onFinishedPlaying={() => {
        setLoopCount((prev) => prev + 1)
        setPosition(0)
      }}
      onStop={reset}
      position={position}
      volume={volume}
    />
  )
}

export default SoundComponent
