import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import { View } from "react-native";

type props = {
    focused: boolean;
};

const Favourite = ({ focused }: props) => {
    return (
        <Svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"

        >
            <Path
                d="M12.292 21.383L10.85 20.09c-1.676-1.51-3.061-2.812-4.156-3.907-1.095-1.095-1.966-2.078-2.613-2.95-.647-.87-1.1-1.671-1.356-2.4a6.714 6.714 0 01-.386-2.24c0-1.56.522-2.862 1.568-3.907C4.95 3.64 6.253 3.117 7.813 3.117c.862 0 1.684.183 2.463.548.78.365 1.452.879 2.016 1.543a5.9 5.9 0 012.016-1.543c.78-.365 1.6-.548 2.463-.548 1.56 0 2.862.523 3.907 1.568 1.046 1.045 1.568 2.347 1.568 3.907 0 .763-.128 1.51-.385 2.24-.257.73-.71 1.53-1.357 2.4-.647.871-1.518 1.854-2.613 2.95-1.094 1.096-2.48 2.398-4.156 3.907l-1.443 1.294z"
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

export default Favourite;
