import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface IconProps{
  ticketQuantity:any
}


const MinusIcon:React.FC<IconProps> = ({ticketQuantity}) => {
  return (
    <Svg
      width={31}
      height={4}
      viewBox="0 0 31 4"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.59 3.28H.755V.985H30.59V3.28z"
        fill={ticketQuantity === 1 ? "#979797" : "black"}
      />
    </Svg>
  );
}

export default MinusIcon;
