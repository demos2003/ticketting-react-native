import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginStyle } from './LoginStyle'
import AshjoryLogo from '@/assets/icons/AshjoryLogo'
import EmailInput from '@/components/form-components/EmailInput'
import PasswordInput from '@/components/form-components/PasswordInput'
import { router } from 'expo-router'
import { useLoginMutation } from '@/api/features/auth/authApiSlice'
import { setAuthState, setAuthenticated, setCredentials, setEmailVerified } from '@/api/features/auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();


  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
     
      // console.log("car")
      
      // Store the token in AsyncStorage
      await AsyncStorage.multiSet([
        ['accessToken', response.access_token],
        ['emailVerified', 'true']
      ]);
      dispatch(setCredentials({ email, password}));
      dispatch(setAuthState({
        isAuthenticated: true,
        accessToken: response.access_token,
        emailVerified: true,
        firstName: response.firstName,
        userId: response.userId,
        lastName: response.lastName,
        email:response.email
      }));

      
      // // Navigate to the main app
      router.replace('/(app)/(tabs)/homepage');
    } catch (err) {
      setErrorMsg('Login failed. Please check your credentials.');
      console.error(err)
    }
  };

  return (
    <SafeAreaView>
      <View style={LoginStyle.container}>
        <TouchableOpacity style={LoginStyle.navSection} onPress={() => router.push("/signup/SignUp")}>
          <Text style={{ fontSize: 12 }} >Don’t have an account? <Text style={{ color: "rgba(63, 81, 181, 1)", fontWeight: "700" }}>Register</Text> </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 50.91 }}>
          <AshjoryLogo />
          <View style={{ marginTop: 24 }}>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontSize: 17, fontWeight: "700" }}>Welcome Back</Text>

          </View>
          <View style={{ marginTop: 17 }}>
            <EmailInput value={email} onChangeText={setEmail} />
          </View>
          <View>
            <PasswordInput value={password} onChangeText={setPassword} />
          </View>
          
          <TouchableOpacity style={ isLoading ? [LoginStyle.submitLink, {opacity:0.5}]: LoginStyle.submitLink} onPress={() => handleLogin()}>
          {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{ color: "white" }}>Continue</Text>
                )}
          </TouchableOpacity>

        </View>
        <Text>{errorMsg}</Text>
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