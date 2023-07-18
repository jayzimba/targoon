import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Item = ({ item, onClicked }) => {
  return (
    <TouchableOpacity style={styles.itemCard} onPress={onClicked}>
      <ImageBackground
        style={{ width: 120, height: 120 }}
        resizeMode="cover"
        imageStyle={{
          resizeMode: "center",
        }}
        source={require("../assets/images/macbook.png")}
      ></ImageBackground>
      <Text>{item.name}</Text>
      <Text style={{ fontWeight: "700" }}>zmw {item.price}</Text>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "#F5F5F5",
    height: 180,
    width: 140,
    borderRadius: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    marginVertical: 5,
    marginEnd: 20,
  },
});
