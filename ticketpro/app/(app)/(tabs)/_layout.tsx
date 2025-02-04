
import React, {useState} from 'react'
import { Tabs } from 'expo-router'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Platform, View, Text } from 'react-native';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import ExploreIcon from '@/assets/icons/ExpoloreIcon';
import HomeIcon from '@/assets/icons/HomeIcon';
import TicketIcon from '@/assets/icons/TicketIcon';
import Sharedheader from '@/components/tabs-components/Sharedheader';
import { StatusBar } from 'expo-status-bar';

const TabsLayout = () => {
  const [activeTab, setActiveTab] = useState('homepage');

  const handleTabChange = (tab:any) => {
    setActiveTab(tab);
  };

  return (
    <View style={{ flex: 1 , backgroundColor:"white"}}>
      <StatusBar backgroundColor="grey"/>
      <Sharedheader activeTab={activeTab} />
      <Tabs
        initialRouteName='homepage'
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            paddingTop:12,
            marginLeft:20,
            marginRight:20,
            bottom:30,
            backgroundColor: "rgba(63, 81, 181, 1)",
            height: hp((64 / 852) * 100),
            borderRadius: 16,
            borderTopWidth: 0,
            elevation: 10, 
            ...Platform.select({
              ios: {
                flexDirection: "row",
                alignItems: "center",
              },
              android: {},
            }),
          },
        }}
      >

        <Tabs.Screen name='homepage'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <HomeIcon focused={focused} />
            ),
          }}
          listeners={{
            tabPress:(e) => {
              handleTabChange('homepage')
            }
          }}
        />



        <Tabs.Screen name='category'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <ExploreIcon focused={focused} />
            ),
          }}
          listeners={{
            tabPress:(e) => {
              handleTabChange('category')
            }
          }}

        />
        <Tabs.Screen name='(tickets)'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TicketIcon focused={focused} />
            ),
          }}
          listeners={{
            tabPress:(e) => {
              handleTabChange('tickets')
            }
          }}
        />
         {/* <Tabs.Screen name='favourites'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Favourite focused={focused} />
            ),
          }}
          listeners={{
            tabPress:(e) => {
              handleTabChange('favourites')
            }
          }}
        /> */}
        <Tabs.Screen name='profile'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <ProfileIcon focused={focused} />
            ),
          }}
          listeners={{
            tabPress:(e) => {
              handleTabChange('profile')
            }
          }}
        />
       
      </Tabs>
    </View>

  )

}

export default TabsLayout

