import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SignOutIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M13.125 7.5V4.375c0-1.036-.84-1.875-1.875-1.875h-5c-1.036 0-1.875.84-1.875 1.875v11.25c0 1.035.84 1.875 1.875 1.875h5c1.036 0 1.875-.84 1.875-1.875V12.5m2.5 0l2.5-2.5m0 0l-2.5-2.5m2.5 2.5H7.5"
        stroke="#FB1803"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SignOutIcon
