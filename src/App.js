import React, { Component } from 'react'
import Sound from 'react-sound'
import 'react-circular-progressbar/dist/styles.css'
import './App.css'

// import logo from './logo.svg';
import SoundComponent from './playSound'
import {
  StyledProgressBar,
  StyledSlider,
  StyledButton,
  BackgroundImage,
  StyledIcon,
  StyledCounter,
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
      audioNames: ['Rain', 'Forest', 'Park', 'Stream', 'Waves'],
      seekCurrentPosition: 0,
      audioUrl: rainAudio, // Default
      bgImg: rainImg,
      desiredTime: 120, // Default
      audioHovered: false,
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

  audioSelect(name) {
    var x = JSON.stringify(name.audioName).replace(/["]+/g, '')

    if (x === this.state.audioNames[1]) {
      this.setState({
        audioUrl: forestAudio,
        bgImg: forestImg,
      })
    } else if (x === this.state.audioNames[2]) {
      this.setState({
        audioUrl: parkAudio,
        bgImg: parkImg,
      })
    } else if (x === this.state.audioNames[3]) {
      this.setState({
        audioUrl: streamAudio,
        bgImg: streamImg,
      })
    } else if (x === this.state.audioNames[4]) {
      this.setState({
        audioUrl: wavesAudio,
        bgImg: wavesImg,
      })
    } else {
      this.setState({
        audioUrl: rainAudio,
        bgImg: rainImg,
      })
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
    const audioOptions = this.state.audioNames.map((audioName) => (
      <StyledButton
        key={audioName}
        className="audioButton"
        onMouseEnter={this.handleAudioHover.bind(this)}
        onMouseLeave={this.handleAudioHover.bind(this)}
        onClick={() => {
          this.audioSelect({ audioName })
        }}
        isActive={
          this.state.audioUrl === 'audio/' + audioName.toLowerCase() + '.mp3'
        }
        buttonLabel={audioName}
      />
    ))

    return (
      <div className="App" onMouseMove={this._onMouseMove}>
        <div className="bg-overlay"></div>
        <BackgroundImage currentImage={this.state.bgImg} />

        <main className="main">
          <div className="player-container">
            <StyledCounter
              setDuration={(duration) => {
                // unit of "duration" is minutes
                this.timeSelect({ duration: duration * 60 }) // convert minutes to seconds
              }}
              duration={this.state.desiredTime / 60} // unit of "desiredTime" is seconds, convert seconds to minutes
              transitionStyle={{
                opacity: this.state.opacity,
                transition: this.state.transition,
              }}
            />
            <div className="middleWrap">
              <StyledIcon
                className="resetIcon"
                src={resetButton}
                alt="reset"
                style={{
                  visibility: [
                    Sound.status.PLAYING,
                    Sound.status.PAUSED,
                  ].includes(this.state.audioStatus)
                    ? 'visible'
                    : 'hidden',
                  opacity: this.state.opacity,
                  transition: this.state.transition,
                }}
                handleOnClick={this.reset.bind(this)}
              />

              <div
                className="audioSeek"
                style={{
                  opacity: this.state.center_opacity,
                  transition: this.state.transition,
                }}
              >
                <StyledProgressBar
                  id="seek"
                  percentage={this.state.seekCurrentPosition}
                />
                <div
                  style={{
                    opacity: this.state.center_opacity,
                    transition: this.state.transition,
                  }}
                  className={
                    this.state.pbuttonUrl === playButton
                      ? 'playPauseBtn pauseMode'
                      : 'playPauseBtn playMode'
                  }
                  alt="Play"
                  onClick={this.playPause.bind(this)}
                >
                  <img className="pauseIcon" src={pauseButton} alt="" />
                  <img className="playIcon" src={playButton} alt="" />
                </div>
              </div>
              <div
                className="timer"
                style={{
                  opacity: this.state.center_opacity,
                  transition: this.state.transition,
                }}
              >
                <span className="min">00</span>
                <span> : </span>
                <span className="sec">00</span>
              </div>
            </div>
            <div
              className="volume-control"
              style={{
                opacity: this.state.opacity,
                transition: this.state.transition,
              }}
            >
              <StyledIcon
                className="volume-icon"
                src={this.state.volumeIcon}
                handleOnClick={this.toggleMute.bind(this)}
              />
              &nbsp;
              <div
                className="volume-slider"
                style={{
                  opacity: this.state.opacity,
                  transition: this.state.transition,
                }}
              >
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
          </div>
          <div
            className="audio-menu"
            style={{
              opacity: this.state.opacity,
              transition: this.state.transition,
            }}
          >
            {audioOptions}
          </div>
        </main>
      </div>
    )
  }
}

export default App
