import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import React from "react";

export default function AuthLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false); // Default to false
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunchedBefore');
        
        if (hasLaunched === null) {
          // First time user
          await AsyncStorage.setItem('hasLaunchedBefore', 'true');
          setIsFirstTime(true);
        } else {
          // Returning user
          setIsFirstTime(false);
        }
      } catch (error) {
        console.error('Error checking first time user:', error);
      } finally {
        // Set loading to false immediately after checking
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isFirstTime) {
        router.replace('/onboarding/Onboarding'); // Navigate to onboarding for first-time users
      } else {
        router.replace('/login/Login'); // Navigate to login for returning users
      }
    }
  }, [isLoading, isFirstTime]); // Depend on loading and first-time state

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white' // Add background color
      }}>
        <ActivityIndicator 
          size="large" 
          color="#000" // Or your app's primary color
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* This part will not be rendered because of the above navigation logic */}
      <Stack.Screen name="login/Login" />
      <Stack.Screen name="signup/SignUp" />
      <Stack.Screen name="emailverification/EmailVerification" />
      <Stack.Screen name="contactinformation/ContactInformation" />
    </Stack>
  );
}
