import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        marginHorizontal: 20,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={async () => {
          await Auth().signOut();
          navigation.replace('LoginScreen');
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 6,
    paddingVertical: 6,
    marginVertical: 30,
    alignItems: 'center',
  },
});
