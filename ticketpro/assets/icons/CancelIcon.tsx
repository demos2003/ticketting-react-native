import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CancelIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M11.817 21.663c5.438 0 9.847-4.408 9.847-9.846 0-5.439-4.409-9.847-9.847-9.847S1.97 6.378 1.97 11.817c0 5.438 4.409 9.846 9.847 9.846z"
        fill="#F4E3FF"
      />
      <Path
        d="M14.77 8.862L8.864 14.77M8.863 8.862l5.908 5.908"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CancelIcon;
