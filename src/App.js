import React, { Component } from 'react'
import Sound from 'react-sound'
import 'react-circular-progressbar/dist/styles.css'
import styles from './App.module.css'

// import logo from './logo.svg';
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pbuttonUrl: playButton,
      audioStatus: Sound.status.STOPPED,
      audioNames: ['rain', 'forest', 'park', 'stream', 'waves'],
      seekCurrentPosition: 0,
      audioUrl: rainAudio, // Default
      bgImg: rainImg,
      desiredTime: 120, // Default
      audioHovered: false,
      counterHovered: false,
      volume: 100, // Default
      mute: false, // Default
      volumeIcon: loudVolumeIcon,
      opacity: 1,
      transition: '',
      center_opacity: 1,
    }
    this.soundCompoRef = React.createRef()
  }

  timeSelect(x) {
    this.setState({
      desiredTime: x.duration,
    })
  }

  playPause() {
    if (
      [Sound.status.STOPPED, Sound.status.PAUSED].includes(
        this.state.audioStatus
      )
    ) {
      this.setState({
        pbuttonUrl: pauseButton,
        audioStatus: Sound.status.PLAYING,
      })
    } else if (this.state.audioStatus === Sound.status.PLAYING) {
      this.setState({
        pbuttonUrl: playButton,
        audioStatus: Sound.status.PAUSED,
      })
    }

    if (this.state.pbuttonUrl === playButton) {
      this.setState({
        opacity: 0,
        center_opacity: 0.6,
        transition: 'opacity 10s ease-out',
      })
    } else {
      this.setState({
        opacity: 1,
        center_opacity: 1,
        transition: 'opacity 0s',
      })
    }
  }

  reset() {
    this.soundCompoRef.current && this.soundCompoRef.current.reset()

    this.setState({
      seekCurrentPosition: 0,
      pbuttonUrl: playButton,
      audioStatus: Sound.status.STOPPED,
    })
  }

  _onMouseMove = (e) => {
    this.setState({
      opacity: 1,
      transition: 'opacity 0s',
      center_opacity: 1,
    })
    setTimeout(() => {
      if (
        this.state.seekCurrentPosition < 100 &&
        this.state.pbuttonUrl === pauseButton
      ) {
        this.setState({
          opacity: 0,
          transition: 'opacity 10s ease-out',
          center_opacity: 0.6,
        })
      }
    }, 3000)
  }

  audioSelect(audioName) {
    switch (audioName) {
      case this.state.audioNames[1]:
        this.setState({
          audioUrl: forestAudio,
          bgImg: forestImg,
        })
        break

      case this.state.audioNames[2]:
        this.setState({
          audioUrl: parkAudio,
          bgImg: parkImg,
        })
        break

      case this.state.audioNames[3]:
        this.setState({
          audioUrl: streamAudio,
          bgImg: streamImg,
        })
        break

      case this.state.audioNames[4]:
        this.setState({
          audioUrl: wavesAudio,
          bgImg: wavesImg,
        })
        break

      default:
        this.setState({
          audioUrl: rainAudio,
          bgImg: rainImg,
        })
        break
    }
  }

  moveSeek(pos) {
    this.setState({
      seekCurrentPosition: (pos / this.state.desiredTime) * 100,
    })

    if (Math.floor(pos) === this.state.desiredTime) {
      this.setState({
        pbuttonUrl: playButton,
        audioStatus: Sound.status.STOPPED,
      })
    }
  }

  handleAudioHover() {
    this.setState({
      audioHovered: !this.state.audioHovered,
    })
  }

  handleCounterHover() {
    this.setState({
      counterHovered: !this.state.counterHovered,
    })
  }

  volumeChange = (event) => {
    const value = Number(event.target.value)
    this.setState({
      volume: this.state.mute ? this.state.volume : value,
      volumeIcon:
        this.state.mute || value === 0
          ? noVolumeIcon
          : value <= 50
          ? quietVolumeIcon
          : loudVolumeIcon,
    })
  }

  toggleMute() {
    this.setState({
      volumeIcon: !this.state.mute
        ? noVolumeIcon
        : this.state.volume <= 50
        ? quietVolumeIcon
        : loudVolumeIcon,
      mute: !this.state.mute,
    })
  }

  render() {
    const fadeTransition = {
      opacity: this.state.opacity,
      transition: this.state.transition,
    }

    const partialFadeTransition = {
      opacity: this.state.center_opacity,
      transition: this.state.transition,
    }

    const activeAudio = this.state.audioUrl
      .replace('audio/', '')
      .replace('.mp3', '')
      .toLowerCase()

    const isStopped = ![Sound.status.PLAYING, Sound.status.PAUSED].includes(
      this.state.audioStatus
    )
    return (
      <div className={styles.App} onMouseMove={this._onMouseMove}>
        <div className={styles['bg-overlay']}></div>
        <BackgroundImage currentImage={this.state.bgImg} />

        <main className={styles.main}>
          <div className={styles['player-options']}>
            <StyledCounter
              setDuration={(duration) => {
                // unit of "duration" is minutes
                this.timeSelect({ duration: duration * 60 }) // convert minutes to seconds
              }}
              duration={this.state.desiredTime / 60} // unit of "desiredTime" is seconds, convert seconds to minutes
              style={!this.state.counterHovered ? fadeTransition : null}
              onMouseEnter={this.handleCounterHover.bind(this)}
              onMouseLeave={this.handleCounterHover.bind(this)}
            />
            <StyledDropdown
              options={this.state.audioNames}
              style={!this.state.audioHovered ? fadeTransition : null}
              activeOption={activeAudio}
              changeOption={(audioName) => {
                this.audioSelect(audioName)
              }}
              onMouseEnter={this.handleAudioHover.bind(this)}
              onMouseLeave={this.handleAudioHover.bind(this)}
            />
          </div>

          <div className={styles.middleWrap}>
            <div className={styles.audioSeek} style={partialFadeTransition}>
              <StyledProgressBar
                id="seek"
                percentage={this.state.seekCurrentPosition}
              />
              <div
                style={partialFadeTransition}
                className={
                  this.state.pbuttonUrl === playButton
                    ? `${styles.playPauseBtn} ${styles.pauseMode}`
                    : `${styles.playPauseBtn} ${styles.playMode}`
                }
                alt="Play"
                onClick={this.playPause.bind(this)}
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
                  opacity: isStopped ? 0.4 : this.state.center_opacity,
                  transform: isStopped && 'none',
                  pointerEvents: isStopped && 'none',
                }}
                handleOnClick={this.reset.bind(this)}
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
              src={this.state.volumeIcon}
              handleOnClick={this.toggleMute.bind(this)}
              style={fadeTransition}
            />
            &nbsp;
            <div className={styles['volume-slider']} style={fadeTransition}>
              <StyledSlider
                id="slider"
                onChange={this.volumeChange}
                step={1}
                min={0}
                max={100}
                value={this.state.mute ? 0 : this.state.volume}
              />
            </div>
          </div>
          <SoundComponent
            ref={this.soundCompoRef}
            playStatus={this.state.audioStatus}
            url={this.state.audioUrl}
            funcPerc={this.moveSeek.bind(this)}
            desiredT={this.state.desiredTime}
            volume={this.state.mute ? 0 : this.state.volume}
          />
        </main>
      </div>
    )
  }
}

export default App
