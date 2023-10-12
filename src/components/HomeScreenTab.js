import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import LogoutScreen from '../screen/LogoutScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const HomeScreenTab = () => {
  return (
    <Tab.Navigator initialRouteName={HomeScreen}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreenTab;

const styles = StyleSheet.create({});
