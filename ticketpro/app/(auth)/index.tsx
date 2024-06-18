import { Link, router } from "expo-router";
import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export default function index() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Onboarding.png')} style={styles.image} />
      <View style={styles.onboardingTextContainer}>
        <View style={styles.onboardingText}>
          <Text style={styles.welcomeText}>Welcome to our Ticketing and Events App!</Text>
          <Text style={styles.otherText}>Your one-stop solution for seamless event management and ticket
            purchases</Text>
          <TouchableOpacity onPress={() => router.push("signup/SignUp")} style={styles.link}>
            <Text style={styles.linkText} >Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  onboardingTextContainer: {
    position: 'absolute',
    bottom: 0,
    width: wp((370 / 370) * 100),
    height: hp((325 / 812) * 100),
    backgroundColor: "white",
  },
  onboardingText: {
    marginTop:25,
    marginLeft: wp((27.5 / 375) * 100),
    marginRight: wp((27.5 / 375) * 100),
  },
  link: {
    backgroundColor: 'rgba(63, 81, 181, 1)',
    borderRadius: 5,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:hp((51/812)*100),
    marginTop:36.75
  },
  linkText: {
    color: 'white',
    fontSize: 16.96,
    fontWeight:"500"
  },
  welcomeText:{
    textAlign:"center",
    fontSize:25.36,
    fontWeight:"700",
    color:"rgba(51, 51, 51, 1)"
  },
  otherText:{
    textAlign:"center",
    fontSize:17.79,
    fontWeight:"300",
    color:"rgba(51, 51, 51, 1)",
    lineHeight:24.27,
    marginTop:18.98
  }
});
