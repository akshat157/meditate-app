import React, { Component } from 'react'
import StyledProgressbar from './StyledProgressbar'

import Sound from 'react-sound'
import SoundComponent from './playSound'
import StyledSlider from './StyledSlider';
import 'react-circular-progressbar/dist/styles.css'
import './App.css'
//import Webcam from 'react-webcam'
import Webcam from 'webcam-easy';

const playButton = 'svg/play.svg'
const pauseButton = 'svg/pause.svg'

const crystalBowlsAudio = 'audio/crystal-singing-bowl.mp3'
const birdsAudio = 'audio/birdies.mp3'
const thunderAudio = 'audio/thunder-storm.mp3'
const streamAudio = 'audio/stream.mp3'
const wavesAudio = 'audio/waves.mp3'
const trafficAudio = 'audio/traffic.mp3'

const loudVolumeIcon = "svg/volume-2.svg";
const quietVolumeIcon = "svg/volume-1.svg";
const noVolumeIcon = "svg/volume-x.svg";

const crystalImg = 'img/pale-red.jpg'
const birdsImg = 'img/pale-red.jpg'
const thunderImg = 'img/pale-red.jpg'
const streamImg = 'img/pale-red.jpg'
const wavesImg = 'img/pale-red.jpg'
const trafficImg = 'img/pale-red.jpg'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pbuttonUrl          : playButton,
      audioStatus         : Sound.status.STOPPED,
      timeValues          : [1200, 3000, 6000, 9000],
      audioNames          : ["Crystal Bowl", "Birds", "Thunderstorm", "Stream", "Waves", "Traffic"],
      seekCurrentPosition : 0,
      audioUrl            : wavesAudio,      // Default
      bgImg               : crystalImg,
      desiredTime         : 120,            // Default
      timeHovered         : false,
      audioHovered        : false,
      volume              : 50,            // Default
      mute                : false,          // Default
      volumeIcon          : loudVolumeIcon,
      currentTime         : 0,
      seconds             : 0 


    }

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);


  }

  timeSelect(x) {
    this.setState({
      desiredTime: x.duration,
    })
  }

  playPause() {
    console.log('plaPayse')
    console.log("seconds: " + this.state.seconds)
    if(this.state.seconds === 0){
      console.log("Starting Timer")
      this.startTimer()
    }

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
        audioUrl: birdsAudio,
        bgImg: birdsImg,
      })
    } else if (x === this.state.audioNames[2]) {
      this.setState({
        audioUrl: thunderAudio,
        bgImg: thunderImg,
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
    } else if (x === this.state.audioNames[5])  {
      this.setState({
        audioUrl: trafficAudio,
        bgImg: trafficImg,
      })
    } else {
      this.setState({
        audioUrl: crystalBowlsAudio,
        bgImg: crystalImg,
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

  startTimer() {
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
    webcam.start()
    .then(result =>{
      console.log("webcam started");
    })
    .catch(err => {
      console.log(err);
    });

    if (this.timer === 0) {
      this.timer = setInterval(() => {
        this.setState({seconds: this.state.seconds + 1})
        

        //  const image = webcam.snap();


        //console.log(image)
        const url = "https://localhost:5000/dilation"
        
        // fetch(url, {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //       'Content-Type': 'image/jpeg',
        //       'Access-Control-Allow-Origin': "*",
        //     },
        //     body: {
        //       image: JSON.stringify(image)
        //     }
        //   }
        // )
        // .then(response => response.json())
        // .then(data => console.log(data));


      }, 1000);
    }
  }

  // WebcamCapture() {
    

  //   const capture = React.useCallback(
  //     () => {
  //       const imageSrc = ;
  //     },
  //     [webcamRef]
  //   );
  // }

  render() {

    const timeOptions = this.state.timeValues.map((duration) =>
      <button key={duration} onMouseEnter={this.handleTimeHover.bind(this)} onMouseLeave={this.handleTimeHover.bind(this)} className={ !this.state.timeHovered && duration === this.state.desiredTime 
                                          ? "active" : "" } onClick={ () => {this.timeSelect({duration})} }>{duration/60} Minutes</button>
    );

    const audioOptions = this.state.audioNames.map((audioName) =>
      <button key={audioName} onMouseEnter={this.handleAudioHover.bind(this)} onMouseLeave={this.handleAudioHover.bind(this)} className={ !this.state.audioHovered && this.state.audioUrl === "audio/" + audioName.toLowerCase() + ".mp3" 
                                          ? "active" : "" } onClick={ () => {this.audioSelect({audioName})} }>{audioName}</button>
    );

    let text;
    if(this.state.seconds === 19){
      this.state.seconds = 0
      text = (<div className="breathe"><p>Breathe In</p></div>)
    }

    if(this.state.seconds < 19){
      text = (<div className="breathe"><p>Breathe Out</p></div>)
    }

    if(this.state.seconds < 11){
      text = (<div className="breathe"><p>Hold</p></div>)
    }

    if(this.state.seconds < 4){
      text = (<div className="breathe"><p>Breathe In</p></div>)
    }

    return (
      <div className="App">
        <div className="bg-overlay"></div>
        <div className="bg" style={{ backgroundImage: `url(${this.state.bgImg})` }} />
        <div className="time-menu">{timeOptions}</div>
        <div className="player-container">
          
          <video id="webcam" autoplay playsinline width="640" height="480"></video>
          <canvas id="canvas" class="d-none"></canvas>
          <audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio>
          {text}
          
          <img className="playPause" src={this.state.pbuttonUrl} alt="Play" onClick={(e) => { this.playPause() }} />
          
          <div className="volume-control">
            <img onClick={this.toggleMute.bind(this)} className="volume-icon" src={this.state.volumeIcon} alt="" />
            &nbsp;
            <div className="volume-slider">
              <StyledSlider id='slider'  onChange={this.volumeChange} step={1} min={0} max={100} value={this.state.mute ? 0 : this.state.volume} />
            </div>
          </div>

          <SoundComponent playStatus={this.state.audioStatus} url={this.state.audioUrl} funcPerc={this.moveSeek.bind(this)} desiredT={this.state.desiredTime} volume={this.state.mute ? 0 : this.state.volume} />
          
          

        </div>

        <div className="audio-menu">
          {audioOptions}
        </div>
      </div>
    )
  }
}

export default App
