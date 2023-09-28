import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  CardField,
  CardFieldInput,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const navigation = useNavigation();

  const { confirmPayment, loading } = useConfirmPayment();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loadingIndicator, setLoading] = useState(false);

  const authenticateWithBiometrics = async () => {
    const hasBiometrics = await LocalAuthentication.hasHardwareAsync();
    if (hasBiometrics) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to pay",
      });

      if (result.success) {
        // Biometric authentication succeeded, navigate to the next page.
        navigation.navigate("Verification"); // Replace 'NextPage' with the name of your next screen.
      } else {
        // Biometric authentication failed or was canceled.
        Alert.alert("Failed", "Biometric authentication failed.");
      }
    } else {
      Alert.alert(
        "Biometric Not Available",
        "Biometric authentication is not available on this device."
      );
    }
    setLoading(false);
  };

  const handlePayment = () => {
    setLoading(true);
    console.log("paying Now");
    authenticateWithBiometrics();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Card Details</Text>
      <CardField
        postalCodeEnabled={false}
        onCardChange={(cardDetails) => {
          setCardNumber(cardDetails.number);
          setExpiry(cardDetails.expiry);
          setCvc(cardDetails.cvc);
        }}
      />
      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="Card Number"
      />
      <Text style={styles.label}>Expiry</Text>
      <TextInput
        style={styles.input}
        value={expiry}
        onChangeText={setExpiry}
        placeholder="MM/YY"
      />
      <Text style={styles.label}>CVC</Text>
      <TextInput
        style={styles.input}
        value={cvc}
        onChangeText={setCvc}
        placeholder="CVC"
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          bottom: 20,
          marginVertical: 50,
        }}
      >
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handlePayment}
          disabled={loadingIndicator}
        >
          {loadingIndicator ? (
            <ActivityIndicator color={"#fff"} />
          ) : (
            <>
              <MaterialIcons name="payments" size={24} color="#fff" />
              <Text style={{ fontSize: 18, color: "#fff", marginStart: 10 }}>
                Pay Now
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  proceedButton: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#000",
  },
});

export default Checkout;
