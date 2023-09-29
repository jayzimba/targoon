import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity 
} from 'react-native';
const Verification = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
      
        <Text style={styles.header}>Verified</Text>
        <Text style={styles.successText}>Payment Successful</Text>
        <Text style={styles.thankYouText}>Thank you for shopping with us!</Text>
        <TouchableOpacity style={styles.button}>
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
    elevation: 12, // Add elevation for the card-like effect
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: 'green', // Icon color
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black', // Header text color
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green', // Text color
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 18,
    color: 'black', // Text color
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'black', // Button background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white', // Button text color
    fontWeight: 'bold',
  },
});

export default Verification;
