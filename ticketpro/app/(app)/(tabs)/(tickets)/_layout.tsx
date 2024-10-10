import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetTicketsByUserIdQuery } from '@/api/features/tickets/ticketSlice';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO, isBefore } from 'date-fns';
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

    console.log(id)

    // const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery(id);

    // const filterTickets = () => {
    //     if (!tickets) return { upcoming: [], previous: [] };

    //     const now = new Date();
    //     return tickets.reduce((acc: any, ticket: any) => {
    //         const eventDate = parseISO(`${ticket.event.startDate}T${ticket.event.startTime}`);
    //         if (isBefore(now, eventDate)) {
    //             acc.upcoming.push(ticket);
    //         } else {
    //             acc.previous.push(ticket);
    //         }
    //         return acc;
    //     }, { upcoming: [], previous: [] });
    // };

    // const { upcoming, previous } = filterTickets();

    // console.log("Upcoming tickets: " + JSON.stringify(upcoming, null, 2))
    // console.log("Previous tickets: " + JSON.stringify(previous, null, 2))


    return (
        <View style={styles.container}>
            <MaterialTopTabs
                // initialRouteName={upcoming.length > 0 ? 'upcoming' : 'previous'} // Set initial tab based on data
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
                    options={{ tabBarLabel: "Upcoming" }}
                    // initialParams={{ tickets: JSON.stringify(upcoming) }}
                    // listeners={{
                    //     tabPress: (e) => {
                    //         e.preventDefault();
                    //         router.setParams({ tickets: JSON.stringify(upcoming) });
                    //     },
                    // }}
                />

                <MaterialTopTabs.Screen
                    name="previous"
                    options={{ tabBarLabel: "Previous" }}
                    // initialParams={{ tickets: JSON.stringify(previous) }}
                    // listeners={{
                    //     tabPress: (e) => {
                    //         e.preventDefault();
                    //         router.setParams({ tickets: JSON.stringify(previous) });
                    //     },
                    // }}
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