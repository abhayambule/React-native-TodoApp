import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HomeScreen from './src/screen/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogInScreen from './src/screen/LogInScreen';
import Auth from '@react-native-firebase/auth';
import HomeScreenTab from './src/components/HomeScreenTab';
import SplashScreen from './src/components/SplashScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.mainCointainer}>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LogInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreenTab"
            component={HomeScreenTab}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  mainCointainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
});
