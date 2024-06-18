import * as React from "react"
import Svg, { Path } from "react-native-svg"

const LikeActive = () =>{
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
    >
      <Path
        d="M10 18a1.5 1.5 0 01-.844-.261c-3.684-2.5-5.279-4.216-6.159-5.288C1.122 10.166.225 7.821.25 5.28.28 2.368 2.615 0 5.457 0c2.066 0 3.497 1.164 4.33 2.133a.281.281 0 00.425 0C11.046 1.163 12.477 0 14.543 0c2.842 0 5.178 2.368 5.207 5.28.025 2.541-.873 4.887-2.747 7.172-.88 1.072-2.475 2.787-6.16 5.287A1.5 1.5 0 0110 18z"
        fill="#E91E63"
      />
    </Svg>
  )
}

export default LikeActive
