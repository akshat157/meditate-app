import React, { Component } from 'react'
// import logo from './logo.svg';
import StyledProgressbar from './StyledProgressbar'
import Sound from 'react-sound'
import SoundComponent from './playSound'
import StyledSlider from './StyledSlider';
import 'react-circular-progressbar/dist/styles.css'
import './App.css'

const playButton = 'svg/play.svg'
const pauseButton = 'svg/pause.svg'

const rainAudio = 'audio/rain.mp3'
const forestAudio = 'audio/forest.mp3'
const parkAudio = 'audio/park.mp3'
const streamAudio = 'audio/stream.mp3'
const wavesAudio = 'audio/waves.mp3'

const loudVolumeIcon = "svg/volume-2.svg";
const quietVolumeIcon = "svg/volume-1.svg";
const noVolumeIcon = "svg/volume-x.svg";

const rainImg = 'img/rain.jpg'
const forestImg = 'img/forest.jpg'
const parkImg = 'img/park.jpg'
const streamImg = 'img/stream.jpg'
const wavesImg = 'img/waves.jpg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pbuttonUrl          : playButton,
      audioStatus         : Sound.status.STOPPED,
      timeValues          : [120, 300, 600, 900],
      audioNames          : ["Rain", "Forest", "Park", "Stream", "Waves"],
      seekCurrentPosition : 0,
      audioUrl            : rainAudio,      // Default
      bgImg               : rainImg,
      desiredTime         : 120,            // Default
      timeHovered         : false,
      audioHovered        : false,
      volume              : 100,            // Default
      mute                : false,          // Default
      volumeIcon          : loudVolumeIcon,

    }
  }

  timeSelect(x) {
    this.setState({
      desiredTime: x.duration,
    })
  }

  playPause() {
    console.log('plaPayse')
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

    console.log(this.state.timeBtnClass);
    const timeOptions = this.state.timeValues.map((duration) =>
      <button key={duration} onMouseEnter={this.handleTimeHover.bind(this)} onMouseLeave={this.handleTimeHover.bind(this)} className={ !this.state.timeHovered && duration === this.state.desiredTime 
                                          ? "active" : "" } onClick={ () => {this.timeSelect({duration})} }>{duration/60} Minutes</button>
    );

    const audioOptions = this.state.audioNames.map((audioName) =>
      <button key={audioName} onMouseEnter={this.handleAudioHover.bind(this)} onMouseLeave={this.handleAudioHover.bind(this)} className={ !this.state.audioHovered && this.state.audioUrl === "audio/" + audioName.toLowerCase() + ".mp3" 
                                          ? "active" : "" } onClick={ () => {this.audioSelect({audioName})} }>{audioName}</button>
    );

    return (
      <div className="App">
        <div className="bg-overlay"></div>
        <div className="bg" style={{ backgroundImage: `url(${this.state.bgImg})` }} />
        <div className="time-menu">{timeOptions}</div>
        <div className="player-container">
          <img className="playPause" src={this.state.pbuttonUrl} alt="Play" onClick={(e) => { this.playPause() }} />

          <div className="volume-control">
            <img onClick={this.toggleMute.bind(this)} className="volume-icon" src={this.state.volumeIcon} alt="" />
            &nbsp;
            <div className="volume-slider">
              <StyledSlider id='slider'  onChange={this.volumeChange} step={1} min={0} max={100} value={this.state.mute ? 0 : this.state.volume} />
            </div>
          </div>

          <div className="audioSeek">
            <StyledProgressbar id='seek' percentage={this.state.seekCurrentPosition} />
          </div>

          <SoundComponent playStatus={this.state.audioStatus} url={this.state.audioUrl} funcPerc={this.moveSeek.bind(this)} desiredT={this.state.desiredTime} volume={this.state.mute ? 0 : this.state.volume} />
          <div className="timer">00 : 00</div>
        </div>

        <div className="audio-menu">
          {audioOptions}
        </div>
      </div>
    )
  }
}

export default App
