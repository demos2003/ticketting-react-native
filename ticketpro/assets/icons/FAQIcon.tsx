import * as React from "react"
import Svg, { Path } from "react-native-svg"

const FAQIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"

    >
      <Path
        d="M8.232 6.266c.977-.855 2.56-.855 3.536 0 .976.854.976 2.239 0 3.093-.17.149-.358.272-.559.369-.621.3-1.209.832-1.209 1.522v.625M17.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zM10 14.375h.006v.006H10v-.006z"
        stroke="#12001C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FAQIcon
