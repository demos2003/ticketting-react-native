import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";


interface NameInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ label, placeholder, value, onChangeText }) => {
    return (
        <View style={styles.emailInputContainer}>
            <View style={styles.containerLeft}>
                <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 7.09, fontWeight: "400" }}>{label}</Text>
                <TextInput placeholder={placeholder} placeholderTextColor="rgba(51, 51, 51, 1)" value={value}
                    onChangeText={onChangeText} />
            </View>

        </View>
    )
}

export default NameInput

const styles = StyleSheet.create({
    emailInputContainer: {
        height: hp((61 / 812) * 100),
        borderRadius: 5,
        paddingHorizontal: wp((12 / 370) * 100),
        borderColor: "rgba(203, 203, 203, 1)",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    containerLeft: {
        width: "90%"
    },
    containerRight: {
        width: "10%",
        display: "flex",
        alignItems: 'flex-end'
    }
})