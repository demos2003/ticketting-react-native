import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { router } from 'expo-router';
import LocationPinIcon from '@/assets/icons/LocationPinIcon';
import TimeIcon from '@/assets/icons/TimeIcon';

const paymentsummary = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innnerContainer}>
                <View style={styles.topNav}>
                    <BackNavIcon />
                    <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 16, fontWeight: "600" }}>Order Summary</Text>
                </View>
                <View style={styles.orderCard}>
                    <View >
                        <Image source={require("../../assets/images/eventdetailsbg.png")} style={{ width: "100%", height: 200 }} />
                    </View>
                    <View style={{ marginTop: 20 }}>

                        <View style={styles.orderCardTop}>
                            <View style={styles.margin}>
                                <Text style={styles.summaryBody}>Manchester United vs Kano Pillars</Text>
                            </View>
                            <View style={styles.margin2}>
                                <LocationPinIcon/>
                                <Text style={styles.summaryHead2}>XXI Ambarukmo Plaza,Studio 1</Text>
                            </View >
                            <View style={styles.margin2}>
                                <TimeIcon/>
                                <Text style={styles.summaryHead2}>Wednesday, 20 Nov 2019, 15:05</Text>
                            </View>
                        </View>
                        <View style={styles.orderCardMiddle}>

                        <View style={styles.margin}>
                            <Text style={styles.summaryHead}>Order Number</Text>
                            <Text style={styles.summaryBody}>1198804794001625088</Text>
                        </View>
                        <View style={styles.margin}>
                            <Text style={styles.summaryHead}>Regular Seat</Text>
                            <Text style={styles.summaryBody}>$10.00 x 1</Text>
                        </View>
                        <View style={styles.margin}>
                            <Text style={styles.summaryHead}>Additional Fees</Text>
                            <Text style={styles.summaryBody}>$3.99</Text>
                        </View>
                    </View>
                    </View>
                    <View style={styles.margin}>
                        <Text style={styles.summaryHead}>Actual Pay</Text>
                        <Text style={styles.summaryBody}>$13.99</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.submitLink} onPress={() => router.push("payment/paymentsummary")}>
                    <Text style={{ color: "white" }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default paymentsummary

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
        width: wp((215 / 370) * 100),
        justifyContent: "space-between"
    },
    orderCard: {
        backgroundColor: "rgba(245, 245, 245, 1)",
        marginTop: hp((44 / 812) * 100),
        padding: 10,
        borderRadius:5,
        borderColor:"gray",
        borderWidth:1,
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
        marginLeft:5
    },
    summaryBody: {
        fontSize: 18,
        fontWeight: "500",
        color: "rgba(51, 51, 51, 1)"
    },
    orderCardTop:{
        borderStyle:'dashed',
        borderBottomWidth:2,
        borderColor:"gray"
    },
    margin:{
        marginBottom:7
    },
    margin2:{
        marginBottom:7,
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    orderCardMiddle:{
        borderBottomWidth:1,
        borderColor:"gray",
        marginVertical:10

    },
    submitLink: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        marginTop: hp((40 / 812) * 100),
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    }
})