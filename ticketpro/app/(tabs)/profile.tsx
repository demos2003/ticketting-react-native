import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import EditProfileIcon from '@/assets/icons/EditProfileIcon';
import SecurityIcon from '@/assets/icons/SecurityIcon';
import Notification from '@/assets/icons/Notification';
import FAQIcon from '@/assets/icons/FAQIcon';
import TermsIcon from '@/assets/icons/TermsIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import SignOutIcon from '@/assets/icons/SignOutIcon';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <View style={styles.profileItems}>
          <EditProfileIcon/>
          <Text style={{marginLeft:10, color:"rgba(63, 81, 181, 1)"}}>Edit Profile</Text>
        </View >
        <View style={styles.profileItems}>
           <SecurityIcon/>
          <Text style={{marginLeft:10}}>Change Password</Text>
        </View>
        <View style={styles.profileItems}>
          <Notification/>
          <Text style={{marginLeft:10}}>Notifications</Text>
        </View>
        <View style={styles.profileItems}>
          <FAQIcon/>
          <Text style={{marginLeft:10}}>FAQs</Text>
        </View>
        <View style={styles.profileItems}>
          <FAQIcon/>
          <Text style={{marginLeft:10}}>Contact us</Text>
        </View>
        <View style={styles.profileItems}>
          <TermsIcon/>
          <Text style={{marginLeft:10}}>Terms and Conditions</Text>
        </View>
        <View style={styles.profileItems}>
          <SecurityIcon/>
          <Text style={{marginLeft:10}}>Privacy Policy</Text>
        </View>
        <View style={styles.profileItems}>
          <DeleteIcon/>
          <Text style={{marginLeft:10, color:"rgba(251, 24, 3, 1)"}}>Deactivate Account</Text>
        </View>
        <View style={styles.profileItems}>
          <SignOutIcon/>
          <Text style={{marginLeft:10, color:"rgba(251, 24, 3, 1)"}}>Sign Out</Text>
        </View>
      </View>
    </View>
  )
}

export default Profile

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
  profileItems:{
    display:"flex",
    flexDirection:"row",
    height:50,
    alignItems:"center",
    borderBottomColor:"rgba(235, 235, 235, 1)",
    borderBottomWidth:1
  }
})