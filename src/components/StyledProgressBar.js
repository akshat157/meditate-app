import React from "react";
import CircularProgressbar from "react-circular-progressbar";

const progressBarStyle = {
  root: {},
  path: {
    stroke: "#0086ffcc",
    strokeLinecap: "butt",
    transition: "stroke-dashoffset 0.5s ease 0s",
  },
  trail: {
    stroke: "#ffffffcc",
  },
  text: {
    fill: "#f88",
    fontSize: "30px",
  },
};

function StyledProgressBar({ percentage, text, strokeWidth = 3 }) {
  return (
    <CircularProgressbar
      percentage={percentage}
      text={text}
      strokeWidth={strokeWidth}
      styles={progressBarStyle}
    />
  );
}
export default StyledProgressBar;
