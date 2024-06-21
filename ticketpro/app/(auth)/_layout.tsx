import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack  >
      <Stack.Screen name="signup/SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="emailverification/EmailVerification" options={{ headerShown: false }} />
      <Stack.Screen name="contactinformation/ContactInformation" options={{headerShown:false}}/>
      <Stack.Screen name="login/Login" options={{headerShown:false}}/>
      <Stack.Screen name="onboarding/Onboarding" options={{headerShown:false}}/>
    </Stack>
  );
}
