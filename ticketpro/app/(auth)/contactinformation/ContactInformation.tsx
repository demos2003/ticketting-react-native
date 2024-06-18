import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ContactInformationStyle } from './ContactInformationStyle'
import NameInput from '@/components/form-components/NameInput'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from 'expo-router'

const ContactInformation = () => {
  const label1 = "First Name*"
  const placeholder1 = "Iyidemilade"
  const label2 = "Last Name*"
  const placeholder2 = "Nasiru"
  const label3 = "Phone Number*"
  const placeholder3 = "234 8051066930"
  return (
    <SafeAreaView>
      <View style={ContactInformationStyle.container}>
        <View style={ContactInformationStyle.navSection}>
          <Text style={{ color: "rgba(63, 81, 181, 1)" , fontSize:12}}>I’ll do this later</Text>
        </View>
        <View>
          <Image source={require('../../../assets/images/Profileimage.png')} />
          <View style={{ marginTop: 15.5 }}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 17, fontWeight: "700" }}>Contact Information</Text>
            <Text style={{ marginTop: 7.17, color: "rgba(51, 51, 51, 1)", fontSize: 14.82 }}>Welcome to <Text style={{ color: "rgba(63, 81, 181, 1)", fontWeight: "700" }}>Ashjory.</Text>  We’ll need your contact information for the records.</Text>
            <View style={{ marginTop: 24 }}>
              <View style={{ marginBottom: 24 }}>
                <NameInput label={label1} placeholder={placeholder1} />
              </View>
              <View style={{ marginBottom: 24 }}>
                <NameInput label={label2} placeholder={placeholder2} />
              </View>
              <View style={{ marginBottom: 24 }}>
                <NameInput label={label3} placeholder={placeholder3} />
              </View>
              <View style={styles.emailInputContainer}>
                <View style={styles.containerLeft}>
                  <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 7.09, fontWeight: "400" }}>Date of Birth</Text>
                  <TextInput placeholder="dd/mm/yyyy" placeholderTextColor="rgba(51, 51, 51, 1)" />
                </View>
              </View>
              <TouchableOpacity style={styles.submitLink} onPress={() => router.push("/login/Login")}>
                <Text style={{ color: "white" }}>Continue</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.privacyPrompt}>
              <Text style={{ color: "rgba(86, 86, 86, 1)" }}>By creating an account, you agree to Ashjory’s <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Terms & Conditions</Text> and <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Privacy Policy</Text></Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ContactInformation

const styles = StyleSheet.create({
  emailInputContainer: {
    height: hp((61 / 812) * 100),
    borderRadius: 5,
    paddingHorizontal: wp((12 / 370) * 100),
    borderColor: "rgba(203, 203, 203, 1)",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

  },
  containerLeft: {
    width: "90%"
  },
  containerRight: {
    width: "10%",
    display: "flex",
    alignItems: 'flex-end'
  },
  submitLink: {
    backgroundColor: "rgba(63, 81, 181, 1)",
    marginTop: hp((17.91 / 812) * 100),
    height: hp((51 / 812) * 100),
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  privacyPrompt:{
    marginTop:130
  }
})