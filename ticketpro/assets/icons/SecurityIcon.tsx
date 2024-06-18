import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SecurityIcon =() => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M13.75 8.75V5.625a3.75 3.75 0 10-7.5 0V8.75m-.625 9.375h8.75c1.036 0 1.875-.84 1.875-1.875v-5.625c0-1.036-.84-1.875-1.875-1.875h-8.75c-1.036 0-1.875.84-1.875 1.875v5.625c0 1.035.84 1.875 1.875 1.875z"
        stroke="#12001C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SecurityIcon
