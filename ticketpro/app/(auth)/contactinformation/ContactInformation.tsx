import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ContactInformationStyle } from './ContactInformationStyle'
import NameInput from '@/components/form-components/NameInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { router, useLocalSearchParams } from 'expo-router'
import { useSignUpMutation } from '@/api/features/auth/authApiSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ContactInformation = () => {
  const label1 = "First Name*"
  const placeholder1 = "Iyidemilade"
  const label2 = "Last Name*"
  const placeholder2 = "Nasiru"
  const label3 = "Phone Number*"
  const placeholder3 = "234 8051066930"

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')
  const { email, password } = useLocalSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [org, setOrg] = useState([])
  const [signup] = useSignUpMutation()
  const role = "USER"


  const handleSignUp = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await signup({ email, password, phoneNumber, dob, firstName, lastName, role }).unwrap();
      console.log('SignUp Response:', response);
      if (response.message === "User already exists") {
        setErrorMsg("Something went wrong")
      }  else {
        // Store the access token
        if (response.access_token) {
          await AsyncStorage.setItem('accessToken', response.access_token);
          router.replace("/(app)/(tabs)/homepage");
        }
        router.push({ pathname: '/emailverification/EmailVerification', params: { email: email } });
      }
    } catch (error) {
      console.error('SignUp Error:', error);
      setErrorMsg('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  console.log(org)

  return (
    <SafeAreaView>
      <View style={ContactInformationStyle.container}>
        <View style={ContactInformationStyle.navSection}>
          <Text style={{ color: "rgba(63, 81, 181, 1)", fontSize: 12 }}>I’ll do this later</Text>
        </View>
        <View>
          <Image source={require('../../../assets/images/Profileimage.png')} />
          <View style={{ marginTop: 15.5 }}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 17, fontWeight: "700" }}>Contact Information</Text>
            <Text style={{ marginTop: 7.17, color: "rgba(51, 51, 51, 1)", fontSize: 14.82 }}>Welcome to <Text style={{ color: "rgba(63, 81, 181, 1)", fontWeight: "700" }}>Ashjory.</Text> We’ll need your contact information for the records.</Text>
            <View style={{ marginTop: 24 }}>
              <View style={{ marginBottom: 24 }}>
                <NameInput label="First Name*" placeholder="Enter your first name" value={firstName} onChangeText={setFirstName} />
              </View>
              <View style={{ marginBottom: 24 }}>
                <NameInput label="Last Name*" placeholder="Enter your last name" value={lastName} onChangeText={setLastName} />
              </View>
              <View style={{ marginBottom: 24 }}>
                <NameInput label="Phone Number*" placeholder="Enter your phone number" value={phoneNumber} onChangeText={setPhoneNumber} />
              </View>
              <View style={styles.emailInputContainer}>
                <View style={styles.containerLeft}>
                  <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 7.09, fontWeight: "400" }}>Date of Birth</Text>
                  <TextInput placeholder="dd/mm/yyyy" placeholderTextColor="rgba(51, 51, 51, 1)" value={dob} onChangeText={setDob} />
                </View>
              </View>
              <TouchableOpacity
                style={isLoading ? [styles.submitLink, { opacity: 0.5 }] : styles.submitLink}
                onPress={() => handleSignUp()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{ color: "white" }}>Continue</Text>
                )}
              </TouchableOpacity>
              {errorMsg ? <Text style={{ color: 'red', marginTop: 10 }}>{errorMsg}</Text> : null}
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
  privacyPrompt: {
    marginTop: 130
  }
})
