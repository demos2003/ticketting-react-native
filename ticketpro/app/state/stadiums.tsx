import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Sharedheader from '@/components/tabs-components/Sharedheader';
import { router, useLocalSearchParams } from "expo-router";
import SearchIcon from '@/assets/icons/SearchIcon';

const stadiums = () => {
    const { state, stadiums } = useLocalSearchParams();
    const stadiumList = typeof stadiums === 'string' ? JSON.parse(stadiums) : [];


    const images = [
        require("../../assets/images/BlueBackground.png"),
        require("../../assets/images/RedBackground.png"),
        require("../../assets/images/GreenBackground.png"),
        require("../../assets/images/OrangeBackground.png"),

    ];

    // Function to get a random image
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };
    return (
        <SafeAreaView style={styles.container}>
            <Sharedheader state={state} />
            <View style={styles.innnerContainer}>
                <View style={styles.searchBar}>
                    <SearchIcon />
                    <TextInput style={styles.searchInput} placeholder='Search for your favourites' />
                </View>
                <View style={styles.stadiumContainer}>
                    {
                        stadiumList.map((item: any) => (
                            <TouchableOpacity onPress={() => router.push({pathname:"/state/state", params:{stadium: item}})}>
                                <ImageBackground source={getRandomImage()} style={[styles.backgroundImg]}>
                                    <View style={styles.overlay}>
                                        <Text style={styles.stadium}>{item}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default stadiums

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    innnerContainer: {
        paddingLeft: wp((27.5 / 370) * 100),
        paddingRight: wp((27.5 / 370) * 100),
    },
    searchBar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(238, 238, 238, 1)",
        height: hp((48 / 812) * 100),
        borderRadius: 25,
        paddingLeft: wp((19.5 / 370) * 100),
        marginTop: 30,
        marginBottom: 30

    },
    searchInput: {
        width: "85%",
        marginLeft: 10
    },
    stadiumContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"

    },
    backgroundImg: {
        width: wp((155 / 375) * 100),
        height: 121,
        marginBottom: 10,


    },
    stadium: {
        color: 'white',
        fontSize: 16,
        fontWeight: "900",
        zIndex: 1
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 10,
        zIndex: 0,
        borderRadius: 10,
        overflow: "hidden"

    },

})