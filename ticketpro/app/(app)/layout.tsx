import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="favourites" options={{ headerShown: false }} />
      <Stack.Screen name="eventdetails/eventdetails" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="state/state" options={{ headerShown: false }} />
      <Stack.Screen name="state/stadiums" options={{ headerShown: false }} />
      <Stack.Screen name="adplacement/adplacement" options={{ headerShown: false }} />
      <Stack.Screen name="ticket/ticket" options={{ headerShown: false }} />
    </Stack>
  );
}