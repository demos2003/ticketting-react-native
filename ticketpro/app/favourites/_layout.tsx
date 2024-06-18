
import BackNavIcon from '@/assets/icons/BackNavIcon';
import LikeActive from '@/assets/icons/LikeActive';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { Navigator } = createMaterialTopTabNavigator();


export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);


const FavouriteLayout = () => {
    return (
        <View style={styles.container}>
            <View style={styles.innnerContainer}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
                    <BackNavIcon />
                    <LikeActive />
                </View>
                <ImageBackground source={require("../../assets/images/favouritesbg.png")} style={styles.imageBg}>
                    <Text style={styles.eventName}>XYZ BAND</Text>
                    <Text style={styles.eventDate}>x event found</Text>
                </ImageBackground>

           
                    <MaterialTopTabs
                        screenOptions={{
                            tabBarLabelStyle: { textTransform: "none", fontSize: 16, fontWeight: "600" },
                            tabBarActiveTintColor: "rgba(63, 81, 181, 1)",
                            tabBarInactiveTintColor: "#6C7275",
                            tabBarStyle: {
                                borderWidth: 0,
                                borderBottomWidth: 0,
                                shadowOffset: { width: 0, height: 0 },
                                elevation: 0,
                                height: 45
                            },
                            tabBarIndicatorStyle: {
                                width: "30%",
                                display: "flex",
                                alignSelf: "center",
                                marginLeft: "10%",
                                backgroundColor: "rgba(63, 81, 181, 1)",
                            },
                        }}
                    >
                        <MaterialTopTabs.Screen name='upcoming'
                            options={{ tabBarLabel: "Upcoming" }}
                        />
                        <MaterialTopTabs.Screen name='nearby' options={{
                            tabBarLabel: "Nearby"
                        }}
                        />
                    </MaterialTopTabs>
               
            </View>
        </View>

    )

}

export default FavouriteLayout


const styles = StyleSheet.create({
    container: {
        paddingTop: hp((30 / 812) * 100),
        backgroundColor: "white",
        flex: 1,
    },
    innnerContainer: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        marginTop: hp((29 / 812) * 100),
        flex:1,
        
       
    },
    imageBg: {
        height: hp((179 / 812) * 100),
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: wp((14 / 370) * 100),
        paddingRight: wp((14 / 370) * 100),
        marginBottom: hp((15 / 812) * 100),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    eventName: {
        color: "white",
        fontSize: 21.14,
        fontWeight: "700"
    },
    eventDate: {
        color: "white",
        fontSize: 12.48,
        fontWeight: "700"
    }
})

