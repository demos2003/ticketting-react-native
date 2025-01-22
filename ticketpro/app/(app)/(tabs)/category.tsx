import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchIcon from '@/assets/icons/SearchIcon';
import { useGetBookedAdsQuery } from '@/api/features/ad/adSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Category = () => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setId(userId);
      } catch (error) {
        console.error('Error fetching userId', error);
      }
    };
    fetchUserId();
  }, []);

  const { data: bookedAds, error, isLoading } = useGetBookedAdsQuery(id);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput style={styles.searchInput} placeholder="Search for your favourites" />
        </View>

        {/* ScrollView to display booked ads */}
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {/* Show loading state */}
          {isLoading && <Text style={styles.loadingText}>Loading ads...</Text>}

          {/* Show error state */}
          {error && <Text style={styles.errorText}>Error fetching ads</Text>}

          {/* Render booked ads if data is available */}
          {bookedAds?.length > 0 ? (
            bookedAds.map((ad: any) => (
              <View key={ad.id} style={styles.card}>
                <Text style={styles.cardTitle}>{ad.businessName} Ad</Text>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Price:</Text>
                  <Text style={styles.cardValue}>N{ad.adSpace.price}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Quantity:</Text>
                  <Text style={styles.cardValue}>{ad.quantity}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Ad Space Type:</Text>
                  <Text style={styles.cardValue}>{ad.adSpace.name}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Size:</Text>
                  <Text style={styles.cardValue}>{ad.adSpace.size}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Location:</Text>
                  <Text style={styles.cardValue}>{ad.adSpace?.location?.stadiumName}</Text>
                </View>
              </View>
            ))
          ) : (
            !isLoading && <Text style={styles.noAdsText}>No ads found.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  innerContainer: {
    paddingLeft: wp((27.5 / 370) * 100),
    paddingRight: wp((27.5 / 370) * 100),
    marginTop: hp((29 / 812) * 100),
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderColor:'rgba(238, 238, 238, 1)',
    borderWidth:1
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(238, 238, 238, 1)",
    height: hp((48 / 812) * 100),
    borderRadius: 25,
    paddingLeft: wp((19.5 / 370) * 100),
    marginBottom: 30,
  },
  searchInput: {
    width: "85%",
    marginLeft: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noAdsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
