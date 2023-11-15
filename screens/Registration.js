import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
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
    };
  }

  handleRegistration = async () => {
    // Your registration logic here
    this.setState({
      loading: true,
    });
    var fullname = this.state.fullname;
    var username = this.state.username;
    var email = this.state.email;
    var password = this.state.password;

    if (
      fullname == null ||
      username == null ||
      email == null ||
      password == null
    ) {
      Alert.alert("Incomplete form", "please provide all fields");
    } else {
      var formdata = new FormData();
      formdata.append("fullname", fullname);
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("https://www.pezabond.com/kelly/add_record.php", requestOptions)
        .then((Response) => Response.json())
        .then((Response) => {
          alert(Response[0].Message);
          if (Response[0].Message == "Added successfuly!") {
            Alert.alert("SUCCESSFUL!!", "user added successfully");
            this.props.navigation.navigate("Home");
          } else if (Response[0].Message == "Already Registered") {
            Alert.alert("FAILED!!", "pupil already existing with that id");
          }
        })
        .catch((error) => {
          console.error("ERROR:" + error);
        })
        .finally(() =>
          this.setState({
            fullname: "",
            grade: "",
            studentID: "",
            loading: false,
          })
        );
    }
  };

  registerBiometrics = async () => {
    // Your biometrics registration logic here
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert(
          "Biometrics Not Available",
          "Your device does not support biometric authentication."
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          "Biometrics Not Enrolled",
          "You must enroll biometrics in your device settings."
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage:
          "Place your finger on the sensor to register your biometrics.",
      });

      if (result.success) {
        // Here, you can send the biometric data to your server
        const biometricData = result.data;
        // Send the biometric data to your server using Axios or another HTTP library
        Alert.alert(
          "Biometric Enrollment",
          "Your biometric data has been enrolled successfully."
        );
      } else {
        Alert.alert(
          "Biometric Enrollment Failed",
          "Biometric enrollment failed. Please try again."
        );
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
    const { name, username, email, password, loading } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registration</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
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
            <Text>Biometric Registration</Text>
          </TouchableOpacity>
        </View>
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
