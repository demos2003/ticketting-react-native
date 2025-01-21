import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';



const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);


const TicketLayout = () => {
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                setId(userId);
            } catch (error) {
                console.error('Error fetching userId', error)
            }
        };
        fetchUserId();
    }, []);

    return (
        <View style={styles.container}>
            <MaterialTopTabs
             initialRouteName='upcoming'
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
                <MaterialTopTabs.Screen
                    name="upcoming"
                    options={{ title: "Upcoming", tabBarLabel:"Upcoming" }}
                />
               

                <MaterialTopTabs.Screen
                    name="previous"
                    options={{ title: "Previous", tabBarLabel:"Previous" }}
                />
            </MaterialTopTabs>
        </View>
    )
}

export default TicketLayout

const styles = StyleSheet.create({
    container: {
        paddingTop: hp((30 / 812) * 100),
        flex: 1,
        backgroundColor: "white"
    }
})