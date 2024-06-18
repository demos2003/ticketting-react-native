import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EyeClosed() {
  return (
    <Svg
      width={20}
      height={17}
      viewBox="0 0 20 17"
      fill="none"
     
    >
      <Path
        d="M1.933 10.568A4.36 4.36 0 011 8.66c0-1 4-6 9-6m7.6 3.8a5.07 5.07 0 011.4 2.2c0 1-3 6-9 6-.314 0-.62-.013-.918-.04M3 15.66l14-14m-4 7a3 3 0 11-6 0 3 3 0 016 0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default EyeClosed
