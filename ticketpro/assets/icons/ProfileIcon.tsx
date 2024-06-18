import * as React from "react"
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg"

type props = {
    focused: boolean;
  };

const ProfileIcon = ({focused}:props) => {
    return (
        <Svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
        >
            <Path
                d="M12.182 2.47a4.733 4.733 0 00-4.728 4.728c0 2.558 2 4.629 4.608 4.718a.8.8 0 01.22 0h.07a4.716 4.716 0 004.558-4.718 4.732 4.732 0 00-4.728-4.728zM17.238 14.563c-2.777-1.851-7.306-1.851-10.103 0-1.264.846-1.961 1.991-1.961 3.216 0 1.224.697 2.359 1.95 3.195 1.394.936 3.226 1.404 5.058 1.404 1.831 0 3.663-.468 5.056-1.404 1.255-.846 1.951-1.98 1.951-3.215-.01-1.225-.696-2.36-1.95-3.196z"
                fill={focused ? "white" :"#CCC"}
            />
              {focused && (
                <View style={{marginTop:5}}>
                    <Circle cx={12.5} cy={23} r={2} fill="white" />
                </View>

            )}
        </Svg>
    )
}

export default ProfileIcon
