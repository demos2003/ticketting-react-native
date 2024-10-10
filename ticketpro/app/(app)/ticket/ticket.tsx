import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LocationPinIcon from '@/assets/icons/LocationPinIcon';
import BarCode from '@/assets/icons/BarCode';
import BackNavIcon from '@/assets/icons/BackNavIcon';

const Ticket = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innnerContainer}>
            <View style={styles.topNav}>
                    <BackNavIcon />
                    <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 16, fontWeight: "600" }}>Your Ticket</Text>
                </View>
                <View style={styles.ticketContainer}>
                    <View style={{borderTopLeftRadius:10, borderTopRightRadius:10, overflow:"hidden"}}>
                    <Image
                        source={require("../../../assets/images/matchimage.png")} // Replace with the actual image URL
                        style={styles.image}
                    />
                    </View>
                    <View style={styles.ticketDetails}>
                        <Text style={styles.eventTitle}>African Cup of Nations</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 26 }}>
                            <LocationPinIcon />
                            <Text style={styles.venue}>XXI Ambarukmo Plaza, Studio 1</Text>
                        </View>
                        <View style={styles.row}>
                            <View >
                                <Text style={styles.label}>Date</Text>
                                <Text style={styles.value}>20 Nov</Text>
                            </View>
                            <View style={styles.column2}>
                                <Text style={styles.label}>Time</Text>
                                <Text style={styles.value}>15:05</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Seats</Text>
                                <Text style={styles.value}>G10, G11</Text>
                            </View>
                        </View>
                        <View style={styles.ticketRadiusSection}>
                            <View style={styles.ticketLeftRadius}></View>
                            <View style={styles.ticketRightRadius}></View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.label}>Booking Code</Text>
                                <Text style={styles.value}>091821912301</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.label}>Pass Key</Text>
                                <Text style={styles.value}>129312</Text>
                            </View>
                        </View>
                        <View style={styles.barcodeContainer}>
                            <BarCode />
                        </View>
                    </View>
                   
                </View>
                <TouchableOpacity style={styles.submitLink}>
                    <Text style={{ color: "white" }}>Download Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    innnerContainer: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        marginTop: hp((10 / 812) * 100),
    },
    ticketContainer: {
        backgroundColor: 'rgba(245, 245, 245, 1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    image: {
        width: '100%',
        height: 176,
    },
    ticketDetails: {
        padding: 20,
    },
    eventTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 5,
        color: "rgba(51, 51, 51, 1)"
    },
    venue: {
        fontSize: 16,
        color: '#888',
        marginLeft: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: 'rgba(119, 119, 119, 1)',
        fontWeight: "400",
    },
    value: {
        fontSize: 20,
        fontWeight: '500',
    },
    barcodeContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    column2: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        paddingHorizontal: 25,
        borderColor: "rgba(51, 51, 51, 1)"
    },
    ticketRadiusSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15
    },
    ticketLeftRadius: {
        backgroundColor: "white",
        width: 30,
        height: 30,
        borderRadius: 15,
        position: "relative",
        right: 39,
        zIndex: 1,
        borderRightColor: "#ddd",
        borderRightWidth: 2

    },
    ticketRightRadius: {
        backgroundColor: "white",
        width: 30,
        height: 30,
        borderRadius: 15,
        position: "relative",
        left: 39,
        zIndex: 1,
        borderLeftColor: "#ddd",
        borderLeftWidth: 2
    },
    topNav: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: wp((200 / 370) * 100),
        marginBottom:30,
        justifyContent: "space-between"
    },
    submitLink: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        marginTop: 40,
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});

export default Ticket;
