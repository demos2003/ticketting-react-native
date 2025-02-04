import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TermsIcon = () => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"

    >
      <Path
        d="M7.5 10h3.125M7.5 12.5h3.125M7.5 15h3.125m2.5.625H15c1.035 0 1.875-.84 1.875-1.875V5.09c0-.946-.704-1.748-1.647-1.826a40.298 40.298 0 00-.936-.067m-4.834 0c-.054.175-.083.36-.083.553 0 .345.28.625.625.625h3.75c.345 0 .625-.28.625-.625 0-.193-.029-.378-.083-.553m-4.834 0a1.876 1.876 0 011.792-1.322h1.25c.843 0 1.556.556 1.792 1.322m-4.834 0c-.313.018-.625.04-.936.067-.943.078-1.647.88-1.647 1.826v1.785m0 0H4.062a.937.937 0 00-.937.938v9.375c0 .517.42.937.938.937h8.125c.517 0 .937-.42.937-.938V7.813a.937.937 0 00-.938-.937H6.875zM5.625 10h.006v.006h-.006V10zm0 2.5h.006v.006h-.006V12.5zm0 2.5h.006v.006h-.006V15z"
        stroke="#12001C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default TermsIcon
