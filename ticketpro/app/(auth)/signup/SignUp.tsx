import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignUpStyle } from './SignUpStyle'
import BackNavIcon from '@/assets/icons/BackNavIcon'
import EmailInput from '@/components/form-components/EmailInput'
import PasswordInput from '@/components/form-components/PasswordInput'
import { Link, router } from 'expo-router'


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
      return;
    }
    setError('');
    // Proceed with sign up process, e.g., navigate to email verification
    router.push('/emailverification/EmailVerification');
  };
  



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
                <EmailInput value={email} onChangeText={setEmail} />
              </View>
              <View>
                <PasswordInput value={password} onChangeText={setPassword} />
              </View>
              <View>
                <PasswordInput value={confirmPassword} onChangeText={setConfirmPassword} />
              </View>
              <Text style={{color:"grey", fontSize:11, marginTop:5}}>Note: Password should contain at least 1 Capital, 1 small letter, 1 number and greater then 8 characters</Text>
              <Text style={{color:"red", marginTop:5}}>{error}</Text>
              <TouchableOpacity style={SignUpStyle.submitLink} onPress={() => handleSignUp()}>
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