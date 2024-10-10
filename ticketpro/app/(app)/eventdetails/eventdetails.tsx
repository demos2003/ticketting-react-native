import { SafeAreaView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import WhiteBackIcon from '@/assets/icons/WhiteBackIncon';
import LikeActive from '@/assets/icons/LikeActive';
import TimeIcon from '@/assets/icons/TimeIcon';
import LocationPinIcon from '@/assets/icons/LocationPinIcon';
import DateIcon from '@/assets/icons/DateIcon';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import PopupContainer from '@/components/pop-up/Popup';
import TicketPurchasePopUp from '@/components/ticket-purchase/TicketPurchasePopUp';
import AdPlacementPopUp from '@/components/ad-placement/AdPlacementPopUp';
import { useLocalSearchParams } from 'expo-router';
import { useGetEventByIdQuery } from '@/api/features/events/eventsSlice';

const EventDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: event, error, isLoading } = useGetEventByIdQuery(id);

    const [eventlocation, setEventlocation] = useState({
        latitude: 7.1383698,
        longitude: 3.3254202,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    });

    const RADIUS = 100;
    const [ticketModal, setTicketModal] = useState(false);
    const [adModal, setAdModal] = useState(false);

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


    if (isLoading) {
        return (
            <SafeAreaView style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="rgba(63, 81, 181, 1)" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: 'red', textAlign: 'center' }}>Error fetching event details. Please try again later.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require("../../../assets/images/eventdetailsbg.png")} style={styles.eventDetailsbg}>
                <View style={styles.navigationHeader}>
                    <View >
                        <WhiteBackIcon />
                    </View>
                    <TouchableOpacity onPress={() => setAdModal(true)}>
                        <Image source={require("../../../assets/images/AddIcon.png")} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.bottomSheet}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16.43, color: "rgba(51, 51, 51, 1)", fontWeight: "700" }}>
                        African Cup of Nations
                    </Text>
                    <LikeActive />
                </View>
                <View>
                    <Text style={{ fontSize: 20.53, color: "rgba(51, 51, 51, 1)", fontWeight: "700", marginBottom: 8 }}>{event.name}</Text>
                    <View style={styles.row}>
                        <LocationPinIcon />
                        <Text style={styles.rowText}>{event.location}</Text></View>
                    <View style={styles.row}>
                        <View style={styles.row2}>
                            <DateIcon />
                            <Text style={styles.rowText}>{formatDate(event.startDate)}</Text></View>
                        <View style={styles.row}>
                            <TimeIcon />
                            <Text style={styles.rowText}>{formatTime(event.startTime)} - {formatTime(event.endTime)}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ color: "rgba(91, 91, 91, 1)", fontWeight: "400", fontSize: 14 }}>
                            <Text style={{ color: "rgba(91, 91, 91, 1)", fontWeight: "700", fontSize: 16 }}>About Event:</Text> {event.description}</Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ color: "rgba(91, 91, 91, 1)", fontWeight: "700", fontSize: 16 }}>
                            Location
                        </Text>
                        <View style={styles.mapContainer}>
                            <MapView
                                region={eventlocation}
                                style={{
                                    height: "100%",
                                    borderRadius: 20,
                                    overflow: "hidden"
                                }}
                                provider={PROVIDER_GOOGLE}
                            >
                                <Marker coordinate={eventlocation} title="Attendance Location" pinColor='rgba(233, 30, 99, 1)' />
                                <Circle center={eventlocation} radius={RADIUS} fillColor={'rgba(249, 121, 165, 0.68)'} strokeColor={'rgba(233, 30, 99, 1)'} />
                            </MapView>
                        </View>
                        <TouchableOpacity style={styles.submitLink}
                            onPress={() => setTicketModal(true)}
                        >
                            <Text style={{ color: "white" }}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <PopupContainer trigger={ticketModal}>
                <TicketPurchasePopUp setTicketModal={setTicketModal} event={event} />
            </PopupContainer>
            <PopupContainer trigger={adModal}>
                <AdPlacementPopUp setAdModal={setAdModal} />
            </PopupContainer>
        </SafeAreaView>
    );
}

export default EventDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    eventDetailsbg: {
        width: "100%",
        height: hp((291 / 821) * 100),
        paddingTop: 40,
        display: "flex",
        alignItems: "center"
    },
    bottomSheet: {
        backgroundColor: "white",
        height: hp((570 / 821) * 100),
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        paddingTop: 25
    },
    navigationHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: wp((315 / 370) * 100)
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    row2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10
    },
    rowText: {
        color: "rgba(51, 51, 51, 1)",
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 3
    },
    mapContainer: {
        height: hp((169 / 821) * 100),
        marginTop: 15,
        borderRadius: 15,
        overflow: "hidden",
    },
    submitLink: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        marginTop: 35,
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
});
