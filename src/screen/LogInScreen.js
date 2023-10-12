import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const LogInScreen = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLoginEvent = async () => {
    try {
      if (username.length > 0 && password.length > 0) {
        const isUserLogin = await auth().signInWithEmailAndPassword(
          username,
          password,
        );

        navigation.replace('HomeScreenTab');
      } else {
        Alert.alert('Please Enter Username & Password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{marginHorizontal: 16}}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter UserName"
        value={username}
        onChangeText={inputText => setUserName(inputText)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Password"
        value={password}
        secureTextEntry={true}
        onChangeText={inputText => setPassword(inputText)}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          handleLoginEvent();
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
          LogIn
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 2,
    borderColor: '#1e900f',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  buttonContainer: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 6,
    marginVertical: 30,
    alignItems: 'center',
  },
});
