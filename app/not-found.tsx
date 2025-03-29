import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace('/NextPage'); // Navigate to home or another valid page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Not Found</Text>
      <Text style={styles.message}>Sorry, the page you are looking for does not exist.</Text>
      <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go to Home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5A67D8',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#5A67D8',
    padding: 15,
    borderRadius: 25,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default NotFound;
