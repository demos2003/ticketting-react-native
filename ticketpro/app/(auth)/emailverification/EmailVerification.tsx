import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmailVerificationStyle } from './EmailVerificationStyle';
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { router } from 'expo-router';

const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputs = useRef<TextInput[]>(Array(4).fill(null)); // Ensure it's 4, not 6

  useEffect(() => {
    // Check if all OTP inputs are filled
    if (otp.every(digit => digit !== "")) {
      router.push('/contactinformation/ContactInformation'); // Replace with your actual route
    }
  }, [otp]);


  const handleOtpChange = (index: number, value: string) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    // Move to the next input field if a digit is entered
    if (value && index < 3 && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    }

    setOtp(updatedOtp);
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && otpInputs.current[index - 1]) {
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView>
      <View style={EmailVerificationStyle.container}>
        <View style={EmailVerificationStyle.navSection}>
          <BackNavIcon />
        </View>
        <View style={EmailVerificationStyle.formSection}>
          <View>
            <Text style={{ fontSize: 16.5, fontWeight: "700", marginBottom: 7 }}>Confirm Email</Text>
            <Text style={{ color: "rgba(51, 51, 51, 1)", fontWeight: "400", fontSize: 14.82 }}>
              We’ve sent a mail containing a four-digit code to <Text style={{ fontWeight: "700" }}>nwangs@ashjory.com.</Text>
            </Text>
          </View>
          <View style={{ marginTop: 30.86 }}>
            <Text style={{ color: "rgba(255, 152, 0, 1)" }}>Resend code in 30s</Text>
            <View style={EmailVerificationStyle.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref: any) => (otpInputs.current[index] = ref)}
                  style={EmailVerificationStyle.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ))}
            </View>
          </View>
          <View style={EmailVerificationStyle.privacyPrompt}>
            <Text style={{ color: "rgba(86, 86, 86, 1)" }}>By creating an account, you agree to Ashjory’s <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Terms & Conditions</Text> and <Text style={{ color: "rgba(63, 81, 181, 1)" }}>Privacy Policy</Text></Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;
