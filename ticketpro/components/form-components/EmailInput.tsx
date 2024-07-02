import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GreenCheck from '@/assets/icons/GreenCheck';


interface EmailProps {
    value: string;
    onChangeText: (text: string) => void;
}


const EmailInput: React.FC<EmailProps> = ({ value, onChangeText }) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(validateEmail(value));
    }, [value]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    return (
        <View style={styles.emailInputContainer}>
            <View style={styles.containerLeft}>
                <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 7.09, fontWeight: "400" }}>Email</Text>
                <TextInput value={value} onChangeText={onChangeText} placeholder='ladenas202@gmail.com' placeholderTextColor="rgba(51, 51, 51, 1)" />
            </View>
            <View style={styles.containerRight}>
                {value.length > 0 ? (<GreenCheck isValid={isValid} />) : null}
            </View>
        </View>
    )
}

export default EmailInput

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