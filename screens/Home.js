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
import { RectButton } from "react-native-gesture-handler";
import Item from "../components/Item";

const Home = ({ navigation }) => {
  const [clickedItems, setClickedItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  const Data = [
    { value: 2, name: "Pixel 6 pro", price: 10500 },
    { value: 3, name: "Google Glasses", price: 5600 },
  ];

  const handleButtonPress = (item) => {
    if (!clickedItems.some((clickedItem) => clickedItem.value === item.value)) {
      setClickedItems((prevClickedItems) => [...prevClickedItems, item]);
      setCartCounter((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }) => (
    <Item onClicked={() => handleButtonPress(item)} item={item} />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View></View>
        <RectButton style={styles.cartButton} onPress={() => navigation.navigate("Cart", { clickedItems })}>
          {cartCounter >= 1 ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCounter}</Text>
            </View>
          ) : null}
          <Feather name="shopping-cart" size={30} color="black" />
        </RectButton>
      </View>

      <Text style={styles.headerText}>Categories</Text>

      <View style={styles.categoriesContainer}>
        <View style={styles.category}>
          <RectButton style={styles.categoryButton}>
            <Ionicons name="phone-portrait-outline" size={30} color="black" />
          </RectButton>
          <Text style={styles.textInCategory}>Phones</Text>
        </View>

        <View style={styles.category}>
          <RectButton style={styles.categoryButton}>
            <MaterialIcons name="laptop-mac" size={30} color="black" />
          </RectButton>
          <Text style={styles.textInCategory}>Computers</Text>
        </View>

        <View style={styles.category}>
          <RectButton style={styles.categoryButton}>
            <Ionicons name="md-headset-sharp" size={30} color="black" />
          </RectButton>
          <Text style={styles.textInCategory}>Accessories</Text>
        </View>
      </View>

      <Text style={styles.headerText}>Latest</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannersContainer}>
        {/* Add your ImageBackground components here for the banners */}
        {/* Banner 1 */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require('../assets/images/var.jpg')}
            style={styles.banner}
          >
            {/* You can add any child components or text within the ImageBackground if needed */}
          </ImageBackground>
        </View>

        {/* Banner 2 */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require('../assets/images/pixel.jpg')}
            style={styles.banner}
          >
            {/* You can add any child components or text within the ImageBackground if needed */}
          </ImageBackground>
        </View>

        {/* Banner 3 */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require('../assets/images/mac.jpg')}
            style={styles.banner}
          >
            {/* You can add any child components or text within the ImageBackground if needed */}
          </ImageBackground>
        </View>
      </ScrollView>

      {/* Display the items from the Data array */}
      <FlatList
        data={Data}
        keyExtractor={(item) => item.value.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  cartButton: {
    alignItems: "center",
    flexDirection: "row",
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
  headerText: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 30,
  },
  categoriesContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  category: {
    alignItems: "center",
  },
  categoryButton: {
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
  textInCategory: {
    fontSize: 16,
    marginTop: 10,
  },
  bannersContainer: {
    marginBottom: 30,
  },
  bannerContainer: {
    width: 300,
    height: 150,
    marginRight: 10,
    borderRadius: 10,  
    elevation: 5,     
    overflow: "hidden", 
  },
  banner: {
    width: 300,
    height: 150,
  },
});

export default Home;
