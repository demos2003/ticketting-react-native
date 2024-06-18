import { StyleSheet, Text, TextInput, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchIcon from '@/assets/icons/SearchIcon';
import LikeActive from '@/assets/icons/LikeActive';
import { Events } from '@/utils/EventData';
import LikedInactive from '@/assets/icons/LikedInactive';
import { router } from 'expo-router';




const Favourites: React.FC = () => {
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'numeric', day: 'numeric', year: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const [isLiked, setIsLiked] = useState(true);

  const handleLiked = () => {
    setIsLiked(!isLiked);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput style={styles.searchInput} placeholder='Search for your favourites' />
        </View>
        <ScrollView style={styles.favouriteList} showsVerticalScrollIndicator={false}>
          {Events.map((event) => (
            <TouchableOpacity
              onPress={() => router.push("/favourites/upcoming")}
            >
            <ImageBackground
              key={event.Id}
              source={require("../../assets/images/favouritesbg.png")}
              style={styles.imageBg}
            

            >
              <View style={styles.likeContainer}>
                <TouchableOpacity style={{ width:40, height:40, display:"flex", alignItems:"flex-end"}} onPress={handleLiked}>
                  {
                    isLiked ? <LikeActive /> : <LikedInactive />}
                </TouchableOpacity>

              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.eventName}>{event.Name}</Text>
                <Text style={styles.eventDate}>{formatDate(event.DateTime)}</Text>
              </View>
            </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};


export default Favourites

const styles = StyleSheet.create({

  container: {
    backgroundColor: "white",
    height: "100%"
  },
  innnerContainer: {
    paddingLeft: wp((27.5 / 370) * 100),
    paddingRight: wp((27.5 / 370) * 100),
    marginTop: hp((29 / 812) * 100),
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(238, 238, 238, 1)",
    height: hp((48 / 812) * 100),
    borderRadius: 25,
    paddingLeft: wp((19.5 / 370) * 100),

  },
  searchInput: {
    width: "85%",
    marginLeft: 10
  },
  favouriteList: {
    marginTop: 28
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
    height:40
  },
  infoContainer: {
    marginTop: hp((25 / 812) * 100)
  },
  eventName: {
    color: "white",
    fontSize: 21.14,
    fontWeight: "700"
  },
  eventDate: {
    color: "white",
    fontSize: 12.48,
    fontWeight: "700"
  }

})