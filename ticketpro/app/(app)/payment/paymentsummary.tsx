import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { router, useLocalSearchParams } from 'expo-router';
import LocationPinIcon from '@/assets/icons/LocationPinIcon';
import TimeIcon from '@/assets/icons/TimeIcon';
import { usePurchaseTicketMutation } from '@/api/features/tickets/ticketSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { formatArrayDateTime } from '@/utils/DateTimeFormater';
import { Alert } from 'react-native';

const PaymentSummary = () => {
    const params = useLocalSearchParams();
    const eventName = params.eventName as string;
    const eventLocation = params.eventLocation as string;
    const eventStartTime = params.eventStartTime as any;
    const eventEndTime = params.eventEndTime as any;
    const ticketType = params.ticketType as string;
    const quantity = parseInt(params.ticketQuantity as string, 10);
    const ticketPrice = parseFloat(params.ticketPrice as string);
    const eventDate = params.eventDate as any;
    const eventId = params.eventId as string;

    const totalPay = ticketPrice * quantity;

    const eventArrayStartTime = [
        new Date(eventStartTime).getFullYear() % 100,
        new Date(eventStartTime).getMonth() + 1,
        new Date(eventStartTime).getDate()
    ];


    const formattedStartDateTime = formatArrayDateTime(eventDate, eventArrayStartTime);
    console.log(eventDate)
    
    const formatTime = (timeArray: number[]): string => {
        const [hours, minutes] = timeArray;
        const date = new Date();
        date.setHours(hours, minutes, 0); // Set hours and minutes
        return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
    };
    
    

    const [purchaseTicket, { isLoading, error }] = usePurchaseTicketMutation();
    const [userId, setUserId] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                const firstName = await AsyncStorage.getItem('firstName');
                const lastName = await AsyncStorage.getItem('lastName');
                setUserId(id);
                setFullName(`${firstName || ''} ${lastName || ''}`);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchEmail = async () => {
            try {
               const userEmail = await AsyncStorage.getItem('email');

                setEmail(userEmail)
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchEmail();
    }, []);

 const handleTicketPurchase = async () => {
    try {
        const response = await purchaseTicket({ userId, ticketType, quantity, eventId }).unwrap();
        console.log('Raw Response:', response);

        // Check if response contains the success message directly
        if (response.message === "Tickets purchased successfully" || response.success === true) {
            router.push("/(app)/(tabs)/(tickets)/upcoming");
        } else {
            Alert.alert(
                "Purchase Failed", 
                response.data || "Unable to complete ticket purchase",
                [{ text: "OK" }]
            );
        }
    } catch (error:any) {
        console.error("Ticket Purchase Error:", error);
        
        Alert.alert(
            "Error", 
            error.message || "An unexpected error occurred",
            [{ text: "OK" }]
        );
    }
};

    const handlePaymentSuccess = (response: any) => {
        console.log('Payment response:', response);

        if (response.status === 'successful') {
            // After successful payment, handle ticket purchase
            handleTicketPurchase();
        } else {
            console.log('Payment failed or was cancelled');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.topNav}>
                    <BackNavIcon />
                    <Text style={styles.topNavText}>Order Summary</Text>
                </View>
                <View style={styles.orderCard}>
                    <Image source={require("../../../assets/images/eventdetailsbg.png")} style={styles.image} />
                    <View style={styles.orderDetails}>
                        <View style={styles.orderCardTop}>
                            <Text style={styles.summaryBody}>{eventName}</Text>
                            <View style={styles.margin2}>
                                <LocationPinIcon />
                                <Text style={styles.summaryHead2}>{eventLocation}</Text>
                            </View>
                            <View style={styles.margin2}>
                                <TimeIcon />
                                <Text style={styles.summaryHead2}>
                                {`${formattedStartDateTime.month} ${formattedStartDateTime.date}`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.orderCardMiddle}>
                            <Text style={styles.summaryHead}>{ticketType} Seat</Text>
                            <Text style={styles.summaryBody}>N{ticketPrice} x {quantity}</Text>
                            <Text style={styles.summaryHead}>Additional Fees</Text>
                            <Text style={styles.summaryBody}>nil</Text>
                        </View>
                        <Text style={styles.summaryHead}>Actual Pay</Text>
                        <Text style={styles.summaryBody}>N{totalPay}</Text>
                    </View>
                </View>
                <View style={{marginTop:100}}>
                    <PayWithFlutterwave
                        options={{
                            tx_ref: `txref-${Date.now()}`,
                            authorization: 'FLWPUBK_TEST-d3607d0bd52e91cab7e3bd2e8019e6fc-X',
                            amount: totalPay,
                            currency: 'NGN',
                            customer: {
                                email: email || "",
                                phonenumber: '09027795800',
                                name: fullName || 'Guest'
                            },
                            customizations: {
                                title: 'Flutterwave Developers',
                                description: `Payment for ${quantity} tickets to ${eventName}`,
                                logo: 'https://res.cloudinary.com/dalbpshky/image/upload/v1/folder_1/yh7e37qms9nftf39m5cf',
                            },
                        }}
                        onRedirect={handlePaymentSuccess}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PaymentSummary;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    innerContainer: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        marginTop: hp((35 / 812) * 100),
    },
    topNav: {
        flexDirection: "row",
        alignItems: "center",
        width: wp((215 / 370) * 100),
        justifyContent: "space-between"
    },
    topNavText: {
        color: "rgba(0, 0, 0, 1)",
        fontSize: 16,
        fontWeight: "600"
    },
    orderCard: {
        backgroundColor: "rgba(245, 245, 245, 1)",
        marginTop: hp((44 / 812) * 100),
        padding: 10,
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: 200
    },
    orderDetails: {
        marginTop: 20
    },
    summaryHead: {
        color: "rgba(119, 119, 119, 1)",
        fontSize: 15,
        fontWeight: "600"
    },
    summaryHead2: {
        color: "rgba(119, 119, 119, 1)",
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 5
    },
    summaryBody: {
        fontSize: 18,
        fontWeight: "500",
        color: "rgba(51, 51, 51, 1)"
    },
    orderCardTop: {
        borderStyle: 'dashed',
        borderBottomWidth: 2,
        borderColor: "gray"
    },
    margin: {
        marginBottom: 7
    },
    margin2: {
        marginBottom: 7,
        flexDirection: "row",
        alignItems: "center"
    },
    submitLink: {
        backgroundColor: "rgba(0, 140, 255, 1)",
        width: wp((315 / 370) * 100),
        height: hp((54 / 812) * 100),
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    submitLinkText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600"
    },
    orderCardMiddle: {
        borderBottomWidth: 1,
        borderColor: "gray",
        marginVertical: 10
    },
});
