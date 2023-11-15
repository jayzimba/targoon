import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      email: "",
      password: "",
      loading: false,
      biometricData: null,
    };
  }

  handleRegistration = async () => {
    this.setState({
      loading: true,
    });

    const {
      fullname,
      username,
      email,
      password,
      biometricData,
    } = this.state;

    if (fullname == null || username == null || email == null || password == null) {
      Alert.alert("Incomplete form", "Please provide all fields");
      this.setState({ loading: false });
    } else {
      const formdata = new FormData();
      formdata.append("fullname", fullname);
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("biometricData", JSON.stringify(biometricData));

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      try {
        const response = await fetch("https://www.pezabond.com/kelly/add_record.php", requestOptions);
        const result = await response.json();

        alert(result[0].Message);

        if (result[0].Message === "Added successfully!") {
          Alert.alert("SUCCESSFUL!!", "User added successfully");
          this.props.navigation.navigate("Home");
        } else if (result[0].Message === "Already Registered") {
          Alert.alert("FAILED!!", "User already exists with that ID");
        }
      } catch (error) {
        console.error("ERROR:", error);
        Alert.alert("Network Error", "An error occurred. Please check your network connection and try again.");
      } finally {
        this.setState({
          fullname: "",
          username: "",
          email: "",
          password: "",
          loading: false,
          biometricData: null,
        });
      }
    }
  };

  registerBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Biometrics Not Available", "Your device does not support biometric authentication.");
        return;
      }

      const authType = LocalAuthentication.AuthenticationType.Fingerprint; 

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage:
          "Place your finger on the sensor to register your biometrics.",
        disableDeviceFallback: true, // This will prevent using PIN as fallback
        authenticationType: authType,
      });

      if (result.success) {
        // Only store the biometric data, do not perform verification here
        this.setState({
          biometricData: result.data,
        });

        Alert.alert(
          "Biometric Enrollment",
          "Your biometric data has been enrolled successfully."
        );
      } else {
        if (result.error === "user_cancel") {
          // Handle the case where the user cancels the biometric authentication
          console.log("Biometric authentication canceled by the user");
        } else {
          Alert.alert(
            "Biometric Enrollment Failed",
            "Biometric enrollment failed. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error during biometric enrollment:", error);
      Alert.alert(
        "Biometric Enrollment Error",
        "An error occurred during biometric enrollment. Please try again."
      );
    }
  };

  render() {
    const { fullname, username, email, password, loading } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullname}
          onChangeText={(text) => this.setState({ fullname: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.BioButton}
            onPress={this.registerBiometrics}
          >
            <Text style={{ color: "#fff" }}>Biometric Registration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.RegButton}
            onPress={this.handleRegistration}
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  BioButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 7,
    marginVertical: 20,
  },
  RegButton: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 7,
  },
});

export default Registration;
