import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

function StyledSlider (props) {
    // Overall style
    const style  = { height: 20, padding: 0 }
    // The style used for handle. 
    const handleStyle = { display: "none" }
    // The style used for the track base color.
    const railStyle = { margin: 0, borderRadius: 0, height: 20, backgroundColor: '#ffffff', opacity: .2 }
    // The style used for track
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
