import { Stack } from "expo-router";
import { Providers } from "@/api/provider";


export default function RootLayout() {
  return (
    <Providers>
      <Stack initialRouteName="(tabs)" >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="favourites" options={{ headerShown: false }} />
        <Stack.Screen name="eventdetails/eventdetails" options={{ headerShown: false }} />
        <Stack.Screen name="payment" options={{ headerShown: false }} />
        <Stack.Screen name="state/state" options={{ headerShown: false }} />
        <Stack.Screen name="state/stadiums" options={{ headerShown: false }} />
        <Stack.Screen name="adplacement/adplacement" options={{ headerShown: false }} />
        <Stack.Screen name="ticket/ticket" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
