import React, { Component } from 'react';
import Sound from 'react-sound';

class SoundComponent extends Component {

  constructor(props) {
    super(props);
    this.handleSongPlaying = this.handleSongPlaying.bind(this);
  }

  handleSongPlaying(obj) {
    var pos = obj.position;
    const timer = document.querySelector('.timer');
    var min = Math.floor(pos/(1000*60));
    var sec = Math.floor(pos/(1000)%60);
    
    min = ("0" + min).slice(-2);
    sec = ("0" + sec).slice(-2);
    
    timer.innerHTML = `${min} : ${sec}`;
    this.props.funcPerc(pos/1000);
    
    console.log(Math.floor(pos/1000)+", "+this.props.desiredT);
  }

  render() {
    return (
      <Sound
        url={this.props.url}
        playStatus={this.props.playStatus}
        // playFromPosition={0 /* in milliseconds */}
        // onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        // onFinishedPlaying={this.handleSongFinishedPlaying}
        volume={this.props.volume}
      />
    );
  }
}

export default SoundComponent;