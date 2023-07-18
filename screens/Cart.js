import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Item from "../components/Item";
import Checkout from "./Checkout";
import { MaterialIcons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import CartItem from "./../components/CartItem";

const Cart = ({ navigation }) => {
  const route = useRoute();
  const { clickedItems } = route.params;

  const renderItem = ({ item }) => <CartItem item={item} />;
  return (
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#fff" }}>
      <FlatList
        data={clickedItems}
        keyExtractor={(clickedItems) => clickedItems.value}
        renderItem={renderItem}
        horizontal={false}
        showsHorizontalScrollIndicator
      />

      <View style={{ width: "100%", alignItems: "center", bottom: 20 }}>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.navigate("Check out")}
        >
          <MaterialIcons name="payments" size={24} color="#fff" />
          <Text style={{ fontSize: 18, color: "#fff", marginStart: 10 }}>
            Proceed To Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
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
