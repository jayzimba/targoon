import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Biometrics from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation

function Login() {
  const navigation = useNavigation(); // Get the navigation object

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [biometricType, setBiometricType] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password'); // Decrypt or compare hashes for the password.

      if (username === storedUsername && password === storedPassword) {
        // Authentication successful, redirect to the user's account page.
        navigation.navigate('Home'); // Navigate to the "Home" screen
      } else {
        // Authentication failed, show an error message.
      }
    } catch (error) {
      // Handle error
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      const { available, biometryType } = await Biometrics.isSensorAvailable();

      if (available) {
        const authResult = await Biometrics.authenticate(
          'Authenticate to access your account.'
        );

        if (authResult.success) {
          // Biometric authentication successful, redirect to the user's account page.
          navigation.navigate('Home'); // Navigate to the "Home" screen
        } else {
          // Biometric authentication failed.
        }
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      {biometricType && (
        <View>
          <Text>Or use your {biometricType} to log in:</Text>
          <Button title={`Authenticate with ${biometricType}`} onPress={authenticateWithBiometrics} />
        </View>
      )}
    </View>
  );
}

export default Login;
