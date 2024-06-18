import * as React from "react"
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

type props = {
    focused: boolean;
  };

const TicketIcon = ({focused}: props) => {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
   
    >
      <Path
        d="M15.966 17.202l-3.564-2.29-3.564 2.29 1.075-4.1-3.275-2.669 4.231-.258 1.533-3.922 1.533 3.922 4.23.258-3.274 2.668m5.474-.677a1.99 1.99 0 011.991-1.99V6.451a1.991 1.991 0 00-1.99-1.991H4.438a1.99 1.99 0 00-1.991 1.99v3.982a1.991 1.991 0 010 3.982v3.982a1.99 1.99 0 001.99 1.99h15.927a1.99 1.99 0 001.991-1.99v-3.982a1.99 1.99 0 01-1.99-1.99z"
        fill={focused ? "white" : "#CCC"}
        
      />
        {focused && (
                <View style={{marginTop:5}}>
                    <Circle cx={12.5} cy={23} r={2} fill="white" />
                </View>

            )}
    </Svg>
  )
}

export default TicketIcon
