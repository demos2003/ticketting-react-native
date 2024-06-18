import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Events } from '@/utils/EventData';


const upcoming = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.innnerContainer}>
        {
          Events.map((event) => (
            <View style={styles.ticketCard}  key={event.Id}>
            <View style={styles.ticketImageContainer}>
            <Image source={require("../../../assets/images/TicketImage.png")}  />
            </View>
            <View style={styles.ticketTextContainer}>
              <Text style={{color:"rgba(51, 51, 51, 1)", fontWeight:"700", fontSize:16}}>{event.Name}</Text>
              <Text style={{color:"rgba(51, 51, 51, 1)", fontWeight:"400", fontSize:14}}>{event.DateTime}</Text>
              <Text style={{color:"rgba(99, 115, 148, 1)", fontWeight:"400", fontSize:14}}>{event.Location}</Text>
            </View>
          </View>
          ))
        }
         
      </ScrollView>
    </View>
  )
}

export default upcoming

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