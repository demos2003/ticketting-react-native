import * as React from "react";
import Svg, { Path } from "react-native-svg";

const IncrementIcon = () => {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M9.768 5.935l6 7-6 7"
        stroke="#1E1E1E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IncrementIcon;
