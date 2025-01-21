import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackNavIcon from '@/assets/icons/BackNavIcon';
import GreyTick from '@/assets/icons/GreyTick';
import CreditCard from '@/assets/icons/CreditCard';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import GreenCheck from '@/assets/icons/GreenCheck';
import { router } from 'expo-router';

const PaymentType = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innnerContainer}>
                <View style={styles.topNav}>
                    <BackNavIcon />
                    <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 16, fontWeight: "600" }}>Payment</Text>
                </View>
                <View style={{ marginTop: 35 }}>
                    <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 16, fontWeight: "600" }}>Select Payment type</Text>
                    <View>
                        <TouchableOpacity style={[styles.typeSelector, paymentMethod === "google" && styles.activeTypeSelector]} onPress={() => setPaymentMethod("google")}>
                            <View style={styles.row2}>
                                <GoogleIcon />
                                <Text style={{ marginLeft: 10 }}>Google Pay</Text>
                            </View>
                            {
                                paymentMethod === "google" ? (
                                    <GreenCheck />
                                ) : (
                                    <GreyTick />
                                )
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.typeSelector, paymentMethod === "card" && styles.activeTypeSelector]} onPress={() => setPaymentMethod("card")}>
                            <View style={styles.row2}>
                                <CreditCard />
                                <Text style={{ marginLeft: 10 }}>Card(VISA/Mastercard)</Text>
                            </View>
                            {
                                paymentMethod === "card" ? (
                                    <GreenCheck />
                                ) : (
                                    <GreyTick />
                                )
                            }

                        </TouchableOpacity>
                        {
                            paymentMethod === "card" ? (
                                <View>
                                    <View style={styles.emailInputContainer}>
                                        <View style={styles.containerLeft}>
                                            <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 10, fontWeight: "400" }}>Card Number</Text>
                                            <TextInput placeholder="0000 0000 0000 0000" />
                                        </View>
                                    </View>
                                    <View style={styles.dateContainer}>
                                        <View style={styles.emailInputContainer1}>
                                            <View style={styles.containerLeft}>
                                                <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 10, fontWeight: "400" }}>Card Expiry</Text>
                                                <TextInput placeholder="MM/YY" />
                                            </View>
                                        </View>
                                        <View style={styles.emailInputContainer1}>
                                            <View style={styles.containerLeft}>
                                                <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 10, fontWeight: "400" }}>CVV</Text>
                                                <TextInput placeholder="123" />
                                            </View>
                                        </View>

                                    </View>
                                </View>

                            ) : (
                                null
                            )
                        }


                        <View style={{ marginTop: 38 }}>
                            <Text>Coupon Code</Text>
                            <View style={styles.couponInput}>
                                <TextInput
                                    placeholder='#######'
                                />
                                <TouchableOpacity style={styles.applyBtn}>
                                    <Text style={{ color: "white" }}>Apply</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.submitLink} onPress={() => router.push("/payment/paymentsummary")}>
                    <Text style={{ color: "white" }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PaymentType

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    innnerContainer: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        marginTop: hp((35 / 812) * 100),
    },
    topNav: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: wp((186 / 370) * 100),

        justifyContent: "space-between"
    },
    typeSelector: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "rgba(203, 203, 203, 1)",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
        justifyContent: "space-between",
        height: 61,
        borderRadius: 5
    },
    activeTypeSelector: {
        borderWidth: 1,
        borderColor: "rgba(63, 81, 181, 1)",
    },
    couponInput: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "rgba(203, 203, 203, 1)",
        display: "flex",
        flexDirection: "row",
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: "center",
        justifyContent: "space-between",
        height: 61,
        borderRadius: 5

    },
    row2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    applyBtn: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        height: 29,
        width: 93,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    emailInputContainer: {
        height: hp((61 / 812) * 100),
        borderRadius: 5,
        paddingHorizontal: wp((12 / 370) * 100),
        borderColor: "rgba(203, 203, 203, 1)",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,

    },
    containerLeft: {
        width: "90%"
    },
    dateContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    emailInputContainer1: {
        height: hp((61 / 812) * 100),
        borderRadius: 5,
        paddingHorizontal: wp((12 / 370) * 100),
        borderColor: "rgba(203, 203, 203, 1)",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        width: "48%"

    },
    submitLink: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        marginTop: hp((60 / 812) * 100),
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    }
})