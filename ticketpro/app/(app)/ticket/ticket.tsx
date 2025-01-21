import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Barcode from 'react-native-barcode-builder';
import LocationPinIcon from '@/assets/icons/LocationPinIcon';
import BarCode from '@/assets/icons/BarCode';
import BackNavIcon from '@/assets/icons/BackNavIcon';

const Ticket = () => {
     const params = useLocalSearchParams();
     const eventName = params.eventName as string;
     const eventLocation = params.eventLocation as string;
     const eventStartTime = params.eventStartTime as any;
     const eventEndTime = params.eventEndTime as any;
     const ticketType = params.ticketType as string;
     const eventStartDate = params.eventStartDate as any;
     const ticketId = params.ticketId;

     console.log(eventStartTime)


     


     const formatDateAndTime = (dateString: string, timeString: string) => {
        // Convert date string to array of numbers
        const dateArray = dateString.split(',').map(Number);
        
        // Convert time string to array of numbers
        const timeArray = timeString.split(',').map(Number);
        
        // Extract year, month, and day from the date array
        const [year, month, day] = dateArray;
      
        // Create a new Date object
        const dateObj = new Date(year, month - 1, day); // Month is 0-indexed
      
        // Format the day with a suffix (e.g., 1st, 2nd, 3rd)
        const dayWithSuffix = (d: number) => {
          const suffix = ['th', 'st', 'nd', 'rd'];
          const v = d % 100;
          return d + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
        };
      
        // Get the formatted date
        const formattedDate = `${dayWithSuffix(dateObj.getDate())} ${dateObj.toLocaleString('default', { month: 'short' })}`;
      
        // Extract hours and minutes from the time array
        const [hours, minutes] = timeArray;
      
        // Format time manually to ensure correct hours
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : hours;
        const formattedTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      
        return { formattedDate, formattedTime };
      };

      const { formattedDate, formattedTime } = formatDateAndTime(eventStartDate, eventStartTime);
      
   // Output: "1:30 PM"
      



    

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
                        <Text style={styles.eventTitle}>{eventName}</Text>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 26 }}>
                            <LocationPinIcon />
                            <Text style={styles.venue}>{eventLocation}</Text>
                        </View>
                        <View style={styles.row}>
                            <View >
                                <Text style={styles.label}>Date</Text>
                                <Text style={styles.value}>{formattedDate}</Text>
                            </View>
                            <View style={styles.column2}>
                                <Text style={styles.label}>Time</Text>
                                <Text style={styles.value}>{formattedTime}</Text>
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
                                <Text style={styles.label}>Ticket Type</Text>
                                <Text style={styles.value}>{ticketType}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.label}>Pass Key</Text>
                                <Text style={styles.value}>{ticketId}</Text>
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
        paddingHorizontal: 10,
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
