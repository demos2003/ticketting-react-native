import * as React from "react"
import Svg, { Path } from "react-native-svg"

const LikedInactive = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
     
    >
      <Path
        d="M16.543 3.75c-3.043 0-4.543 3-4.543 3s-1.5-3-4.543-3C4.984 3.75 3.025 5.82 3 8.288c-.052 5.125 4.065 8.77 8.578 11.832a.75.75 0 00.844 0c4.512-3.063 8.63-6.707 8.578-11.832-.025-2.469-1.984-4.538-4.457-4.538z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LikedInactive
