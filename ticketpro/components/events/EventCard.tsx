import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import CalendarIcon from '@/assets/icons/CalendarIcon';
import { EventProps } from '@/utils/EventData';
import { formatArrayDateTime } from '@/utils/DateTimeFormater';

interface EventCardProp {
    event: EventProps;
    onPress?: () => void;
}

const EventCard: React.FC<EventCardProp> = ({ event, onPress }) => {
    const { month, date, time } = formatArrayDateTime(event.startDate, event.startTime);




    return (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={onPress}>
    <View style={{ borderRadius: 8, overflow: 'hidden' }}>
        {event.images.map((image, index) => (
            <ImageBackground
                key={index} // Ensure a unique key is provided
                source={{ uri: image.url }} // Access the URL for each image
                style={styles.eventImage}
            >
                <ImageBackground
                    source={require('../../assets/images/glassbackground.png')}
                    style={styles.dateBadge}
                >
                    <Text style={{ textAlign: 'center', fontSize: 10, color: 'white', fontWeight: '900' }}>
                        {month}
                    </Text>
                    <Text style={{ textAlign: 'center', color: 'white' }}>{date}</Text>
                </ImageBackground>
            </ImageBackground>
        ))}
    </View>
    <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 17, fontWeight: '700' }}>{event.name}</Text>
        <View style={styles.eventDetails}>
            <CalendarIcon />
            <Text style={{ fontSize: 10, color: 'rgba(202, 202, 202, 1)', fontWeight: '600', marginTop: 2 }}>
                {`${month} ${date} - ${time}`}
            </Text>
        </View>
    </View>
</TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    eventImage: {
        width: 214,
        height: 120,
    },
    eventDetails: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateBadge: {
        width: 40,
        height: 40,
        marginLeft: 17,
        marginTop: 13,
        borderRadius: 5,
        display: 'flex',
    },
});

export default EventCard;
