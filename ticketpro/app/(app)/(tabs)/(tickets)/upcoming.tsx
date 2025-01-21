import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useGetTicketsByUserIdQuery } from '@/api/features/tickets/ticketSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isBefore } from 'date-fns';
import { useRouter } from 'expo-router'; 

interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  vendorId: string;
  varyingTicketType: boolean;
  totalTicket: number;
  startTime: string;
  endTime: string;
  numVipTickets: number;
  numRegularTickets: number;
  vipTicketPrice: number;
  regTicketPrice: number;
}

interface Ticket {
  id: string;
  event: Event;
  type: string;
  price: number;
  userId: string;
  transaction: any;
}

interface UpcomingScreenProps {
  route: {
    params: {
      tickets: Ticket[];
    };
  };
}

const upcoming: React.FC<UpcomingScreenProps> = () => {
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setId(userId);
      } catch (error) {
        console.error('Error fetching userId', error);
      }
    };
    fetchUserId();
  }, []);


  const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery(id);

  console.log(tickets)

  const filterTickets = () => {
    if (!tickets) return { upcoming: [], previous: [] };

    const now = new Date();
    return tickets.reduce((acc: any, ticket: any) => {
        const [year, month, day] = ticket.event.startDate;
        console.log("Ticket time", ticket.event.startTime);
        
        // Instead of .split(), directly use the array
        const [hours, minutes] = ticket.event.startTime; 
        
        // Create a valid Date object
        const eventDate = new Date(year, month - 1, day, hours || 0, minutes || 0); // Adjust month index

        if (isBefore(now, eventDate)) {
            acc.upcoming.push(ticket);
        } else {
            acc.previous.push(ticket);
        }
        return acc;
    }, { upcoming: [], previous: [] });
};

  const { upcoming } = filterTickets();


  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
<ActivityIndicator size="large" color="rgba(63, 81, 181, 1)" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.noTicketsText}>Error loading tickets. Please try again.</Text>
      </View>
    );
  }


  if (upcoming.length === 0){
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.noTicketsText}>No upcoming tickets found</Text>
      </View>
    );
  }

  const goToTicket = (ticket:any) => {
    router.push({
      pathname:"/(app)/ticket/ticket",
      params:{
        eventName: ticket.event.name,
        eventLocation:ticket.event.location,
        eventStartDate: ticket.event.startDate,
        eventStartTime: ticket.event.startTime,
        eventEndTime:ticket.event.endTime,
        ticketId:ticket.id,
        ticketType:ticket.type,

      }
    })
  }



  return (
    <View style={styles.container}>
      <ScrollView style={styles.innnerContainer}>
        {upcoming.length === 0 ? (
          <Text style={styles.noTicketsText}>No Upcoming Tickets Found</Text>
        ) : (
          upcoming.map((ticket: any) => (
            <TouchableOpacity style={styles.ticketCard} key={ticket.id}  onPress={() => goToTicket(ticket)}>
              <View style={styles.ticketImageContainer}>
                <Image source={require("../../../../assets/images/TicketImage.png")} />
              </View>
              <View style={styles.ticketTextContainer}>
                <Text style={{ color: "rgba(51, 51, 51, 1)", fontWeight: "700", fontSize: 16 }}>
                  {ticket.event.name}
                </Text>
                <Text style={{ color: "rgba(51, 51, 51, 1)", fontWeight: "400", fontSize: 14 }}>
                  {ticket.event.startDate} {ticket.event.startTime}
                </Text>
                <Text style={{ color: "rgba(99, 115, 148, 1)", fontWeight: "400", fontSize: 14 }}>
                  {ticket.event.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default upcoming;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  innnerContainer: {
    paddingLeft: wp((27.5 / 370) * 100),
    paddingRight: wp((27.5 / 370) * 100),
    marginTop: hp((29 / 812) * 100),
  },
  ticketCard: {
    backgroundColor: "rgba(246, 246, 246, 1)",
    height: hp((104 / 812) * 100),
    paddingLeft: wp((12.5 / 343) * 100),
    paddingRight: wp((12.5 / 343) * 100),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: hp((21 / 812) * 100),
  },
  ticketImageContainer: {
    height: 88,
    width: 56,
  },
  ticketTextContainer: {
    marginLeft: 16,
  },
  noTicketsText: {
    textAlign: "center",
    marginTop: hp((50 / 812) * 100),
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(51, 51, 51, 1)",
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
