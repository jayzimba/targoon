import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NumericInput from "react-native-numeric-input";

const CartItem = ({ item, onClicked }) => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <View
      style={{
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ededed",
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
      }}
    >
      <View>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>
          ZMW {item.price}
        </Text>
      </View>
      <View>
        <NumericInput
          value={quantity}
          onChange={(value) => setQuantity(value)}
          minValue={1}
          totalWidth={120}
          totalHeight={40}
          rounded
          step={1}
          valueType="integer"
          iconStyle={{
            color: "#000",
          }}
        />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
