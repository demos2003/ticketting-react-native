import * as React from "react"
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg"

type props = {
    focused: boolean;
  };

const ExploreIcon = ({focused}: props) => {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"

    >
      <Path
        d="M22.188 2.533a3.414 3.414 0 00-3.274-.906l-9.756 2.44A4.54 4.54 0 005.844 7.38l-2.44 9.765a3.414 3.414 0 00.907 3.275 3.448 3.448 0 002.418 1.005c.28 0 .568-.03.847-.11l9.765-2.438a4.54 4.54 0 003.314-3.315l2.44-9.765a3.39 3.39 0 00-.907-3.265z"
        fill={focused ? "white" : "#CCC"}
      />
      <Path
        d="M13.16 15.245a3.862 3.862 0 100-7.724 3.862 3.862 0 000 7.724z"
        fill="#3F51B5"
      />
        {focused && (
                <View style={{marginTop:5}}>
                    <Circle cx={12.5} cy={23} r={2} fill="white" />
                </View>

            )}
    </Svg>
  )
}

export default ExploreIcon
