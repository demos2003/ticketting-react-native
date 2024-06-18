import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from 'expo-router';



interface AdProps {
    setAdModal: any;
}


const AdPlacementPopUp: React.FC<AdProps> = ({ setAdModal }) => {
    return (
        <View style={styles.modalContainer}>
            <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 16, fontWeight: "600" }}>Ad Placement</Text>
            <Text style={{ color: "rgba(0, 0, 0, 1)", fontWeight: "400", fontSize: 14 }}>
                Would you like to book a placement for your ad(s) at this event?
            </Text>
            <View >
                <TouchableOpacity style={styles.submitLink} onPress={() => router.push("adplacement/adplacement")}>
                    <Text style={{ color: "white" }}>Yes I’d like to</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitLink2} onPress={() => setAdModal(false)}>
                    <Text style={{ color: "rgba(63, 81, 181, 1)" }}>No, don’t worry</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AdPlacementPopUp

const styles = StyleSheet.create({
    modalContainer: {
        padding: 15
    },
    submitLink: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop:20,
        
    },
    submitLink2: {
        backgroundColor: "white",
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    },
})