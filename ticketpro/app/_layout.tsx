import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="(tabs)" >
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="(auth)" options={{headerShown:false}}/>
      <Stack.Screen name="favourites" options={{headerShown:false}}/>
      <Stack.Screen name="eventdetails" options={{headerShown:false}}/>
      <Stack.Screen name="payment" options={{headerShown:false}}/>
      <Stack.Screen name="state/state" options={{headerShown:false}}/>
    </Stack>
  );
}
