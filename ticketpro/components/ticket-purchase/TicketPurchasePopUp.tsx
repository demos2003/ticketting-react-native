import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DecrementIcon from '@/assets/icons/DecrementIcon'
import IncrementIcon from '@/assets/icons/IncrementIcon'
import CancelIcon from '@/assets/icons/CancelIcon'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MinusIcon from '@/assets/icons/MinusIcon'
import PlusIcon from '@/assets/icons/PlusIcon'
import TicketRepIcon from '@/assets/icons/TicketRepIcon'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

interface TicketProps{
    setTicketModal : any;
}

const TicketPurchasePopUp:React.FC<TicketProps> = ({setTicketModal}) => {
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const maxTickets = 10; // Set your maximum ticket limit here

    const incrementTicket = () => {
        if (ticketQuantity < maxTickets) {
            setTicketQuantity(ticketQuantity + 1);
        }
    };

    const decrementTicket = () => {
        if (ticketQuantity > 1) {
            setTicketQuantity(ticketQuantity - 1);
        }
    };

    

    return (
        <View>
            <View style={styles.topSection}>
                <View style={styles.ticketIncrement}>
                    <TouchableOpacity>
                        <DecrementIcon />
                    </TouchableOpacity>
                    <Text>VIP - $10</Text>
                    <TouchableOpacity >
                        <IncrementIcon />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setTicketModal(false)}><CancelIcon /></TouchableOpacity>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.ticketQnty}>
                    <TouchableOpacity onPress={decrementTicket} style={styles.incrementBtn}>
                        <MinusIcon ticketQuantity={ticketQuantity} />
                    </TouchableOpacity>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                        <TicketRepIcon />
                        {
                            ticketQuantity < 2 ? (null) : (
                                <Text style={{ marginLeft: 10, color: "grey", fontSize: 20 }}>x{ticketQuantity}</Text>
                            )
                        }

                    </View>
                    <TouchableOpacity onPress={incrementTicket}  style={styles.incrementBtn}>
                        <PlusIcon ticketQuantity={ticketQuantity} maxTickets={maxTickets}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.submitLink} onPress={() => router.push("payment/paymentsummary")}>
                    <Text style={{ color: "white" }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TicketPurchasePopUp

const styles = StyleSheet.create({
    topSection: {
        height: 63,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomColor: "rgba(210, 210, 210, 1)",
        borderBottomWidth: 1
    },
    ticketIncrement: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: wp((162 / 370) * 100),
        justifyContent: "space-between"
    },
    bottomSection: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    ticketQnty: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    submitLink: {
        backgroundColor: "rgba(63, 81, 181, 1)",
        height: hp((51 / 812) * 100),
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    incrementBtn:{
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center"
    }
})
