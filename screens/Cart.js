import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import CartItem from "../components/CartItem";

const Cart = ({ navigation }) => { 
    const route = useRoute();
    const { clickedItems } = route.params;

    const renderItem = ({ item }) => <CartItem item={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={clickedItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate("Checkout")}>
                    <MaterialIcons name="payment" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Proceed To Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        bottom: 20,
    },
    proceedButton: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000", // Set the desired background color
        width: "80%",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        marginStart: 10,
    },
});

export default Cart;
