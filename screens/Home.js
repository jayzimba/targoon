import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Item from "../components/Item";
import { counterEvent } from "react-native/Libraries/Performance/Systrace";
const Home = ({ navigation }) => {
  const [clickedItems, setClickedItems] = React.useState([]);
  const [cartCounter, setCartCounter] = React.useState(0);
  const Data = [
    {
      value: 1,
      name: "MacBook pro",
      price: 13000,
    },
    {
      value: 2,
      name: "Pixel 6 pro",
      price: 10500,
    },
    {
      value: 3,
      name: "Google Glasses",
      price: 5600,
    },
  ];

  const handleButtonPress = (item) => {
    if (!clickedItems.some((clickedItem) => clickedItem.value === item.value)) {
      setClickedItems((prevClickedItems) => [...prevClickedItems, item]);
      setCartCounter((prev) => prev + 1);
      // Add your logic here or perform any actions you need.
    } else {
    }
  };

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <Item onClicked={() => handleButtonPress(item)} item={item} />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 15,
        }}
      >
        <View></View>

        <TouchableOpacity
          style={{ alignItems: "center", flexDirection: "row" }}
          onPress={() => navigation.navigate("Cart", { clickedItems })}
        >
          {cartCounter >= 1 ? (
            <View
              style={{
                backgroundColor: "black",
                marginEnd: -15,
                marginTop: 15,
                padding: 5,
                height: 25,
                width: 25,
                borderRadius: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                }}
              >
                {cartCounter}
              </Text>
            </View>
          ) : null}
          <Feather name="shopping-cart" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 30 }}>
        Categories
      </Text>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 15,
        }}
      >
        <View style={styles.container2}>
          <View style={styles.category}>
            <Ionicons name="phone-portrait-outline" size={30} color="black" />
          </View>
          <Text style={styles.textInContainer}>Phones</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.category}>
            <MaterialIcons name="laptop-mac" size={30} color="black" />
          </View>
          <Text style={styles.textInContainer}>Computers</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.category}>
            <Ionicons name="md-headset-sharp" size={30} color="black" />
          </View>
          <Text style={styles.textInContainer}>Accessories</Text>
        </View>
      </View>

      <Text style={{ fontSize: 22, fontWeight: "800", marginVertical: 30 }}>
        Latest
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 30 }}
      >
        <ImageBackground
          source={require("../assets/images/var.jpg")}
          imageStyle={{ borderRadius: 10 }}
          style={styles.card}
        >
          <Text style={styles.textInCard}>Gadgets and electronic needs</Text>
          <TouchableOpacity style={styles.buttonInCard}>
            <Text style={{ color: "#000", fontSize: 16 }}>Order Now</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/images/pixel.jpg")}
          imageStyle={{ borderRadius: 10 }}
          style={styles.card}
        >
          <Text style={styles.textInCard}>Gadgets and electronic needs</Text>
          <TouchableOpacity style={styles.buttonInCard}>
            <Text style={{ color: "#000", fontSize: 16 }}>Order Now</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/images/mac.jpg")}
          imageStyle={{ borderRadius: 10 }}
          style={styles.card}
        >
          <Text style={styles.textInCard}>Gadgets and electronic needs</Text>
          <TouchableOpacity style={styles.buttonInCard}>
            <Text style={{ color: "#000", fontSize: 16 }}>Order Now</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 60 }}
      >
        <Item price={3500} itemName={"MacBook pro"} src="macbook.png" />
      
      </ScrollView> */}

      <FlatList
        data={Data}
        keyExtractor={(item) => item.value}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator
      />
    </ScrollView>
  );
};

export default Home;

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
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  textInContainer: {
    fontSize: 16,
    marginTop: 10,
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
