import { StyleSheet, Text, TextInput, View, ImageBackground, ScrollView, TouchableOpacity, Image, ListRenderItem } from 'react-native';
import React, { useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchIcon from '@/assets/icons/SearchIcon';
import { useLocalSearchParams } from 'expo-router';
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { useGetOrganizersByIdQuery } from '@/api/features/organizers/organizerSlice';
import { useGetEventsByVendorIdQuery } from '@/api/features/events/eventsSlice';
import { FlatList } from 'react-native';


interface Event {
    date: string;
    day: string;
    name: string;
    location: string;
    tag: string;
    startDate: any;
    startTime:any;
    endTime:any
}




const OrganizerDetails: React.FC = () => {
    const { id } = useLocalSearchParams();
    console.log(id)
    const { data: organizer, error, isLoading } = useGetOrganizersByIdQuery(id);
    const { data: events, error: eventError } = useGetEventsByVendorIdQuery(organizer?.id)
    console.log(events)

    const formatDateForUI = (dateArray: any) => {
        if (!Array.isArray(dateArray) || dateArray.length !== 3) {
            return { month: 'Invalid', day: 'Invalid', date: 'Invalid' };
        }

        const [year, month, day] = dateArray;

        const dateObject = new Date(year, month - 1, day); // Month is zero-based
        const options = { month: 'short', weekday: 'short' };

        return {
            month: dateObject.toLocaleString('en-US', { month: 'short' }), // e.g., Nov
            day: dateObject.toLocaleString('en-US', { weekday: 'short' }), // e.g., Fri
            date: day, // e.g., 1
        };
    };

    const formatTime = (time: [number, number]): string => {
        const [hour, minute] = time;
        const isPM = hour >= 12;
        const formattedHour = hour % 12 || 12; // Convert 0 or 12-hour to 12-hour format
        const formattedMinute = minute.toString().padStart(2, '0'); // Ensure two-digit minutes
        const period = isPM ? 'PM' : 'AM';
        return `${formattedHour}:${formattedMinute} ${period}`;
    };
    

    const renderEvent: ListRenderItem<Event> = ({ item }) => {
        // Format the event date
        const formattedDate = formatDateForUI(item.startDate);
        const formattedStartTime = formatTime(item.startTime);
    const formattedEndTime = formatTime(item.endTime);

        return (
            <View style={styles.eventInfoContainer}>
                <View style={styles.eventDate}>
                    {/* Render formatted date */}
                    <Text style={styles.dateText}>{formattedDate.month}</Text>
                    <Text style={styles.dateNumber}>{formattedDate.date}</Text>
                    <Text style={styles.dateText}>{formattedDate.day}</Text>
                </View>
                <View style={styles.eventInfoText}>
                    <Text style={styles.eventName}>{item.name}</Text>
                    <View style={{display:"flex", flexDirection:"row"}}>
                    <Text style={styles.eventLocation}>{item.location}, </Text>
                    <Text style={styles.eventLocation}>{formattedStartTime} - {formattedEndTime}</Text>
                    </View>
                  
                    <View style={[styles.eventTag, getTagStyle(item.tag)]}>
                        <View style={[styles.tagDot, getTagDotStyle(item.tag)]}></View>
                        <Text style={styles.tagText}>Available</Text>
                    </View>
                </View>
            </View>
        );
    };


    const getTagStyle = (tag: string) => {
        switch (tag) {
            case 'Nearby':
            case 'Available':
                return { backgroundColor: 'rgb(18, 184, 134)' };
            case 'Sold Out':
                return { backgroundColor: 'rgb(246, 97, 81)' };
            case 'Distant':
                return { backgroundColor: 'rgb(255, 165, 0)' };
            default:
                return { backgroundColor: 'rgb(18, 184, 134)' };
        }
    };

    const getTagDotStyle = (tag: string) => {
        switch (tag) {
            case 'Nearby':
            case 'Available':
                return { backgroundColor: 'green' };
            case 'Sold Out':
                return { backgroundColor: 'rgb(224, 27, 36)' };
            case 'Distant':
                return { backgroundColor: 'rgb(230, 97, 0)' };
            default:
                return { backgroundColor: 'green' };
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <BackNavIcon />
                <View style={{ display: "flex", flexDirection: "row", marginTop: 25, marginBottom: 25 }}>
                    <TouchableOpacity >
                        <Image source={require("../../../assets/images/Organizer1.png")} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontWeight: '800', fontSize: 18 }}>
                            {isLoading ? "Loading" : organizer?.state} State
                        </Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ marginBottom: 2, display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontWeight: '600', color: 'grey' }}>Email:</Text>
                                <Text style={{ color: 'black', marginLeft: 5 }}>
                                    {isLoading ? "Loading" : organizer?.email}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 2, display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontWeight: '600', color: 'grey' }}>Phone:</Text>
                                <Text style={{ color: 'black', marginLeft: 5 }}>
                                    {isLoading ? "Loading" : organizer?.phoneNumber} State
                                </Text>
                            </View>
                            <View style={{ marginBottom: 2, display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontWeight: '600', color: 'grey' }}>Rep Name:</Text>
                                <Text style={{ color: 'black', marginLeft: 5 }}>
                                    {isLoading ? "Loading" : organizer?.representativeName} State
                                </Text>
                            </View>
                        </View>
                    </View>

                </View>
                <Text style={{ fontWeight: '800', fontSize: 16, marginBottom: 10 }}>Available Matches</Text>
                <View style={styles.searchBar}>
                    <SearchIcon />
                    <TextInput style={styles.searchInput} placeholder='Search for matches' />
                </View>
                <View style={styles.favouriteList} >
                    <FlatList
                        data={events}
                        renderItem={renderEvent}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
};

