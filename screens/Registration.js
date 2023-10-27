import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication'; // Import the Expo Local Authentication library
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";


function Registration() {
  const navigation = useNavigation(); // Get the navigation object

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    // Check if fields are filled in
    if (!name || !username || !email || !password) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);

      // You can also securely store the password here.
      // Remember to hash or encrypt the password for security.

      // Redirect to the login screen.
      navigation.navigate('Login');
    } catch (error) {
      // Handle error
      console.error('Error during registration:', error);
      Alert.alert('Registration Error', 'An error occurred during registration. Please try again.');
    }
  }

  const registerBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Biometrics Not Available', 'Your device does not support biometric authentication.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Biometrics Not Enrolled', 'You must enroll biometrics in your device settings.');
        return;
      }

      // Attempt to authenticate to register biometrics
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Place your finger on the sensor to register your biometrics.',
      });

      if (result.success) {
        Alert.alert('Biometric Enrollment', 'Your biometric data has been enrolled successfully.');
      } else {
        Alert.alert('Biometric Enrollment Failed', 'Biometric enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during biometric enrollment:', error);
      Alert.alert('Biometric Enrollment Error', 'An error occurred during biometric enrollment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonsContainer}>
        <View styles={styles.category}>
            <Button title="Register Biometrics" onPress={registerBiometrics}>
                <Feather name="fingerprint" size={20} color="black" />
                  <Text style={{ marginLeft: 8 }}>Register Biometrics</Text>
            </Button>
        </View>

      <View styles={styles.buttons}>
      <Button title="Register" onPress={handleRegistration} />
      </View>
      </View>
      
      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius:8,
    paddingHorizontal: 10,
  },

  buttons: {
    backgroundColor: '#007AFF', // Background color for buttons
    color: '#fff', // Text color for buttons
    padding: 10, // Padding around the button text
    margin: 10, // Margin around the button
    borderRadius: 8, // Border radius for buttons
  },
});

export default Registration;
