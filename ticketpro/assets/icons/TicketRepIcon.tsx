import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TicketRepIcon = () => {
  return (
    <Svg
      width={42}
      height={34}
      viewBox="0 0 42 34"
      fill="none"
    >
      <Path
        d="M28.662 26.97l-7.335-4.714-7.337 4.713 2.214-8.442-6.742-5.492 8.709-.533 3.155-8.073 3.156 8.073 8.709.533-6.742 5.492m11.27-1.394a4.098 4.098 0 014.099-4.098V4.84A4.098 4.098 0 0037.72.74H4.933A4.098 4.098 0 00.835 4.84v8.196a4.098 4.098 0 010 8.197v8.196a4.098 4.098 0 004.098 4.099H37.72a4.099 4.099 0 004.098-4.099v-8.196a4.099 4.099 0 01-4.098-4.099z"
        fill="#E91E63"
      />
    </Svg>
  );
}

export default TicketRepIcon;
