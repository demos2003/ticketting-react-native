import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CalendarIcon from '@/assets/icons/CalendarIcon';
import { Events } from '@/utils/EventData';
import { router } from 'expo-router';
import { useGetOrganizersQuery } from '@/api/features/organizers/organizerSlice';
import { useGetEventsQuery } from '@/api/features/events/eventsSlice';
import EventCard from '@/components/events/EventCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


const capitalizeFirstLetter = (name: string): string => {
  if (!name) return name; // handle empty string
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const HomePage = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const { data: organizers, error: organizersError, isLoading: organizersLoading } = useGetOrganizersQuery({}, {
    pollingInterval:3000
  });
  const { data: events, error: eventsError, isLoading: eventsLoading } = useGetEventsQuery({}, {
    pollingInterval:3000
  });


  console.log(organizers)

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('firstName');
        setUserName(name);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    
    fetchUserName();
  }, []);





const formattedName = capitalizeFirstLetter(userName as string);

  const formatEventDateTime = (dateTime: any) => {
    const eventDate = new Date(dateTime);
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
    const month = monthFormatter.format(eventDate);
    const date = eventDate.getDate();
    const time = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

    return { month, date, time };
  };

  // console.log(organizers)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innnerContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "black" }}>
            Hi, {formattedName || 'Guest'}
          </Text>
        </View>
        <ImageBackground
          source={require("../../../assets/images/announcement.png")}
          style={styles.announcementSection}
        >
          <Text style={{ fontSize: 23, fontWeight: "600", color: "white" }}>Announcements!!!</Text>
        </ImageBackground>


        <View style={styles.hostSection}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 19, fontWeight: "600" }}>Favourites Hosts</Text>
            {/* <TouchableOpacity onPress={() => router.push("(tabs)/favourites")}>
              <Text style={{ color: "rgba(233, 30, 99, 1)", fontSize: 13, fontWeight: "500" }}>See All</Text>
            </TouchableOpacity> */}
          </View>
          {organizersLoading ? (
            <Text>Loading...</Text>
          ) : organizersError ? (
            <Text>Error loading organizers</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {organizers.map((organizer: any) => (
                <TouchableOpacity key={organizer.id} style={{ marginRight: 15 }}  onPress={() => router.push(`/organizerdetails/organizerdetails?id=${organizer.id}`)}>
                  <Image source={require("../../../assets/images/Organizer1.png")} />
                  <Text style={{ fontWeight: "600", marginTop: 5 }}>{organizer.state} State</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.hostSection}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 19, fontWeight: "600" }}>You might like</Text>
            <TouchableOpacity onPress={() => router.push("/eventdetails/eventdetails")}>
              <Text style={{ color: "rgba(233, 30, 99, 1)", fontSize: 13, fontWeight: "500" }}>See All</Text>
            </TouchableOpacity>
          </View>
          {eventsLoading ? (
            <Text>Loading...</Text>
          ) : eventsError ? (
            <Text>Error loading events</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {events.map((event: any) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => router.push(`/eventdetails/eventdetails?id=${event.id}`)}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.aroundYou}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 19, fontWeight: "600" }}>Around You</Text>
            <TouchableOpacity onPress={() => router.push("/eventdetails/eventdetails")}>
              <Text style={{ color: "rgba(233, 30, 99, 1)", fontSize: 13, fontWeight: "500" }}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Events.map((event) => {
              const { month, date, time } = formatEventDateTime(event.DateTime);
              return (
                <View key={event.Id} style={{ marginRight: 15 }}>
                  <View style={{ borderRadius: 8, overflow: "hidden" }}>
                    <ImageBackground
                      source={require("../../../assets/images/EventImage.png")}
                      style={styles.eventImage}
                    >
                      <ImageBackground
                        source={require("../../../assets/images/glassbackground.png")}
                        style={styles.dateBadge}
                      >
                        <Text style={{ textAlign: "center", fontSize: 10, color: "white", fontWeight: "900" }}>{month}</Text>
                        <Text style={{ textAlign: "center", color: "white" }}>{date}</Text>
                      </ImageBackground>
                    </ImageBackground>
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 17, fontWeight: "700" }}>{event.Name}</Text>
                    <View style={styles.eventDetails}>
                      <CalendarIcon />
                      {/* <Text style={{ fontSize: 10, color: "rgba(202, 202, 202, 1)", fontWeight: "600", marginTop: 2 }}>{`${month} ${date} - ${time}`}</Text> */}
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  innnerContainer: {
    paddingLeft: wp((20.5 / 370) * 100),
    paddingRight: wp((20.5 / 370) * 100),
    marginTop: hp((29 / 812) * 100),
  },
  announcementSection: {
    height: hp((135 / 812) * 100),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  hostSection: {
    marginTop: hp((26 / 812) * 100)
  },
  aroundYou: {
    marginTop: hp((26 / 812) * 100),
    marginBottom: hp((126 / 812) * 100)
  },
  eventImage: {
    width: wp((214 / 370) * 100),
    height: hp((120 / 812) * 100),
  },
  eventDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  dateBadge: {
    width: 40,
    height: 40,
    marginLeft: 17,
    marginTop: 13,
    borderRadius: 5,
    display: "flex",
  }
});
