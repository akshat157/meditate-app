import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

function StyledSlider (props) {
    const style  = { height: 20, padding: 0 }
    const handleStyle = { display: "none" }
    const railStyle = { margin: 0, borderRadius: 0, height: 20, backgroundColor: '#ffffff', opacity: .2 }
    const trackStyle = { borderRadius: 0, height: 20, backgroundColor: '#ffffff' }
    return (
        <Slider
            style={style}
            handleStyle={handleStyle}
            railStyle={railStyle}
            trackStyle={trackStyle}
            {...props} />
    )
}

export default StyledSlider
