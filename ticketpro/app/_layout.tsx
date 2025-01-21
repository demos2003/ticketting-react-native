import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState } from "@/api/features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { Providers } from "@/api/provider";


function RootLayoutNav() {
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const segments = useSegments();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const emailVerified = await AsyncStorage.getItem('emailVerified');
        dispatch(setAuthState({
          isAuthenticated: !!token && emailVerified === 'true',
          accessToken: token,
          emailVerified: emailVerified === 'true'
        }));
      } catch (error) {
        console.error('Failed to fetch authentication data', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  const navigateBasedOnAuth = useCallback(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login/Login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(app)/(tabs)/homepage");
    }
  }, [isAuthenticated, segments, isLoading, router]);

  useEffect(() => {
    navigateBasedOnAuth();
  }, [navigateBasedOnAuth]);

  if (isLoading) {
    return <Text>Loading....</Text>;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
     
    <Providers>
      <RootLayoutNav />
    </Providers>

  );
}
