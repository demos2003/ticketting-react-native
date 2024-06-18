import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const LoginStyle = StyleSheet.create({
   container:{
    paddingLeft:wp((27.5/370)*100),
    paddingRight:wp((27.5/370)*100),
    marginTop:hp((33.32/812)*100),
    height:"100%"
   },
   navSection:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"center",
   },
   formSection:{
    marginTop:hp((32/812)*100)
   },
   formContainer:{
    marginTop:hp((17.91/812)*100)
   },
   submitLink:{
    backgroundColor:"rgba(63, 81, 181, 1)",
    marginTop:hp((17.91/812)*100),
    height:hp((51/812)*100),
    borderRadius:8,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
   },

   privacyPrompt:{
      marginTop:460,
      fontSize:12

   },
   otpInput: {
    width: wp((56 / 370) * 100),
    height: hp((62 / 812) * 100),
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: wp((2.5 / 393) * 100),
    textAlign: 'center',
    fontSize: 16,
    borderColor: 'rgba(203, 203, 203, 1)',
    
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
