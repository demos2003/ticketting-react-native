import * as React from "react";
import Svg, { Path } from "react-native-svg";


interface IconProps{
  ticketQuantity:any,
  maxTickets:any
}

const PlusIcon:React.FC<IconProps> = ({ticketQuantity, maxTickets}) => {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
    >
      <Path
        d="M24.455 12.177H13.936V1.657a.956.956 0 00-1.912 0v10.52H1.504a.956.956 0 00-.956.956.87.87 0 00.957.9h10.519v10.575a.956.956 0 001.912 0V14.09h10.52a.956.956 0 100-1.912z"
        fill={ticketQuantity === maxTickets ? "#979797" : "black"}
      />
    </Svg>
  );
}

export default PlusIcon;
