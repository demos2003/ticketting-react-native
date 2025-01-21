import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  FlatList, 
  Platform,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from "react-native-responsive-screen";
import { SafeAreaView } from 'react-native-safe-area-context';
import BackNavIcon from '@/assets/icons/BackNavIcon';
import { Dropdown } from 'react-native-element-dropdown';
import { router } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useGetAllLocationsQuery } from '@/api/features/location/locationSlice';
import { useGetAdSpacedByLocationIdQuery } from '@/api/features/ad/adSlice';


// Typed interfaces for data structures
interface Location {
  id: string;
  stadiumName: string;
}

interface AdOption {
  id: string;
  locationId: string;
  name: string;
  size: string;
  availableQuantity: number;
  price:number
}


const AdPlacement: React.FC = () => {
  // State management with proper typing
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  // const [availableAds, setAvailableAds] = useState<AdOption[]>([]);
  const [selectedAd, setSelectedAd] = useState<AdOption | null>(null);
  const [adQuantity, setAdQuantity] = useState<number>(1);


  
  // Separate date and time states
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  
  // Date and time picker visibility states
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);

  // Memoized and optimized ad fetching


  // Location selection handler with enhanced type safety
  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
    // Reset ad selection when location changes
    setSelectedAd(null);
    setAdQuantity(1);
  }, []);

  // Ad selection handler
  const handleAdSelect = useCallback((ad: AdOption) => {
    setSelectedAd(ad);
    // Reset quantity when a new ad is selected
    setAdQuantity(1);
  }, []);

  // Quantity adjustment with safety checks
  const adjustQuantity = useCallback((delta: number) => {
    if (!selectedAd) return;
    
    const newQuantity = Math.max(1, Math.min(
      selectedAd.availableQuantity, 
      adQuantity + delta
    ));
    
    setAdQuantity(newQuantity);
  }, [adQuantity, selectedAd]);

  // Date change handlers
  const handleStartDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
    }
    
    setStartDate(currentDate);
  }, [startDate]);

  const handleStartTimeChange = useCallback((event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || startTime;
    
    if (Platform.OS === 'android') {
      setShowStartTimePicker(false);
    }
    
    setStartTime(currentTime);
  }, [startTime]);

  const handleEndDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    
    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }
    
    setEndDate(currentDate);
  }, [endDate]);

  const handleEndTimeChange = useCallback((event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || endTime;
    
    if (Platform.OS === 'android') {
      setShowEndTimePicker(false);
    }
    
    setEndTime(currentTime);
  }, [endTime]);

  const { data: locations, error: locError, isLoading: locLoading } = useGetAllLocationsQuery({});
  const { 
    data: availableAds, 
    error: adError, 
    isLoading: adLoading 
  } = useGetAdSpacedByLocationIdQuery(
    selectedLocation?.id || '', 
    { skip: !selectedLocation }
  );


  // Validation before proceeding to payment
  const handleContinue = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('Error', 'Please select a location');
      return;
    }
    
    if (!selectedAd) {
      Alert.alert('Error', 'Please select an ad option');
      return;
    }

  
    
    // Combine date and time for full datetime
    const combinedStartDateTime = new Date(
      startDate.getFullYear(), 
      startDate.getMonth(), 
      startDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );

    const combinedEndDateTime = new Date(
      endDate.getFullYear(), 
      endDate.getMonth(), 
      endDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    );

    if (combinedStartDateTime >= combinedEndDateTime) {
      Alert.alert('Error', 'End date and time must be after start date and time');
      return;
    }
    
    router.push({
      pathname: '/payment/adpayment',
      params: {
        adSpaceId:selectedAd.id,
        adQuantity,
        startDateTime: combinedStartDateTime.toISOString(),
        endDateTime: combinedEndDateTime.toISOString(),
        location: selectedLocation.stadiumName,
        adType: selectedAd.name,
        adSize: selectedAd.size,
        adPrice: selectedAd.price

        
      }
    });
  }, [selectedLocation, selectedAd, startDate, startTime, endDate, endTime]);

  // Render ad option item
  const renderAdOption = useCallback(({ item }: { item: AdOption }) => (
    <TouchableOpacity 
      style={[
        styles.adOptionContainer, 
        selectedAd?.id === item.id && styles.selectedAdOption
      ]}
      onPress={() => handleAdSelect(item)}
    >
      <Text style={styles.adOptionText}>{item.name} - {item.size}</Text>
      <Text style={styles.adOptionSubtext}>Available: {item.availableQuantity}</Text>
    </TouchableOpacity>
  ), [selectedAd, handleAdSelect]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.topNav}>
          <BackNavIcon />
          <Text style={styles.headerText}>Ad Placement</Text>
        </View>
        <Text style={{marginTop:30, color:"rgba(63, 81, 181, 1)", fontWeight:"700"}}>Book an Ad for your business today</Text>

        <View style={styles.adForm}>

          {/* Location Dropdown */}
         <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={locations}
            labelField="stadiumName"
            valueField="id"
            placeholder="Select Location"
            value={selectedLocation?.id || null}
            onChange={handleLocationSelect}
          />

          {/* Available Ads List */}
          {selectedLocation && (
            <FlatList
              data={availableAds}
              renderItem={renderAdOption}
              keyExtractor={(item) => item.id}
              extraData={selectedAd}
              style={styles.adsList}
              ListEmptyComponent={
                <Text style={styles.emptyListText}>
                  No ads available for this location
                </Text>
              }
            />
          )}
          {/* Quantity Selector */}
          {selectedAd && (
          <View style={styles.quantityContainer}>
            <View >
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <Text style={styles.totalPriceLabel}>
                Total Price: N{(selectedAd.price * adQuantity).toFixed(2)}
              </Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                onPress={() => adjustQuantity(-1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{adQuantity}</Text>
              <TouchableOpacity 
                onPress={() => adjustQuantity(1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

          {/* Date and Time Pickers */}
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateRowContainer}>
              <View style={styles.dateColumnContainer}>
                <Text style={styles.dateTimeLabel}>Start Date:</Text>
                <TouchableOpacity 
                  onPress={() => setShowStartDatePicker(true)}
                  style={styles.dateTimePickerContainer}
                >
                  <Text style={styles.dateTimeDisplay}>
                    {startDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    onChange={handleStartDateChange}
                  />
                )}
              </View>

              <View style={styles.dateColumnContainer}>
                <Text style={styles.dateTimeLabel}>End Date:</Text>
                <TouchableOpacity 
                  onPress={() => setShowEndDatePicker(true)}
                  style={styles.dateTimePickerContainer}
                >
                  <Text style={styles.dateTimeDisplay}>
                    {endDate.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    onChange={handleEndDateChange}
                  />
                )}
              </View>
            </View>

            <View style={styles.dateRowContainer}>
              <View style={styles.dateColumnContainer}>
                <Text style={styles.dateTimeLabel}>Start Time:</Text>
                <TouchableOpacity 
                  onPress={() => setShowStartTimePicker(true)}
                  style={styles.dateTimePickerContainer}
                >
                  <Text style={styles.dateTimeDisplay}>
                    {startTime.toLocaleTimeString()}
                  </Text>
                </TouchableOpacity>
                {showStartTimePicker && (
                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    onChange={handleStartTimeChange}
                  />
                )}
              </View>

              <View style={styles.dateColumnContainer}>
                <Text style={styles.dateTimeLabel}>End Time:</Text>
                <TouchableOpacity 
                  onPress={() => setShowEndTimePicker(true)}
                  style={styles.dateTimePickerContainer}
                >
                  <Text style={styles.dateTimeDisplay}>
                    {endTime.toLocaleTimeString()}
                  </Text>
                </TouchableOpacity>
                {showEndTimePicker && (
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    onChange={handleEndTimeChange}
                  />
                )}
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.submitLink}
            onPress={handleContinue}
          >
            <Text style={styles.submitText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdPlacement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: wp((27.5 / 370) * 100),
    marginTop: hp((29 / 812) * 100),
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "rgba(0, 0, 0, 1)", 
    fontSize: 16, 
    fontWeight: "600"
  },
  adForm: {
    marginTop: hp((28 / 812) * 100),
  },
  input: {
    height: hp((61 / 812) * 100),
    borderColor: "rgba(203, 203, 203, 1)",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: wp((12 / 370) * 100),
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#6C7275",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  adOptionContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedAdOption: {
    backgroundColor: '#e0e0e0',
  },
  adOptionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  adOptionSubtext: {
    fontSize: 14,
    color: '#666',
  },
  adsList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#999',
    padding: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'rgba(63, 81, 181, 1)',
    borderRadius: 5,
    width:40,
    height:40,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",

  },
  quantityButtonText: {
    fontSize: 18,
    color:"white"
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  dateRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateColumnContainer: {
    width: '48%',
    height:50,
    marginBottom:25 // Slightly less than half to allow for spacing
  },
  dateTimeLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
    color:"rgba(63, 81, 181, 1)"
  },
  dateTimePickerContainer: {
    // flex: 1,

  },
  dateTimeDisplay: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  submitLink: {
    backgroundColor: "rgba(63, 81, 181, 1)",
    height: hp((51 / 812) * 100),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:30
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  adOptionPrice: {
    fontSize: 14,
    color: 'rgba(63, 81, 181, 1)',
    fontWeight: '600',
  },
  quantityLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalPriceLabel: {
    fontSize: 16,
    color: 'rgba(63, 81, 181, 1)',
    fontWeight: '600',
  },
});