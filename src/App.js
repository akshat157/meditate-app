import React, { Component } from "react";
import Sound from "react-sound";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";

import SoundComponent from "./playSound";
import {
  StyledProgressBar,
  StyledSlider,
  StyledButton,
  BackgroundImage,
  StyledIcon,
} from "./components";

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
} from "./constants";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pbuttonUrl          : playButton,
      audioStatus         : Sound.status.STOPPED,
      timeValues          : [120, 300, 600, 900],
      audioNames          : ["Rain", "Forest", "Park", "Stream", "Waves"],
      seekCurrentPosition : 0,
      audioUrl            : rainAudio,
      bgImg               : rainImg,
      desiredTime         : 120,
      timeHovered         : false,
      audioHovered        : false,
      volume              : 100,
      mute                : false,
      volumeIcon          : loudVolumeIcon,

    }
  }

  timeSelect(x) {
    this.setState({
      desiredTime: x.duration,
    })
  }

  playPause() {
    if (this.state.pbuttonUrl === playButton) {
      this.setState({
        pbuttonUrl: pauseButton,
        audioStatus: Sound.status.PLAYING,
      })
    } else if (this.state.pbuttonUrl === pauseButton) {
      this.setState({
        pbuttonUrl: playButton,
        audioStatus: Sound.status.PAUSED,
      })
    }
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
    this.setState({ seekCurrentPosition: (pos / this.state.desiredTime) * 100 })

    if (Math.floor(pos) === this.state.desiredTime) {
      this.setState({
        pbuttonUrl: playButton,
        audioStatus: Sound.status.STOPPED,
      })
    }
  }

  handleTimeHover() {
    this.setState({
      timeHovered: !this.state.timeHovered
    });
  }

  handleAudioHover() {
    this.setState({
      audioHovered: !this.state.audioHovered
    });
  }

  volumeChange = (value) => {
    this.setState({
      volume: this.state.mute ? this.state.volume : value,
      volumeIcon: this.state.mute || value === 0 ? noVolumeIcon : value <= 50 ? quietVolumeIcon : loudVolumeIcon
    });
  }

  toggleMute() {
    this.setState({
      volumeIcon: !this.state.mute ? noVolumeIcon : this.state.volume <= 50 ? quietVolumeIcon : loudVolumeIcon,
      mute: !this.state.mute,
    });
  }

  render() {
    const timeOptions = this.state.timeValues.map((duration) => (
      <StyledButton
        key={duration}
        onMouseEnter={this.handleTimeHover.bind(this)}
        onMouseLeave={this.handleTimeHover.bind(this)}
        onClick={() => {
          this.timeSelect({ duration });
        }}
        isActive={
          !this.state.timeHovered && duration === this.state.desiredTime
        }
        buttonLabel={`${duration / 60} Minutes`}
      />
    ));

    const audioOptions = this.state.audioNames.map((audioName) => (
      <StyledButton
        key={audioName}
        onMouseEnter={this.handleAudioHover.bind(this)}
        onMouseLeave={this.handleAudioHover.bind(this)}
        onClick={() => {
          this.audioSelect({ audioName });
        }}
        isActive={
          !this.state.audioHovered &&
          this.state.audioUrl === "audio/" + audioName.toLowerCase() + ".mp3"
        }
        buttonLabel={audioName}
      />
    ));

    return (
      <div className='App'>
        <div className='bg-overlay'></div>
        <BackgroundImage currentImage={this.state.bgImg} />
        <div className='time-menu'>{timeOptions}</div>
        <div className='player-container'>
          <StyledIcon
            className='playPause'
            url={this.state.pbuttonUrl}
            alt='Play'
            handleOnClick={this.playPause.bind(this)}
          />

          <div className='volume-control'>
            <StyledIcon
              className='volume-icon'
              url={this.state.volumeIcon}
              handleOnClick={this.toggleMute.bind(this)}
            />
            &nbsp;
            <div className='volume-slider'>
              <StyledSlider
                id='slider'
                onChange={this.volumeChange}
                step={1}
                min={0}
                max={100}
                value={this.state.mute ? 0 : this.state.volume}
              />
            </div>
          </div>

          <div className='audioSeek'>
            <StyledProgressBar
              id='seek'
              percentage={this.state.seekCurrentPosition}
            />
          </div>

          <SoundComponent
            playStatus={this.state.audioStatus}
            url={this.state.audioUrl}
            funcPerc={this.moveSeek.bind(this)}
            desiredT={this.state.desiredTime}
            volume={this.state.mute ? 0 : this.state.volume}
          />
          <div className='timer'>00 : 00</div>
        </div>
        <div className='audio-menu'>{audioOptions}</div>
      </div>
    )
  }
}

export default App
