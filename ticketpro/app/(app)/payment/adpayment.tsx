import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { TextInput } from 'react-native';
import { useBookAdMutation } from '@/api/features/ad/adSlice';
import { Alert } from 'react-native';

const AdPayment = () => {
    const params = useLocalSearchParams();
    const adSpaceId = params.adSpaceId;
    const quantity = params.adQuantity as any;
    const startDateTime = params.startDateTime as string;
    const endDateTime = params.endDateTime as string;
    const location = params.location;
    const adType = params.adType;
    const adSize = params.adSize;
    const adPrice = parseInt(params.adPrice as string);
    const [businessName, setBusinessName] = useState<string>('');
    const [adPurpose, setAdPurpose] = useState<string>('');

    const totalPay = quantity * adPrice;
    
    const [userId, setUserId] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>(null);

    const [bookAds, {isLoading, error}] = useBookAdMutation();

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
// Convert ISO string to Date object
const startDate1 = new Date(startDateTime);
const endDate1 = new Date(endDateTime);

// Format for display (e.g., MM/DD/YYYY HH:mm)
const readableStartDateTime = startDate1.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false, // Use 24-hour format
});

const readableEndDateTime = endDate1.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const startDate = startDate1.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
const endDate = endDate1.toISOString().slice(0, 16);

const handleAdPurchase = async () => {
    try {
        const response = await bookAds({ userId, adSpaceId, quantity, businessName, adPurpose, startDate, endDate }).unwrap();
             console.log('Raw Response:', response);
        
                // Check if response contains the success message directly
                if (response.message === "Ad booked successfully") {
                    router.push("/(app)/(tabs)/category");
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
            handleAdPurchase();
        } else {
            console.log('Payment failed or was cancelled');
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.innerContainer}>
                <View style={styles.topNav}>
                    <BackNavIcon />
                    <Text style={styles.topNavText}>Ad Payment Summary</Text>
                </View>

                <View style={{marginTop:50}}>
                    <Text style={{marginBottom:10}}>Fill in Ad information .</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Business Name"
                        value={businessName}
                        onChangeText={setBusinessName}
                        placeholderTextColor="#6C7275"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ad Purpose"
                        value={adPurpose}
                        onChangeText={setAdPurpose}
                        placeholderTextColor="#6C7275"
                    />

                </View>

                <View style={styles.orderCard}>
                    <View style={styles.orderDetails}>
                        <View style={styles.orderCardTop}>
                            <Text style={styles.summaryBody}>{adType}</Text>
                            <View style={styles.margin2}>
                                <Text>Ad Location:</Text>
                                <Text style={styles.summaryHead2}>{location}</Text>
                            </View>
                            <View style={styles.margin2}>
                                <Text>Ad Size:</Text>
                                <Text style={styles.summaryHead2}>{adSize}</Text>
                            </View>
                            <View style={styles.margin2}>
                                <Text>Ad Price per unit:</Text>
                                <Text style={styles.summaryHead2}>N{adPrice}</Text>
                            </View>
                            <View style={styles.margin2}>
                                <Text>Num of units booked:</Text>
                                <Text style={styles.summaryHead2}>{quantity}</Text>
                            </View>
                            <View style={styles.margin2}>
                                <Text>Ad Location:</Text>
                                <Text style={styles.summaryHead2}>{location}</Text>
                            </View>
                            <View style={styles.margin2}>
                               <Text>From:</Text>
                                <Text style={styles.summaryHead2}>
                                  
                                  {readableStartDateTime} - {readableEndDateTime}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.summaryHead}>Full Pay</Text>
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
                                description: `Payment for ${quantity} adSpaces at ${location}`,
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

export default AdPayment;

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
        marginTop: hp((2 / 812) * 100),
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
        // marginTop: 20
    },
    summaryHead: {
        color: "rgba(119, 119, 119, 1)",
        fontSize: 15,
        fontWeight: "600",
        marginTop:20
    },
    summaryHead2: {
        color: "rgba(119, 119, 119, 1)",
        fontSize: 13,
        fontWeight: "600",
        marginLeft: 5
    },
    summaryBody: {
        fontSize: 18,
        fontWeight: "500",
        color: "rgba(51, 51, 51, 1)",
        marginBottom:10
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
    input: {
        height: hp((61 / 812) * 100),
        borderColor: "rgba(203, 203, 203, 1)",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: wp((12 / 370) * 100),
        marginBottom: 20,
    },
});
