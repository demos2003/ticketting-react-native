import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AshjoryLogo2 from '@/assets/icons/AshjoryLogo2'
import LocationIncon from '@/assets/icons/LocationIcon'
import BellIcon from '@/assets/icons/BellIcon'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";


interface TabProps {
    activeTab?: any;
    state?: any;
    stadium?: any;
}


const Sharedheader: React.FC<TabProps> = ({ activeTab, state, stadium }) => {
    const containerStyle = activeTab === 'profile' ? styles.profileContainerStyle : styles.container;

    const renderLocationOrTabName = () => {
        switch (activeTab) {
            case 'profile':
                return <Text style={styles.tabNameText}>Profile</Text>;
            case 'tickets':
                return <Text style={styles.tabNameText}>Bookings</Text>;
            case 'category':
                return <Text style={styles.tabNameText}>Explore States</Text>;
            default:
                return (
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <LocationIncon />
                        <Text style={{ marginLeft: wp((11.5 / 375) * 100), fontWeight: "500", color: "rgba(51, 51, 51, 1)" }}>
                        {state ? state : (stadium ? stadium : "Lagos")}
                        </Text>
                    </View>
                );
        }
    };

    return (
        <View >
            <View style={containerStyle}>
                <View>
                    <AshjoryLogo2 />
                </View>
                {renderLocationOrTabName()}
                {
                    activeTab === "profile" ? null : (
                        <View>
                            <BellIcon />
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default Sharedheader

const styles = StyleSheet.create({
    container: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        marginTop: hp((45.32 / 812) * 100),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    profileContainerStyle: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
        marginTop: hp((40.32 / 812) * 100),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp((232 / 370) * 100),
        alignItems: "center"
    },
    tabNameText: {
        // text styles for the tab name
        fontWeight: "500",
        color: "rgba(51, 51, 51, 1)",
        fontSize: 17
        // Add any other styles you want for the tab name text
    }
})