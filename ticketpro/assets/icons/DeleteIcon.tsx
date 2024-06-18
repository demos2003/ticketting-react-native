import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DeleteIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"

    >
      <Path
        d="M12.284 7.5l-.289 7.5m-3.99 0l-.289-7.5m8.307-2.675c.285.044.569.09.852.139m-.852-.139l-.89 11.569a1.875 1.875 0 01-1.87 1.731H6.737c-.98 0-1.794-.754-1.87-1.731L3.978 4.825m12.046 0a40.087 40.087 0 00-2.898-.33m-10 .469c.283-.05.567-.095.852-.139m0 0a40.093 40.093 0 012.898-.33m6.25 0v-.763c0-.983-.759-1.803-1.741-1.835a43.272 43.272 0 00-2.768 0c-.982.032-1.741.852-1.741 1.835v.763m6.25 0a40.554 40.554 0 00-6.25 0"
        stroke="#FB1803"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DeleteIcon
