import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BackNavIcon = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"

    >
      <Path
        d="M12 9.06V6.5a1 1 0 00-1.707-.708L4 12l6.293 6.207A1 1 0 0012 17.5v-2.489c2.75.068 5.755.566 8 3.99v-1c0-4.634-3.5-8.444-8-8.942z"
        fill="#000"
      />
    </Svg>
  )
}

export default BackNavIcon