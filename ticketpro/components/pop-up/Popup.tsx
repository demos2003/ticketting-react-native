import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import React, { useState } from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  interface PopupProps {
    children: React.ReactNode;
    trigger: boolean;
  }
  
  const PopupContainer: React.FC<PopupProps> = ({ children, trigger }) => {
    return trigger ? (
      <SafeAreaView style={styles.popupRoot}>
        <View style={styles.popup}>{children}</View>
      </SafeAreaView>
    ) : (
      ""
    );
  };
  
  export default PopupContainer;
  
  const styles = StyleSheet.create({
    popupRoot: {
      position: "absolute",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99,
      flex: 1,
      bottom: 0,
      top: 0, 
    },
    popup: {
      width: wp((300 / 370) * 100),
      paddingBottom: hp((16 / 852) * 100),
      backgroundColor: "white",
      opacity: 1,
      zIndex: 100,
      borderRadius: 10,
    
    },
  });
  