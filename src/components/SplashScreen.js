import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  const navigation = useNavigation();

  const [isUserLogin, setUserLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged(user => {
        console.log(user);
        if (user !== null) {
          navigation.replace('HomeScreenTab');
        } else {
          navigation.replace('LoginScreen');
        }
      });
    }, 400);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={'#000'} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
