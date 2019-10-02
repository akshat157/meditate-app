import React, { Component } from 'react'
import Sound from 'react-sound'

class SoundComponent extends Component {
  constructor(props) {
    super(props)
    this.handleSongPlaying = this.handleSongPlaying.bind(this)
    this.state = {
      position: 0,
      loopCount: 0,
    }
  }

  handleSongPlaying({ position, duration }) {
    this.setState({ position })

    var pos = position + this.state.loopCount * duration //loopCount to multiply for duration
    const timer = document.querySelector('.timer')
    var min = Math.floor(pos / (1000 * 60))
    var sec = Math.floor((pos / 1000) % 60)

    min = ('0' + min).slice(-2)
    sec = ('0' + sec).slice(-2)

    timer.innerHTML = `${min} : ${sec}`
    this.props.funcPerc(pos / 1000)

    console.log(Math.floor(pos / 1000) + ', ' + this.props.desiredT)
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
