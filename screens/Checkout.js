import React, { useState } from "react";
import { Alert, View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { CardField, CardFieldInput, useConfirmPayment } from "@stripe/stripe-react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const Checkout = () => {
    const navigation = useNavigation();

    const { confirmPayment, loading } = useConfirmPayment();
    const [cardNumber, setCardNumber] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [cvc, setCvc] = useState("");
    const [loadingIndicator, setLoading] = useState(false);

    const validateExpiryMonth = (input) => {
        const month = parseInt(input, 10);
        return month >= 1 && month <= 12;
    };

    const validateExpiryYear = (input) => {
        const currentYear = new Date().getFullYear() % 100;
        const year = parseInt(input, 10);
        return year >= currentYear && year <= currentYear + 20;
    };

    const authenticateWithBiometrics = async () => {
        const hasBiometrics = await LocalAuthentication.hasHardwareAsync();
        if (hasBiometrics) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate to pay",
            });

            if (result.success) {
                navigation.navigate("Verification");
            } else {
                Alert.alert("Biometric Authentication Failed", "Please try again.");
            }
        } else {
            sendOTP();
        }
        setLoading(false);
    };

    const handlePayment = () => {
        if (!cardNumber || !validateExpiryMonth(expiryMonth) || !validateExpiryYear(expiryYear) || !cvc) {
            Alert.alert("Invalid Card Details", "Please fill in all card details.");
            return;
        }

        setLoading(true);
        console.log("Paying Now");
        authenticateWithBiometrics();
    };

    const handleCardNumberChange = (input) => {
        if (input.startsWith("4")) {
            // You can set additional flags or UI hints for Visa card.
        }

        const expiryRegex = /^(\d{2})\/(\d{2})$/;
        const match = input.match(expiryRegex);
        if (match) {
            const [, month, year] = match;
            setExpiryMonth(month);
            setExpiryYear(year);
        }

        setCardNumber(input);
    };

    const handleExpiryMonthChange = (input) => {
        if (validateExpiryMonth(input)) {
            setExpiryMonth(input);
        } else {
            Alert.alert("Invalid Expiry Month", "Please enter a valid expiry month (1-12).");
        }
    };

    const handleExpiryYearChange = (input) => {
        if (validateExpiryYear(input)) {
            setExpiryYear(input);
        } else {
            Alert.alert("Invalid Expiry Year", "Please enter a valid expiry year (current year or later).");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter Card Details</Text>
            <CardField postalCodeEnabled={false} onCardChange={(cardDetails) => {
                handleCardNumberChange(cardDetails.number);
                setCvc(cardDetails.cvc);
            }} />

            <Text style={styles.label}>Card Number</Text>
            <TextInput style={styles.input} value={cardNumber} onChangeText={handleCardNumberChange} placeholder="Card Number" keyboardType="numeric" secureTextEntry={false} />

            <Text style={styles.label}>Expiry</Text>
            <View style={styles.expiryContainer}>
                <Picker selectedValue={expiryMonth} onValueChange={handleExpiryMonthChange} style={styles.picker}>
                    <Picker.Item label="Month" value="" />
                    <Picker.Item label="January" value="01" />
                    <Picker.Item label="February" value="02" />
                    <Picker.Item label="March" value="03" />
                    <Picker.Item label="April" value="04" />
                    <Picker.Item label="May" value="05" />
                    <Picker.Item label="June" value="06" />
                    <Picker.Item label="July" value="07" />
                    <Picker.Item label="August" value="08" />
                    <Picker.Item label="September" value="09" />
                    <Picker.Item label="October" value="10" />
                    <Picker.Item label="November" value="11" />
                    <Picker.Item label="December" value="12" />
                </Picker>
                <Picker selectedValue={expiryYear} onValueChange={handleExpiryYearChange} style={styles.picker}>
                    <Picker.Item label="Year" value="" />
                    <Picker.Item label="2022" value="22" />
                    <Picker.Item label="2023" value="23" />
                    <Picker.Item label="2024" value="24" />
                    <Picker.Item label="2025" value="25" />
                    <Picker.Item label="2026" value="26" />
                    <Picker.Item label="2027" value="27" />
                    <Picker.Item label="2028" value="28" />
                    <Picker.Item label="2029" value="29" />
                    <Picker.Item label="2030" value="30" />
                </Picker>
            </View>

            <Text style={styles.label}>CVC</Text>
            <TextInput style={styles.input} value={cvc} onChangeText={setCvc} placeholder="CVC" keyboardType="numeric" secureTextEntry={true} />

            <View style={{ width: "100%", alignItems: "center", bottom: 20, marginVertical: 50 }}>
                <TouchableOpacity style={styles.proceedButton} onPress={handlePayment} disabled={loadingIndicator}>
                    {loadingIndicator ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <MaterialIcons name="payments" size={24} color="#fff" />
                            <Text style={{ fontSize: 18, color: "#fff", marginStart: 10 }}>Pay Now</Text>
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
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#000", // Remove the duplicate backgroundColor
    },
    expiryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    picker: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginTop: 5,
    },
});

export default Checkout;
