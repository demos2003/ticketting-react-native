import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const AshjoryLogo2 = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"

    >
      <G clipPath="url(#clip0_410_2177)" filter="url(#filter0_b_410_2177)">
        <Path fill="#3F51B5" d="M0 0H24V24H0z" />
        <Path fill="#FF9800" d="M0 0H12V12H0z" />
        <Path fill="#4CAF50" d="M12 0H24V12H12z" />
        <Path fill="#E91E63" d="M12 12H24V24H12z" />
      </G>
      <Defs>
        <ClipPath id="clip0_410_2177">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default AshjoryLogo2
