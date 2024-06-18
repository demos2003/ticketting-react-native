import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignUpStyle } from './SignUpStyle'
import BackNavIcon from '@/assets/icons/BackNavIcon'
import EmailInput from '@/components/form-components/EmailInput'
import PasswordInput from '@/components/form-components/PasswordInput'
import { Link, router } from 'expo-router'


const SignUp = () => {
  return (
    <View>
      <SafeAreaView>
        <View style={SignUpStyle.container}>
          <View style={SignUpStyle.navSection}>
            <BackNavIcon />
            <Text style={{ fontSize: 12.49 }}>Already have an account ? <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Login</Text> </Text>
          </View>
          <View style={SignUpStyle.formSection}>
            <View>
              <Text style={{ fontSize: 16.5, fontWeight: "700", marginBottom: 7 }}>Oh? Hey there</Text>
              <Text style={{ color: "rgba(51, 51, 51, 1)", fontWeight: "400", fontSize: 14.82 }}>Since you’ve decided to come this far, thank you for joining us. Do have a great time.</Text>
            </View>
            <View style={SignUpStyle.formContainer}>
              <View>
                <EmailInput />
              </View>
              <View>
                <PasswordInput />
              </View>
              <View>
                <PasswordInput />
              </View>
              <TouchableOpacity style={SignUpStyle.submitLink} onPress={() => router.push("/emailverification/EmailVerification")}>
                <Text style={{ color: "white" }}>Continue</Text>
              </TouchableOpacity>
            </View>
            <View style={SignUpStyle.privacyPrompt}>
              <Text style={{ color: "rgba(86, 86, 86, 1)" }}>By creating an account, you agree to Ashjory’s <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Terms & Conditions</Text> and <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Privacy Policy</Text></Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
})