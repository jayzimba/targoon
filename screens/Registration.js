import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as LocalAuthentication from 'expo-local-authentication';

function Registration() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    if (!name || !username || !email || !password) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }

    const registrationData = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    try {
      setLoading(true);

      // Make a POST request to your Node.js server for user registration
      const response = await axios.post('https://127.0.0.1:80/register', registrationData);

      if (response.status === 200) {
        // Registration successful
        Alert.alert('Registration Successful', 'You have been registered successfully.');
        navigation.navigate('Login');
      } else {
        // Registration failed
        Alert.alert('Registration Failed', `An error occurred during registration. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Network Error', 'An error occurred. Please check your network connection and try again.');
    } finally {
      setLoading(false);
    }
  };

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

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Place your finger on the sensor to register your biometrics.',
      });

      if (result.success) {
        // Here, you can send the biometric data to your server
        const biometricData = result.data;
        // Send the biometric data to your server using Axios or another HTTP library
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
      <View style={styles.buttonContainer}>
        <Button title="Already Registered? Log In" onPress={() => navigation.navigate('Login')} />
        <Button title="Add Biometric" onPress={registerBiometrics} />
        <Button title={loading ? 'Registering...' : 'Register'} onPress={handleRegistration} disabled={loading} />
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});

export default Registration;
