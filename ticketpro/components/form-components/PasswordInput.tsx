import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GreenCheck from '@/assets/icons/GreenCheck';
import EyeClosed from '@/assets/icons/EyeClosed';



const PasswordInput = () => {
    return (
        <View style={styles.passwordInputContainer}>
            <View style={styles.containerLeft}>
                <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 7.09, fontWeight: "400" }}>Password*</Text>
                <TextInput placeholder='*************' placeholderTextColor="rgba(51, 51, 51, 1)" />
            </View>
            <View style={styles.containerRight}>
                <GreenCheck />
                <View>
                    <EyeClosed />
                </View>
            </View>
        </View>
    )
}

export default PasswordInput

const styles = StyleSheet.create({
    passwordInputContainer: {
        height: hp((61 / 812) * 100),
        borderRadius: 5,
        paddingHorizontal: wp((12 / 370) * 100),
        borderColor: "rgba(203, 203, 203, 1)",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18.66
    },
    containerLeft: {
        width: "80%"
    },
    containerRight: {
        width: "20%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})