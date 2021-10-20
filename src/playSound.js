import React, { Component } from 'react'
import Sound from 'react-sound'

class SoundComponent extends Component {
  constructor(props) {
    super(props)
    this.handleSongPlaying = this.handleSongPlaying.bind(this)
    this.reset = this.reset.bind(this)
    this.state = {
      position: 0,
      loopCount: 0,
    }
  }

  handleSongPlaying({ position, duration }) {
    this.setState({ position })

    var pos = position + this.state.loopCount * duration //loopCount to multiply for duration
    var min = Math.floor(pos / (1000 * 60))
    var sec = Math.floor((pos / 1000) % 60)

    min = ('0' + min).slice(-2)
    sec = ('0' + sec).slice(-2)

    this.setTimerValues(min, sec)
    this.props.funcPerc(pos / 1000)
  }

  reset() {
    this.setState({ position: 0 })
    this.setTimerValues('00', '00')
  }

  setTimerValues(min, sec) {
    const timerMin = document.getElementById('timer-min')
    const timerSec = document.getElementById('timer-sec')
    timerMin.innerHTML = `${min}`
    timerSec.innerHTML = `${sec}`
  }

  render() {
    return (
      <Sound
        url={this.props.url}
        playStatus={this.props.playStatus}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={() =>
          this.setState({ loopCount: this.state.loopCount + 1, position: 0 })
        }
        onStop={() => this.setState({ loopCount: 0, position: 0 })}
        position={this.state.position}
        volume={this.props.volume}
      />
    )
  }
}

export default SoundComponent
