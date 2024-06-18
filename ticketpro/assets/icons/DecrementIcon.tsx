import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DecrementIcon = () => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
    >
      <Path
        d="M15 5.935l-6 7 6 7"
        stroke="#979797"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DecrementIcon;
