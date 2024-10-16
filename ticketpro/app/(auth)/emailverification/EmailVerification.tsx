import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmailVerificationStyle } from './EmailVerificationStyle';
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { router, useLocalSearchParams } from 'expo-router';
import { useValidateEmailMutation } from '@/api/features/auth/authApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseDispatch, useDispatch } from 'react-redux';
import { setAuthenticated, setEmailVerified } from '@/api/features/auth/authSlice';


const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [disableRetry, setDisableRetry] = useState(true); // State to disable retry button
  const [countdown, setCountdown] = useState(30); // Countdown timer
  const { email } = useLocalSearchParams();
  const otpInputs = useRef<TextInput[]>(Array(4).fill(null));
  const [validateOtp] = useValidateEmailMutation();
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch();


  useEffect(() => {
    // Countdown timer logic
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDisableRetry(false); // Enable retry button when countdown reaches zero
    }
  }, [countdown]);


  useEffect(() => {
    const validateOtpAsync = async () => {
      if (otp.every(digit => digit !== "")) {
        try {
          const response = await validateOtp({ email, otp: otp.join("") }).unwrap();
          if (response === 'otp is valid') {
            await AsyncStorage.setItem('emailVerified', 'true');
             dispatch(setEmailVerified(true))
             dispatch(setAuthenticated(true))
            router.replace("/(app)/(tabs)/homepage");
          } else {
            setErrorMsg("OTP verification fialed")
          }
        } catch (err) {
          setErrorMsg("Something went wrong")
        }
      }
    };

    validateOtpAsync();
  }, [otp, email, validateOtp]);

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

  const handleRetry = () => {
    setDisableRetry(true); // Disable retry button again
    setCountdown(30); // Reset countdown
  };


  console.log(otp)

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
            {
              countdown === 0 ? (
                <TouchableOpacity
                  onPress={handleRetry}
                  disabled={disableRetry}
                >
                  <Text style={{ color: "rgba(51, 51, 51, 1)", fontWeight: "400", fontSize: 14.82 }}>Retry</Text>
                </TouchableOpacity>
              ) : (
                <Text style={{ color: "rgba(255, 152, 0, 1)" }}>Resend code in {countdown}s</Text>
              )
            }

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
            <Text>{errorMsg}</Text>
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