export default OrganizerDetails;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    innerContainer: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        marginTop: hp((29 / 812) * 100),
    },
    searchBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "rgba(238, 238, 238, 1)",
        borderWidth: 2,
        height: hp((48 / 812) * 100),
        borderRadius: 15,
        paddingLeft: wp((19.5 / 370) * 100),
    },
    searchInput: {
        width: "85%",
        marginLeft: 10
    },
    favouriteList: {
        marginTop: 28,
        backgroundColor: "rgba(238, 238, 238, 1)",
        padding: 10,
        borderRadius: 15,
        height: 510

    },
    imageBg: {
        height: hp((179 / 812) * 100),
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: wp((14 / 370) * 100),
        paddingRight: wp((14 / 370) * 100),
        marginBottom: hp((15 / 812) * 100)
    },
    likeContainer: {
        display: "flex",
        alignItems: "flex-end",
        height: 40
    },
    infoContainer: {
        marginTop: hp((25 / 812) * 100)
    },
    eventInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
    },
    eventDate: {
        backgroundColor: 'rgba(82, 99, 190, 1)',
        width: wp((74 / 370) * 100),
        height: hp((77 / 812) * 100),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9.6,
        marginRight: wp((16 / 370) * 100),
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 1)',
        margin: 0,
    },
    dateNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: 'rgba(255, 255, 255, 1)',
        margin: 0,
    },
    eventInfoText: {
        height: hp((77 / 812) * 100),
        display: 'flex',
        justifyContent: 'space-between',
    },
    eventName: {
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 16,
        fontWeight: '600',
    },
    eventLocation: {
        color: 'rgba(147, 147, 147, 1)',
        fontSize: 13,
        fontWeight: '500',
    },
    eventTag: {
        width: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 27,
        borderRadius: 4,
    },
    tagDot: {
        height: 5,
        width: 5,
        borderRadius: 2,
    },

    tagText: {
        color: 'rgba(62, 62, 62, 1)',
        fontSize: 12,
        marginLeft: 5,
    },
});
