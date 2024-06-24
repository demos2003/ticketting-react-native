import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchIcon from '@/assets/icons/SearchIcon';
import { router } from 'expo-router';


const Category = () => {


  const states = [
    { name: "Abia", stadiums: ["Abia Warriors Stadium", "Umuahia Township Stadium", "Enyimba International Stadium", "Ochendo International Stadium", "Aba Sports Stadium"] },
    { name: "Adamawa", stadiums: ["Yola Stadium", "Fintiri Stadium", "Mubi Township Stadium", "Numan Sports Complex", "Jimeta Stadium"] },
    { name: "AkwaIbom", stadiums: ["Godswill Akpabio Stadium", "Uyo Township Stadium", "Eket Sports Complex", "Ikot Ekpene Stadium", "Oron Stadium"] },
    { name: "Anambra", stadiums: ["Nnamdi Azikiwe Stadium", "Awka City Stadium", "Onitsha Stadium", "Nnewi Sports Complex", "Ekwulobia Stadium"] },
    { name: "Bauchi", stadiums: ["Abubakar Tafawa Balewa Stadium", "Bauchi Township Stadium", "Misau Stadium", "Azare Stadium", "Ganjuwa Stadium"] },
    { name: "Bayelsa", stadiums: ["Samson Siasia Stadium", "Yenagoa Township Stadium", "Nembe City Stadium", "Kaiama Stadium", "Ogbia Sports Complex"] },
    { name: "Benue", stadiums: ["Aper Aku Stadium", "Makurdi Township Stadium", "Otukpo Sports Complex", "Gboko Stadium", "Katsina-Ala Stadium"] },
    { name: "Borno", stadiums: ["Maiduguri Stadium", "El-Kanemi Warriors Stadium", "Biu Township Stadium", "Bama Stadium", "Kukawa Sports Complex"] },
    { name: "CrossRiver", stadiums: ["U. J. Esuene Stadium", "Calabar Stadium", "Ikom Township Stadium", "Ogoja Stadium", "Obudu Stadium"] },
    { name: "Delta", stadiums: ["Stephen Keshi Stadium", "Warri Township Stadium", "Sapele Stadium", "Asaba Stadium", "Ughelli Stadium"] },
    { name: "Ebonyi", stadiums: ["Abakaliki Stadium", "Ebonyi Township Stadium", "Afikpo Stadium", "Ikwo Sports Complex", "Ezza Stadium"] },
    { name: "Edo", stadiums: ["Samuel Ogbemudia Stadium", "Benin City Stadium", "Auchi Stadium", "Ekpoma Sports Complex", "Uromi Stadium"] },
    { name: "Ekiti", stadiums: ["Oluyemi Kayode Stadium", "Ado-Ekiti Stadium", "Ikere Sports Complex", "Iyin-Ekiti Stadium", "Igbara-Odo Stadium"] },
    { name: "Enugu", stadiums: ["Nnamdi Azikiwe Stadium", "Enugu Township Stadium", "Nsukka Sports Complex", "Oji River Stadium", "Agbani Stadium"] },
    { name: "Gombe", stadiums: ["Pantami Stadium", "Gombe Township Stadium", "Kaltungo Stadium", "Bajoga Sports Complex", "Deba Stadium"] },
    { name: "Imo", stadiums: ["Dan Anyiam Stadium", "Owerri Township Stadium", "Orlu Stadium", "Okigwe Stadium", "Mbaitoli Sports Complex"] },
    { name: "Jigawa", stadiums: ["Dutse Stadium", "Hadejia Stadium", "Gumel Sports Complex", "Ringim Stadium", "Birnin Kudu Stadium"] },
    { name: "Kaduna", stadiums: ["Ahmadu Bello Stadium", "Kaduna Township Stadium", "Zaria Stadium", "Kafanchan Sports Complex", "Makarfi Stadium"] },
    { name: "Kano", stadiums: ["Sani Abacha Stadium", "Kano Pillars Stadium", "Bichi Stadium", "Gaya Sports Complex", "Wudil Stadium"] },
    { name: "Katsina", stadiums: ["Katsina Township Stadium", "Daura Stadium", "Funtua Sports Complex", "Malumfashi Stadium", "Dutsin-Ma Stadium"] },
    { name: "Kebbi", stadiums: ["Birnin Kebbi Stadium", "Argungu Stadium", "Yauri Sports Complex", "Zuru Stadium", "Jega Stadium"] },
    { name: "Kogi", stadiums: ["Lokoja Stadium", "Ajaokuta Stadium", "Idah Sports Complex", "Okene Stadium", "Kabba Stadium"] },
    { name: "Kwara", stadiums: ["Ilorin Township Stadium", "Offa Stadium", "Jebba Sports Complex", "Patigi Stadium", "Kaiama Stadium"] },
    { name: "Lagos", stadiums: ["Teslim Balogun Stadium", "Agege Stadium", "Onikan Stadium", "National Stadium Lagos", "Mobolaji Johnson Arena"] },
    { name: "Nasarawa", stadiums: ["Lafia Township Stadium", "Keffi Stadium", "Akwanga Sports Complex", "Nasarawa Eggon Stadium", "Doma Stadium"] },
    { name: "Niger", stadiums: ["Bako Kontagora Stadium", "Suleja Stadium", "Minna Township Stadium", "Kontagora Sports Complex", "Bida Stadium"] },
    { name: "Ogun", stadiums: ["Gateway International Stadium", "Abeokuta Township Stadium", "Ijebu-Ode Stadium", "Shagamu Stadium", "Ota Sports Complex"] },
    { name: "Ondo", stadiums: ["Akure Township Stadium", "Ondo City Stadium", "Owo Stadium", "Ikare-Akoko Stadium", "Okitipupa Stadium"] },
    { name: "Osun", stadiums: ["Osogbo Township Stadium", "Ile-Ife Stadium", "Ilesha Stadium", "Ede Sports Complex", "Iwo Stadium"] },
    { name: "Oyo", stadiums: ["Lekan Salami Stadium", "Ibadan Recreation Club", "Saki Stadium", "Ogbomoso Township Stadium", "Oyo Sports Complex"] },
    { name: "Plateau", stadiums: ["Rwang Pam Stadium", "Jos Township Stadium", "Bukuru Stadium", "Pankshin Sports Complex", "Shendam Stadium"] },
    { name: "Rivers", stadiums: ["Adokiye Amiesimaka Stadium", "Yakubu Gowon Stadium", "Port Harcourt Stadium", "Bonny Stadium", "Bori Stadium"] },
    { name: "Sokoto", stadiums: ["Sokoto Stadium", "Gusau Stadium", "Gwadabawa Sports Complex", "Wamako Stadium", "Tambuwal Stadium"] },
    { name: "Taraba", stadiums: ["Jalingo Stadium", "Wukari Stadium", "Bali Sports Complex", "Gembu Stadium", "Ibi Stadium"] },
    { name: "Yobe", stadiums: ["Damaturu Stadium", "Gashua Stadium", "Potiskum Sports Complex", "Nguru Stadium", "Buni Yadi Stadium"] },
    { name: "Zamfara", stadiums: ["Gusau Township Stadium", "Kaura Namoda Stadium", "Talata Mafara Sports Complex", "Zuguruma Stadium", "Anka Stadium"] }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.innnerContainer}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput style={styles.searchInput} placeholder='Search for your favourites' />
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {
            states.map((state) => (
              <TouchableOpacity style={styles.statePill} key={state.name}  onPress={() => router.push({ pathname: "/state/stadiums", params: { state: state.name, stadiums: JSON.stringify(state.stadiums)} })}><Text>
                {state.name}
              </Text></TouchableOpacity>
            ))
          }

        </ScrollView>
      </View>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%"
  },
  innnerContainer: {
    paddingLeft: wp((27.5 / 370) * 100),
    paddingRight: wp((27.5 / 370) * 100),
    marginTop: hp((29 / 812) * 100),
  },
  statePill: {
    backgroundColor: "white",
    width: "45%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
    borderBlockColor: "grey",
    borderWidth: 1
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  searchInput: {
    width: "85%",
    marginLeft: 10
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(238, 238, 238, 1)",
    height: hp((48 / 812) * 100),
    borderRadius: 25,
    paddingLeft: wp((19.5 / 370) * 100),
    marginBottom: 30

  },
})