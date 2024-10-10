import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLocalSearchParams } from 'expo-router';
import { useGetTicketsByUserIdQuery } from '@/api/features/tickets/ticketSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isBefore, parseISO } from 'date-fns';


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

interface PreviousScreenProps {
  route: {
    params: {
      tickets: Ticket[];
    };
  };
}


const previous:React.FC<PreviousScreenProps> = () => {

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
      const fetchUserId = async () => {
          try {
              const userId = await AsyncStorage.getItem('userId');
              setId(userId);
          } catch (error) {
              console.error('Error fetching userId', error)
          }
      };
      fetchUserId();
  }, []);

  console.log(id)

  const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery(id);

    const filterTickets = () => {
        if (!tickets) return { upcoming: [], previous: [] };

        const now = new Date();
        return tickets.reduce((acc: any, ticket: any) => {
            const eventDate = parseISO(`${ticket.event.startDate}T${ticket.event.startTime}`);
            if (isBefore(now, eventDate)) {
                acc.upcoming.push(ticket);
            } else {
                acc.previous.push(ticket);
            }
            return acc;
        }, { upcoming: [], previous: [] });
    };

    const { upcoming, previous } = filterTickets();

    console.log("Upcoming tickets: " + JSON.stringify(upcoming, null, 2))
    console.log("Previous tickets: " + JSON.stringify(previous, null, 2))


    
  return (
    <View style={styles.container}>
     <ScrollView style={styles.innnerContainer}>
        {
          previous.map((ticket:any) => (
            <View style={styles.ticketCard}  key={ticket.id}>
            <View style={styles.ticketImageContainer}>
            <Image source={require("../../../../assets/images/TicketImage.png")}  />
            </View>
            <View style={styles.ticketTextContainer}>
              <Text style={{color:"rgba(51, 51, 51, 1)", fontWeight:"700", fontSize:16}}>{ticket.event.name}</Text>
              <Text style={{color:"rgba(51, 51, 51, 1)", fontWeight:"400", fontSize:14}}>{ticket.event.startDate} {ticket.event.startTime}</Text>
              <Text style={{color:"rgba(99, 115, 148, 1)", fontWeight:"400", fontSize:14}}>{ticket.event.location}</Text>
            </View>
          </View>
          ))
        }
         
      </ScrollView>
    </View>
  )
}

export default previous

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    height:"100%"
  },
  innnerContainer:{
    paddingLeft:wp((27.5/370)*100),
    paddingRight:wp((27.5/370)*100),
    marginTop:hp((29/812)*100),
  },
  ticketCard:{
    backgroundColor:"rgba(246, 246, 246, 1)",
    height:hp((104/812)*100),
    paddingLeft:wp((12.5/343)*100),
    paddingRight:wp((12.5/343)*100),
    display:"flex",
    flexDirection:"row", 
    alignItems:"center",
    borderRadius:8,
    marginBottom:hp((21/812)*100),
  },
  ticketImageContainer:{
    height:88,
    width:56,

  },
  ticketTextContainer:{
    marginLeft:16
  }
})