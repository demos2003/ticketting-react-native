import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CreditCard = () => {
  return (
    <Svg
      width={23}
      height={18}
      viewBox="0 0 23 18"
      fill="none"
    >
      <Path
        d="M.49 14.86a2.734 2.734 0 002.734 2.734H19.63a2.734 2.734 0 002.735-2.735V7.34H.49v7.52zm3.222-3.712a1.465 1.465 0 011.465-1.464h2.344a1.465 1.465 0 011.465 1.464v.977A1.465 1.465 0 017.52 13.59H5.177a1.465 1.465 0 01-1.465-1.465v-.977zM19.63.406H3.224A2.734 2.734 0 00.49 3.141v1.27h21.875V3.14A2.734 2.734 0 0019.63.406z"
        fill="#1E1E1E"
      />
    </Svg>
  );
}

export default CreditCard;
