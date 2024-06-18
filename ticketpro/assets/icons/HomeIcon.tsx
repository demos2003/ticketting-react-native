import * as React from "react"
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg"

type props = {
    focused: boolean;
  };


const HomeIcon = ({focused}: props) => {
    return (
        <Svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"

        >
            <Path
                d="M20.625 7.27L14.892 3.26c-1.563-1.095-3.962-1.035-5.465.13L4.44 7.28c-.996.777-1.782 2.37-1.782 3.624v6.868c0 2.538 2.06 4.609 4.599 4.609h10.73a4.6 4.6 0 004.6-4.599v-6.749c0-1.344-.867-2.996-1.962-3.763z"
                fill={focused ? "#fff" : "#CCC"}
            />
            <Path
                d="M12.622 19.143a.752.752 0 01-.746-.746V15.41c0-.409.338-.747.746-.747s.747.338.747.747v2.986a.752.752 0 01-.747.747z"
                fill="#3F51B5"
            />
              {focused && (
            
                    <Circle cx={12.5} cy={26} r={2} fill="white" />
         

            )}
        </Svg>
    )
}

export default HomeIcon
