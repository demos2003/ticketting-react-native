import { Stack } from "expo-router";
import { ScreenStack } from "react-native-screens";

export default function PaymentLayout() {
  return (
    <Stack  >
      {/* <Stack.Screen name="paymenttype" options={{headerShown:false}}/> */}
      <Stack.Screen name="paymentsummary" options={{headerShown:false}}/>
      <Stack.Screen name="adpayment" options={{headerShown:false}}/>
    </Stack>
  );
}
