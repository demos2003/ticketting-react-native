import { StyleSheet, Text, View, TextInput, FlatList, ListRenderItem } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Sharedheader from '@/components/tabs-components/Sharedheader';
import SearchIcon from '@/assets/icons/SearchIcon';
import {useLocalSearchParams } from "expo-router";


interface Event {
  date: string;
  day: string;
  eventName: string;
  location: string;
  tag: string;
}


const eventsData: Event[] = [
  {
    date: "NOV 28",
    day: "FRI",
    eventName: "XYZ FC vs ABC United",
    location: "Lagos, NG - National Stadium",
    tag: "Available"
  },
  {
    date: "DEC 01",
    day: "MON",
    eventName: "LMN FC vs QRS Rangers",
    location: "Lagos, NG - National Stadium",
    tag: "Nearby"
  },
  {
    date: "DEC 05",
    day: "FRI",
    eventName: "DEF FC vs GHI United",
    location: "Abuja, NG - Eagle Square",
    tag: "Distant"
  },
  {
    date: "DEC 12",
    day: "FRI",
    eventName: "JKL FC vs MNO Stars",
    location: "Kano, NG - Sani Abacha Stadium",
    tag: "Sold Out"
  },
  {
    date: "DEC 15",
    day: "MON",
    eventName: "OPQ FC vs RST United",
    location: "Ibadan, NG - Liberty Stadium",
    tag: "Available"
  },
  {
    date: "DEC 19",
    day: "FRI",
    eventName: "UVW FC vs XYZ FC",
    location: "Port Harcourt, NG - Sharks Stadium",
    tag: "Nearby"
  },
  {
    date: "DEC 22",
    day: "MON",
    eventName: "ABC United vs DEF FC",
    location: "Lagos, NG - National Stadium",
    tag: "Distant"
  },
  {
    date: "DEC 26",
    day: "FRI",
    eventName: "GHI United vs JKL FC",
    location: "Abuja, NG - Eagle Square",
    tag: "Sold Out"
  },
  {
    date: "DEC 29",
    day: "MON",
    eventName: "MNO Stars vs LMN FC",
    location: "Kano, NG - Sani Abacha Stadium",
    tag: "Nearby"
  },
  {
    date: "JAN 02",
    day: "FRI",
    eventName: "QRS Rangers vs UVW FC",
    location: "Ibadan, NG - Liberty Stadium",
    tag: "Available"
  },
  {
    date: "JAN 05",
    day: "MON",
    eventName: "RST United vs OPQ FC",
    location: "Port Harcourt, NG - Sharks Stadium",
    tag: "Nearby"
  },
  {
    date: "JAN 09",
    day: "FRI",
    eventName: "XYZ FC vs ABC United",
    location: "Lagos, NG - National Stadium",
    tag: "Available"
  },
  {
    date: "JAN 12",
    day: "MON",
    eventName: "LMN FC vs QRS Rangers",
    location: "Lagos, NG - National Stadium",
    tag: "Nearby"
  },
  {
    date: "JAN 16",
    day: "FRI",
    eventName: "DEF FC vs GHI United",
    location: "Abuja, NG - Eagle Square",
    tag: "Distant"
  },
  {
    date: "JAN 19",
    day: "MON",
    eventName: "JKL FC vs MNO Stars",
    location: "Kano, NG - Sani Abacha Stadium",
    tag: "Sold Out"
  },
  {
    date: "JAN 23",
    day: "FRI",
    eventName: "OPQ FC vs RST United",
    location: "Ibadan, NG - Liberty Stadium",
    tag: "Available"
  },
  {
    date: "JAN 26",
    day: "MON",
    eventName: "UVW FC vs XYZ FC",
    location: "Port Harcourt, NG - Sharks Stadium",
    tag: "Nearby"
  },
  {
    date: "JAN 30",
    day: "FRI",
    eventName: "ABC United vs DEF FC",
    location: "Lagos, NG - National Stadium",
    tag: "Distant"
  }
];


const State = () => {

  const renderEvent: ListRenderItem<Event> = ({ item }) => (
    <View style={styles.eventInfoContainer}>
      <View style={styles.eventDate}>
        <Text style={styles.dateText}>{item.date.split(' ')[0]}</Text>
        <Text style={styles.dateNumber}>{item.date.split(' ')[1]}</Text>
        <Text style={styles.dateText}>{item.day}</Text>
      </View>
      <View style={styles.eventInfoText}>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <View style={[styles.eventTag, getTagStyle(item.tag)]}>
          <View style={[styles.tagDot, getTagDotStyle(item.tag)]}></View>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      </View>
    </View>
  );


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


  const {state} = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Sharedheader state={state}/>
      <View style={styles.innnerContainer}>
      <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput style={styles.searchInput} placeholder='Search for your favourites' />
        </View>
        <FlatList
        data={eventsData}
        renderItem={renderEvent}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
     
      </View>
    </View>
  )
}

export default State

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  innnerContainer: {
    paddingLeft: wp((27.5 / 370) * 100),
    paddingRight: wp((27.5 / 370) * 100),
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(238, 238, 238, 1)",
    height: hp((48 / 812) * 100),
    borderRadius: 25,
    paddingLeft: wp((19.5 / 370) * 100),
    marginTop:30,
    marginBottom:30

  },
  searchInput: {
    width: "85%",
    marginLeft: 10
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

})