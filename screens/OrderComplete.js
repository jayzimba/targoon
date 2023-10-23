import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderComplete = () => {
  const navigation = useNavigation();

  const handleContinueShopping = () => {
   
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Verified</Text>
        <Text style={styles.successText}>Payment Successful</Text>
        <Text style={styles.thankYouText}>Thank you for shopping with us!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinueShopping}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      borderRadius: 10,
      elevation: 12, 
    },
    successIcon: {
      width: 100,
      height: 100,
      marginBottom: 20,
      tintColor: 'green', 
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'black', 
      marginBottom: 20,
    },
    successText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'green', 
      marginBottom: 10,
    },
    thankYouText: {
      fontSize: 18,
      color: 'black', 
      marginBottom: 30,
    },
    button: {
      backgroundColor: 'black', 
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
      color: 'white', 
      fontWeight: 'bold',
    },
  });

export default OrderComplete;
