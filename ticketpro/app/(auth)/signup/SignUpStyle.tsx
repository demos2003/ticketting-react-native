import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const SignUpStyle = StyleSheet.create({
   container:{
    paddingLeft:wp((27.5/370)*100),
    paddingRight:wp((27.5/370)*100),
    marginTop:hp((33.32/812)*100),
    height:"100%"
   },
   navSection:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
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
    position:"absolute",
    bottom:"-85%"
   }
});
