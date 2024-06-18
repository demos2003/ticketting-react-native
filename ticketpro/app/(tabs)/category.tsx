import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchIcon from '@/assets/icons/SearchIcon';
import { router } from 'expo-router';


const Category = () => {
  const states = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
    "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
    "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
    "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput style={styles.searchInput} placeholder='Search for your favourites' />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {
            states.map((name) => (

              <TouchableOpacity style={styles.statePill}  onPress={() => router.push({ pathname: "/state/state", params: { state: name } })}><Text>
                {name}
              </Text></TouchableOpacity>
            ))
          }

        </ScrollView>
      </View>
    </View>
  )
}

export default Category

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
  statePill: {
    backgroundColor: "white",
    width: "45%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
    borderBlockColor: "grey",
    borderWidth: 1
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  searchInput: {
    width: "85%",
    marginLeft: 10
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(238, 238, 238, 1)",
    height: hp((48 / 812) * 100),
    borderRadius: 25,
    paddingLeft: wp((19.5 / 370) * 100),
    marginBottom: 30

  },
})