import React from 'react'
import styles from './../App.module.css'

function BackgroundImage({ currentImage }) {
  const getClassName = (imgUrl) => {
    let className = styles.bg + ' '
    if (currentImage === imgUrl) {
      className += styles.activeBg
    }
    return className
  }

  return (
    <>
      <div
        className={getClassName('img/rain.jpg')}
        style={{ backgroundImage: `url("img/rain.jpg")` }}
      />
      <div
        className={getClassName('img/forest.jpg')}
        style={{ backgroundImage: `url(img/forest.jpg)` }}
      />
      <div
        className={getClassName('img/park.jpg')}
        style={{ backgroundImage: `url(img/park.jpg)` }}
      />
      <div
        className={getClassName('img/stream.jpg')}
        style={{ backgroundImage: `url(img/stream.jpg)` }}
      />
      <div
        className={getClassName('img/waves.jpg')}
        style={{ backgroundImage: `url(img/waves.jpg)` }}
      />
    </>
  )
}

export default BackgroundImage
