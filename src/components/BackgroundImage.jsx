import React from 'react'
import styles from './../App.module.css'

const BackgroundImage = ({ currentImage }) => {
  const images = [
    'img/rain.jpg',
    'img/forest.jpg',
    'img/park.jpg',
    'img/stream.jpg',
    'img/waves.jpg',
  ]

  const getClassName = (imgUrl) => {
    return `${styles.bg} ${currentImage === imgUrl ? styles.activeBg : ''}`
  }

  return (
    <>
      {images.map((imgUrl) => (
        <div
          key={imgUrl}
          className={getClassName(imgUrl)}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      ))}
    </>
  )
}

export default BackgroundImage
