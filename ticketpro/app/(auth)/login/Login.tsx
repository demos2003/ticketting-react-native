import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginStyle } from './LoginStyle'
import AshjoryLogo from '@/assets/icons/AshjoryLogo'
import EmailInput from '@/components/form-components/EmailInput'
import PasswordInput from '@/components/form-components/PasswordInput'
import { router } from 'expo-router'

const Login = () => {
  return (
    <SafeAreaView>
      <View style={LoginStyle.container}>
        <View style={LoginStyle.navSection}>
          <Text style={{ fontSize: 12 }} >Don’t have an account? <Text style={{ color: "rgba(63, 81, 181, 1)", fontWeight: "700" }}>Register</Text> </Text>
        </View>
        <View style={{ marginTop: 50.91 }}>
          <AshjoryLogo />
          <View style={{ marginTop: 24 }}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 17, fontWeight: "700" }}>Welcome Back</Text>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 14, fontWeight: "400" }}>Wetin do you wey you comot, dis guy?! Anyhow sha welcome. You get some events.</Text>
          </View>
          <View style={{ marginTop: 17 }}>
            <EmailInput />
          </View>
          <View>
            <PasswordInput />
          </View>
          
          <TouchableOpacity style={LoginStyle.submitLink} onPress={() => router.push("/(tabs)/homepage")}>
            <Text style={{ color: "white" }}>Continue</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.privacyPrompt}>
              <Text style={{ color: "rgba(86, 86, 86, 1)" }}>By creating an account, you agree to Ashjory’s <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Terms & Conditions</Text> and <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Privacy Policy</Text></Text>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  privacyPrompt:{
    marginTop:300
  }
})