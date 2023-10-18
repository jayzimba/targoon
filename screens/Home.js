import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler"; // Assuming you meant RectButton instead of TouchableOpacity
import Item from "../components/Item";

const Home = ({ navigation }) => {
  const [clickedItems, setClickedItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  const Data = [
    { value: 1, name: "MacBook pro", price: 13000 },
    { value: 2, name: "Pixel 6 pro", price: 10500 },
    { value: 3, name: "Google Glasses", price: 5600 },
  ];

  const handleButtonPress = (item) => {
    if (!clickedItems.some((clickedItem) => clickedItem.value === item.value)) {
      setClickedItems((prevClickedItems) => [...prevClickedItems, item]);
      setCartCounter((prev) => prev + 1);
      // Add your logic here or perform any actions you need.
    }
  };

  const renderItem = ({ item }) => (
    <Item onClicked={() => handleButtonPress(item)} item={item} />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 15 }}>
        <View></View>
        <RectButton style={{ alignItems: "center", flexDirection: "row" }} onPress={() => navigation.navigate("Cart", { clickedItems })}>
          {cartCounter >= 1 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCounter}</Text>
            </View>
          ) : null}
          <Feather name="shopping-cart" size={30} color="black" />
        </RectButton>
      </View>

      <Text style={styles.headerText}>Categories</Text>

      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
        <View style={styles.container2}>
          <RectButton style={styles.category}>
            <Ionicons name="phone-portrait-outline" size={30} color="black" />
          </RectButton>
          <Text style={styles.textInContainer}>Phones</Text>
        </View>

        <View style={styles.container2}>
          <RectButton style={styles.category}>
            <MaterialIcons name="laptop-mac" size={30} color="black" />
          </RectButton>
          <Text style={styles.textInContainer}>Computers</Text>
        </View>

        <View style={styles.container2}>
          <RectButton style={styles.category}>
            <Ionicons name="md-headset-sharp" size={30} color="black" />
          </RectButton>
          <Text style={styles.textInContainer}>Accessories</Text>
        </View>
      </View>

      <Text style={styles.headerText}>Latest</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 30 }}>
        {/* Add your ImageBackground components here */}
      </ScrollView>

      <FlatList data={Data} keyExtractor={(item) => item.value} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  container2: {
    alignItems: "center",
  },
  category: {
    padding: 15,
    height: 80,
    width: 80,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    elevation: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { height: 3, width: 3 },
  },
  textInContainer: {
    fontSize: 16,
    marginTop: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 30,
  },
  cartBadge: {
    backgroundColor: "black",
    marginEnd: -15,
    marginTop: 15,
    padding: 5,
    height: 25,
    width: 25,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
  },
  card: {
    height: 200,
    width: 310,
    backgroundColor: "#8e8e8e8e",
    borderRadius: 10,
    marginEnd: 10,
  },
  textInCard: {
    color: "white",
    fontSize: 25,
    fontWeight: "200",
    width: "65%",
    marginTop: 20,
    marginStart: 20,
  },
  buttonInCard: {
    height: 50,
    width: "45%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginStart: 15,
    marginTop: 45,
  },
});

export default Home;
