import React, { Component } from 'react';
// import logo from './logo.svg';
import StyledProgressbar from './StyledProgressbar';
import Sound from 'react-sound';
import SoundComponent from './playSound';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

const ESCAPE_KEY = 27;

const playButton = 'svg/play.svg';
const pauseButton = 'svg/pause.svg';

const rainAudio = 'audio/rain.mp3';
const forestAudio = 'audio/forest.mp3';
const parkAudio = 'audio/park.mp3';
const streamAudio = 'audio/stream.mp3';
const wavesAudio = 'audio/waves.mp3';

const rainImg = 'img/rain.jpg';
const forestImg = 'img/forest.jpg';
const parkImg = 'img/park.jpg';
const streamImg = 'img/stream.jpg';
const wavesImg = 'img/waves.jpg';

class App extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      pbuttonUrl          : playButton,
      audioStatus         : Sound.status.STOPPED,
      timeValues          : [120, 300, 600, 900],
      audioNames          : ["Rain", "Forest", "Park", "Stream", "Waves"],
      seekCurrentPosition : 0,
      audioUrl            : rainAudio,  // Default
      bgImg               : rainImg,
      desiredTime         : 120,        // Default
      immersiveMode       : false       // Default
    }
  }

  timeSelect(x) {
    this.setState({
      desiredTime : x.duration
    });
  }

  playPause() {
    console.log('plaPayse');
    if (this.state.pbuttonUrl === playButton) {
      this.setState({
        pbuttonUrl  : pauseButton,
        audioStatus : Sound.status.PLAYING
      });
    }else if (this.state.pbuttonUrl === pauseButton){
      this.setState({
        pbuttonUrl : playButton,
        audioStatus: Sound.status.PAUSED
      });
    }
  }

  audioSelect(name) {
    var x = JSON.stringify(name.audioName).replace(/["]+/g, '');

    if (x === this.state.audioNames[1]){
      this.setState({
        audioUrl  : forestAudio,
        bgImg     : forestImg
      });
    }else if (x === this.state.audioNames[2]) {
      this.setState({
        audioUrl  : parkAudio,
        bgImg     : parkImg
      });
    }else if (x === this.state.audioNames[3]) {
      this.setState({
        audioUrl  : streamAudio,
        bgImg     : streamImg
      });
    }else if (x === this.state.audioNames[4]) {
      this.setState({
        audioUrl  : wavesAudio,
        bgImg     : wavesImg
      });
    }else {
      this.setState({
        audioUrl  : rainAudio,
        bgImg     : rainImg
      });
    }
  }

  moveSeek(pos) {
    this.setState({seekCurrentPosition : ((pos)/this.state.desiredTime)*100});
    
    if (Math.floor(pos) === this.state.desiredTime) {
      this.setState({audioStatus : Sound.status.STOPPED});
    }
    
  }

  toggleImmersive(){
    this.setState({immersiveMode : !this.state.immersiveMode});
  }

  _handleKeyDown = (event) => {
    switch( event.keyCode ) {
      case ESCAPE_KEY:
        this.toggleImmersive();
        break;
      default:
        break;
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown);
  }

  render() {
    console.log(this.state.timeBtnClass);
    const timeOptions = this.state.timeValues.map((duration) =>
      <button key={duration} onClick={ () => {this.timeSelect({duration})} }>{duration/60} Minutes</button>
    );

    const audioOptions = this.state.audioNames.map((audioName) =>
      <button key={audioName} onClick={ () => {this.audioSelect({audioName})} }>{audioName}</button>
    );

    return (
      <div className="App">
        <div className="bg-overlay"></div>
        <div className="bg">
          <img src={this.state.bgImg} alt=""/>
        </div>
        <div className={"time-menu " + (this.state.immersiveMode ? "immersive" : "")}>
          {timeOptions}
        </div>
        <div className={"player-container " + (this.state.immersiveMode ? "immersive" : "")}>
          <img className="playPause" src={this.state.pbuttonUrl} alt="Play" onClick={ (e) => {this.playPause()} }/>
        <div className="audioSeek">
          <StyledProgressbar id='seek' percentage={this.state.seekCurrentPosition} />
        </div>

        <SoundComponent playStatus={this.state.audioStatus} url={this.state.audioUrl} funcPerc={this.moveSeek.bind(this)} desiredT={this.state.desiredTime} />
        <div className="timer">00 : 00</div>
        </div>
        
        <div className={"audio-menu " + (this.state.immersiveMode ? "immersive" : "")}>
          {audioOptions}
        </div>
      </div>
    );
  }
}

export default App;
