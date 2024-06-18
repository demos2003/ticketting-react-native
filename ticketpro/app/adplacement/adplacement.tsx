import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from 'react-native-safe-area-context';
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { Dropdown } from 'react-native-element-dropdown';
import { router } from 'expo-router';




const durations = [
  { label: '2 hours', value: '2hrs' },
  { label: '3 hours', value: '3hrs' },
  { label: '4 hours', value: '4hrs' },
  { label: '5 hours', value: '5hrs' },
  { label: '6 hours', value: '6hrs' },
  { label: '7 hours', value: '7hrs' },
  { label: '8 hours', value: '8hrs' },
  { label: '9 hours', value: '9hrs' },
];

const adSizes = [
  { label: '20 x 20', value: '20x20' },
  { label: '30 x 30', value: '30x30' },
  { label: '40 x 40', value: '40x40' },
  { label: '50 x 50', value: '50x50' },
  { label: '60 x 60', value: '60x60' },
  { label: '70 x 70', value: '70x70' },
  { label: '80 x 80', value: '80x80' },
  { label: '90 x 90', value: '90x90' },
];




const adplacement = () => {
  const [size, setSize] = useState("")
  const [duration, setDuration] = useState("")
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innnerContainer}>
        <View style={styles.topNav}>
          <BackNavIcon />
          <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 16, fontWeight: "600" }}>Ad Placement</Text>
        </View>
        <View style={styles.adForm}>
          <Text style={{ marginBottom: 20 }}>Contact Information</Text>
          <View>
            <View style={styles.emailInputContainer}>
              <View style={styles.containerLeft}>
                <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 7.09, fontWeight: "400" }}>Company Name</Text>
                <TextInput placeholder='Mega care drycleaning' placeholderTextColor="rgba(51, 51, 51, 1)" />
              </View>
            </View>

            <View style={styles.emailInputContainer2}>
              <View style={styles.containerLeft}>
                <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 7.09, fontWeight: "400", marginTop: 10 }}>Product Description</Text>
                <TextInput placeholder='Tell us about your product/company' placeholderTextColor="rgba(51, 51, 51, 1)" multiline style={styles.textArea} />
              </View>
            </View>

            <Dropdown
              style={[styles.input]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={adSizes}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!size ? "Ad Size" : ""}
              searchPlaceholder="Search..."
              value={size}
              onChange={(item: any) => {
                setSize(item.value);
              }}
            />

            <Dropdown
              style={[styles.input]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={durations}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!duration ? "Duration" : ""}
              searchPlaceholder="Search..."
              value={duration}
              onChange={(item: any) => {
                setDuration(item.value);
              }}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.submitLink} onPress={() => router.push("payment/paymenttype")}>
          <Text style={{ color: "white" }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default adplacement

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  innnerContainer: {
    paddingLeft: wp((27.5 / 370) * 100),
    paddingRight: wp((27.5 / 370) * 100),
    marginTop: hp((29 / 812) * 100),
  },
  topNav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: wp((215 / 370) * 100),
    justifyContent: "space-between"
  },
  emailInputContainer: {
    height: hp((61 / 812) * 100),
    borderRadius: 5,
    paddingHorizontal: wp((12 / 370) * 100),
    borderColor: "rgba(203, 203, 203, 1)",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  emailInputContainer2: {
    height: hp((91 / 812) * 100),
    borderRadius: 5,
    paddingHorizontal: wp((12 / 370) * 100),
    borderColor: "rgba(203, 203, 203, 1)",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    marginBottom: 20

  },
  containerLeft: {
    width: "100%"
  },
  textArea: {
    justifyContent: 'flex-start',
    textAlignVertical: 'top',

  },
  input: {
    height: hp((61 / 812) * 100),
    borderColor: "rgba(203, 203, 203, 1)",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: wp((16 / 393) * 100),
    paddingRight: wp((16 / 393) * 100),
    fontSize: 16,
    marginBottom: 20
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#6C7275",
    // fontWeight: "600",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: hp((40 / 852) * 100),
    fontSize: 16,
  },
  adForm: {
    marginTop: hp((28 / 812) * 100)
  },
  submitLink: {
    backgroundColor: "rgba(63, 81, 181, 1)",
    marginTop: hp((60 / 812) * 100),
    height: hp((51 / 812) * 100),
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

}
})