import React from "react";

const Play = ({ currentProgress, opacity }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <defs>
        <clipPath id="clip-play">
          <rect width="512" height="512" />
        </clipPath>
      </defs>
      <g id="play" clipPath="url(#clip-play)">
        <path
          id="Path_1"
          data-name="Path 1"
          d="M371.7,238l-176-107c-15.8-8.8-35.7,2.5-35.7,21V360c0,18.4,19.8,29.8,35.7,21l176-101C388.1,270.9,388.1,247.2,371.7,238ZM504,256C504,119,393,8,256,8S8,119,8,256,119,504,256,504,504,393,504,256ZM56,256A200,200,0,1,1,256,456,199.945,199.945,0,0,1,56,256Z"
          fill="white"
          opacity={opacity}
        />
      </g>
      <circle
        className="circle-progress"
        cx="248"
        cy="248"
        r="224"
        fill="none"
        stroke="orange"
        strokeWidth="48"
        transform="translate(8 8)"
        strokeDasharray="1407"
        strokeDashoffset={1407 * (1 - currentProgress)}
      />
    </svg>
  );
};

export default React.memo(Play);
