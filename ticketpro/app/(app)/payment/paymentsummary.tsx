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

const PaymentSummary = () => {
    const params = useLocalSearchParams();
    const eventName = params.eventName as string;
    const eventLocation = params.eventLocation as string;
    const eventStartTime = params.eventStartTime as string;
    const eventEndTime = params.eventEndTime as string;
    const ticketType = params.ticketType as string;
    const quantity = parseInt(params.ticketQuantity as string, 10);
    const ticketPrice = parseFloat(params.ticketPrice as string);
    const eventDate = params.eventDate as string;
    const eventId = params.eventId as string;

    const totalPay = ticketPrice * quantity;

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString: string): string => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes);
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
            console.log(response);
            router.replace("/ticket/ticket");
        } catch (error) {
            console.log(error);
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
                                    {formatDate(eventDate)}, {formatTime(eventStartTime)} - {formatTime(eventEndTime)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.orderCardMiddle}>
                            <Text style={styles.summaryHead}>{ticketType} Seat</Text>
                            <Text style={styles.summaryBody}>${ticketPrice} x {quantity}</Text>
                            <Text style={styles.summaryHead}>Additional Fees</Text>
                            <Text style={styles.summaryBody}>nil</Text>
                        </View>
                        <Text style={styles.summaryHead}>Actual Pay</Text>
                        <Text style={styles.summaryBody}>${totalPay}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.submitLink, isLoading && { opacity: 0.5 }]}
                    onPress={handleTicketPurchase}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.submitLinkText}>Continue</Text>
                    )}
                </TouchableOpacity>
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
                onRedirect={(response) => {

                    console.log('Payment response:', response);
                  }}
                
                />
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
    orderCardMiddle: {
        borderBottomWidth: 1,
        borderColor: "gray",
        marginVertical: 10
    },
    submitLink: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        marginTop: hp((150 / 812) * 100),
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    submitLinkText: {
        color: "white"
    }
});
