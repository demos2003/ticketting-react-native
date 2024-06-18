import { Stack } from "expo-router";

export default function EventDetailsLayout() {
  return (
    <Stack>
      <Stack.Screen name="eventdetails" options={{headerShown:false}}/>
    </Stack>
  );
}
