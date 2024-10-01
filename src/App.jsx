import React, { useState, useRef } from 'react'
import Sound from 'react-sound'
import 'react-circular-progressbar/dist/styles.css'
import styles from './App.module.css'

import SoundComponent from './playSound'
import {
  StyledProgressBar,
  StyledSlider,
  BackgroundImage,
  StyledIcon,
  StyledCounter,
  StyledDropdown,
} from './components'

import {
  playButton,
  pauseButton,
  rainAudio,
  forestAudio,
  parkAudio,
  streamAudio,
  wavesAudio,
  loudVolumeIcon,
  quietVolumeIcon,
  noVolumeIcon,
  rainImg,
  forestImg,
  parkImg,
  wavesImg,
  streamImg,
  resetButton,
} from './constants'

const App = () => {
  const [pbuttonUrl, setPbuttonUrl] = useState(playButton)
  const [audioStatus, setAudioStatus] = useState(Sound.status.STOPPED)
  const [audioNames] = useState(['rain', 'forest', 'park', 'stream', 'waves'])
  const [seekCurrentPosition, setSeekCurrentPosition] = useState(0)
  const [audioUrl, setAudioUrl] = useState(rainAudio)
  const [bgImg, setBgImg] = useState(rainImg)
  const [desiredTime, setDesiredTime] = useState(120)
  const [audioHovered, setAudioHovered] = useState(false)
  const [counterHovered, setCounterHovered] = useState(false)
  const [volume, setVolume] = useState(100)
  const [mute, setMute] = useState(false)
  const [volumeIcon, setVolumeIcon] = useState(loudVolumeIcon)
  const [opacity, setOpacity] = useState(1)
  const [transition, setTransition] = useState('')
  const [centerOpacity, setCenterOpacity] = useState(1)

  const soundCompoRef = useRef(null)

  const timeSelect = (x) => {
    setDesiredTime(x.duration)
  }

  const playPause = () => {
    if ([Sound.status.STOPPED, Sound.status.PAUSED].includes(audioStatus)) {
      setPbuttonUrl(pauseButton)
      setAudioStatus(Sound.status.PLAYING)
    } else if (audioStatus === Sound.status.PLAYING) {
      setPbuttonUrl(playButton)
      setAudioStatus(Sound.status.PAUSED)
    }

    if (pbuttonUrl === playButton) {
      setOpacity(0)
      setCenterOpacity(0.6)
      setTransition('opacity 10s ease-out')
    } else {
      setOpacity(1)
      setCenterOpacity(1)
      setTransition('opacity 0s')
    }
  }

  const reset = () => {
    soundCompoRef.current && soundCompoRef.current.reset()
    setSeekCurrentPosition(0)
    setPbuttonUrl(playButton)
    setAudioStatus(Sound.status.STOPPED)
  }

  const handleMouseMove = () => {
    setOpacity(1)
    setTransition('opacity 0s')
    setCenterOpacity(1)
    setTimeout(() => {
      if (seekCurrentPosition < 100 && pbuttonUrl === pauseButton) {
        setOpacity(0)
        setTransition('opacity 10s ease-out')
        setCenterOpacity(0.6)
      }
    }, 3000)
  }

  const audioSelect = (audioName) => {
    switch (audioName) {
      case audioNames[1]:
        setAudioUrl(forestAudio)
        setBgImg(forestImg)
        break
      case audioNames[2]:
        setAudioUrl(parkAudio)
        setBgImg(parkImg)
        break
      case audioNames[3]:
        setAudioUrl(streamAudio)
        setBgImg(streamImg)
        break
      case audioNames[4]:
        setAudioUrl(wavesAudio)
        setBgImg(wavesImg)
        break
      default:
        setAudioUrl(rainAudio)
        setBgImg(rainImg)
        break
    }
  }

  const moveSeek = (pos) => {
    setSeekCurrentPosition((pos / desiredTime) * 100)
    if (Math.floor(pos) === desiredTime) {
      setPbuttonUrl(playButton)
      setAudioStatus(Sound.status.STOPPED)
    }
  }

  const handleAudioHover = () => {
    setAudioHovered(!audioHovered)
  }

  const handleCounterHover = () => {
    setCounterHovered(!counterHovered)
  }

  const volumeChange = (event) => {
    const value = Number(event.target.value)
    setVolume(mute ? volume : value)
    setVolumeIcon(
      mute || value === 0
        ? noVolumeIcon
        : value <= 50
        ? quietVolumeIcon
        : loudVolumeIcon
    )
  }

  const toggleMute = () => {
    setVolumeIcon(
      !mute ? noVolumeIcon : volume <= 50 ? quietVolumeIcon : loudVolumeIcon
    )
    setMute(!mute)
  }

  const fadeTransition = {
    opacity: opacity,
    transition: transition,
  }

  const partialFadeTransition = {
    opacity: centerOpacity,
    transition: transition,
  }

  const activeAudio = audioUrl
    .replace('audio/', '')
    .replace('.mp3', '')
    .toLowerCase()

  const isStopped = ![Sound.status.PLAYING, Sound.status.PAUSED].includes(
    audioStatus
  )

  return (
    <div className={styles.App} onMouseMove={handleMouseMove}>
      <div className={styles['bg-overlay']}></div>
      <BackgroundImage currentImage={bgImg} />

      <main className={styles.main}>
        <div className={styles['player-options']}>
          <StyledCounter
            min={1}
            max={120}
            setDuration={(duration) => {
              timeSelect({ duration: duration * 60 })
            }}
            duration={desiredTime / 60}
            style={!counterHovered ? fadeTransition : null}
            onMouseEnter={handleCounterHover}
            onMouseLeave={handleCounterHover}
          />
          <StyledDropdown
            options={audioNames}
            style={!audioHovered ? fadeTransition : null}
            activeOption={activeAudio}
            changeOption={audioSelect}
            onMouseEnter={handleAudioHover}
            onMouseLeave={handleAudioHover}
          />
        </div>

        <div className={styles.middleWrap}>
          <div className={styles.audioSeek} style={partialFadeTransition}>
            <StyledProgressBar id="seek" percentage={seekCurrentPosition} />
            <div
              style={partialFadeTransition}
              className={
                pbuttonUrl === playButton
                  ? `${styles.playPauseBtn} ${styles.pauseMode}`
                  : `${styles.playPauseBtn} ${styles.playMode}`
              }
              alt="Play"
              onClick={playPause}
            >
              <img className={styles.pauseIcon} src={pauseButton} alt="" />
              <img className={styles.playIcon} src={playButton} alt="" />
            </div>
          </div>

          <div className={styles.timerWrap}>
            <StyledIcon
              className={styles.resetIcon}
              src={resetButton}
              alt="reset"
              style={{
                ...partialFadeTransition,
                opacity: isStopped ? 0.4 : centerOpacity,
                transform: isStopped && 'none',
                pointerEvents: isStopped && 'none',
              }}
              handleOnClick={reset}
            />
            <div className={styles.timer} style={partialFadeTransition}>
              <span id="timer-min" className={styles.min}>
                00
              </span>
              <span> : </span>
              <span id="timer-sec" className={styles.sec}>
                00
              </span>
            </div>
          </div>
        </div>
        <div
          className={styles['volume-control']}
          style={{
            fadeTransition,
          }}
        >
          <StyledIcon
            className={styles['volume-icon']}
            src={volumeIcon}
            handleOnClick={toggleMute}
            style={fadeTransition}
          />
          &nbsp;
          <div className={styles['volume-slider']} style={fadeTransition}>
            <StyledSlider
              id="slider"
              onChange={volumeChange}
              step={1}
              min={0}
              max={100}
              value={mute ? 0 : volume}
            />
          </div>
        </div>
        <SoundComponent
          ref={soundCompoRef}
          playStatus={audioStatus}
          url={audioUrl}
          funcPerc={moveSeek}
          desiredT={desiredTime}
          volume={mute ? 0 : volume}
        />
      </main>
    </div>
  )
}

export default App
