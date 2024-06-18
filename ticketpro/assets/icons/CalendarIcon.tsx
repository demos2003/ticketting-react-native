import * as React from "react"
import Svg, { Path } from "react-native-svg"

const CalendarIcon = () => {
  return (
    <Svg
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
    >
      <Path
        d="M4.503 6.29h1.144v1.144H4.503V6.29zm0 2.288h1.144V9.72H4.503V8.578zM6.79 6.29h1.143v1.144H6.791V6.29zm0 2.288h1.143V9.72H6.791V8.578zM9.078 6.29h1.144v1.144H9.078V6.29zm0 2.288h1.144V9.72H9.078V8.578z"
        fill="#CACACA"
      />
      <Path
        d="M3.36 12.58h8.006c.631 0 1.144-.513 1.144-1.144V3.429c0-.63-.513-1.144-1.144-1.144h-1.143V1.142H9.079v1.143H5.647V1.142H4.503v1.143H3.36c-.631 0-1.144.513-1.144 1.144v8.007c0 .63.513 1.144 1.144 1.144zm8.006-8.007v6.863H3.36V4.573h8.006z"
        fill="#CACACA"
      />
    </Svg>
  )
}

export default CalendarIcon
