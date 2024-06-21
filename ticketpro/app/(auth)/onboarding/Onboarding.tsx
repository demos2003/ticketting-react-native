import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { router } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


const slides = [
  {
    id: 1,
    title: "Discover Matches Around You",
    description: "Find and connect with matches in your local area easily and quickly.",
    image: require('../../../assets/images/R4.png')
  },
  {
    id: 2,
    title: "Seamless Ticket Purchasing",
    description: "Experience a hassle-free ticket purchasing process with just a few clicks.",
    image: require('../../../assets/images/ticket2.png')
  },
  {
    id: 3,
    title: "Access Control Features",
    description: "Enjoy advanced access control features for a secure and efficient event experience.",
    image: require('../../../assets/images/ac.png')
  }
];

const Onboarding = () => {
  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => {
        return (
          <ImageBackground source={item.image} style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.slideContainer}>
              <Text style={styles.welcomeText}>{item.title}</Text>
              <Text style={styles.otherText}>{item.description}</Text>
              <TouchableOpacity onPress={() => router.push("signup/SignUp")} style={styles.link}>
                <Text style={styles.linkText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )
      }}
    />
  )
}

export default Onboarding

const styles = StyleSheet.create({
  slideContainer: {
    backgroundColor: "white",
    width: "90%",
    position: "absolute",
    bottom: 90,
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 22.36,
    fontWeight: "700",
    color: "rgba(51, 51, 51, 1)"
  },
  otherText: {
    textAlign: "center",
    fontSize: 17.79,
    fontWeight: "300",
    color: "rgba(51, 51, 51, 1)",
    lineHeight: 24.27,
    marginTop: 18.98
  },
  link: {
    backgroundColor: 'rgba(63, 81, 181, 1)',
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: hp((51 / 812) * 100),
    marginTop: 36.75,
    width: "100%"
  },
  linkText: {
    color: 'white',
    fontSize: 16.96,
    fontWeight: "500"
  },
})
