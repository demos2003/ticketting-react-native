import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import CalendarIcon from '@/assets/icons/CalendarIcon';
import { EventProps } from '@/utils/EventData';

interface EventCardProp {
    event: EventProps;
    onPress?: () => void;
}

const EventCard: React.FC<EventCardProp> = ({ event, onPress }) => {
    const formatEventDateTime = (startDate: string, startTime: string) => {
        const eventDate = new Date(`${startDate}T${startTime}`);
        const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
        const month = monthFormatter.format(eventDate);
        const date = eventDate.getDate();
        const time = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

        return { month, date, time };
    };

    const { month, date, time } = formatEventDateTime(event.startDate, event.startTime);

    return (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={onPress}>
            <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                <ImageBackground source={require('../../assets/images/EventImage.png')} style={styles.eventImage}>
                    <ImageBackground source={require('../../assets/images/glassbackground.png')} style={styles.dateBadge}>
                        <Text style={{ textAlign: 'center', fontSize: 10, color: 'white', fontWeight: '900' }}>{month}</Text>
                        <Text style={{ textAlign: 'center', color: 'white' }}>{date}</Text>
                    </ImageBackground>
                </ImageBackground>
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
