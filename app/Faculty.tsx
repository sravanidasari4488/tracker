import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can install this package for icons

// Developer data
const developers = [
  {
    name: 'AKHILESH SAMAYAMANTHULA',
    role: 'Full Stack Developer/React-native',
    batch: 'Batch 2023',
    photo: 'https://www.example.com/johndoe.jpg',
    instagram: 'https://www.instagram.com/_akhileshs26_/?hl=en',
    linkedin: 'https://www.linkedin.com/in/akhilesh-samayamanthula-60987b284/',
  },
  // Add more developers as needed
];

const DeveloperPage: React.FC = () => {

  // Function to open social media links
  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Developers</Text>
      
      {developers.map((developer, index) => (
        <View key={index} style={styles.developerContainer}>
          <Image source={{ uri: developer.photo }} style={styles.profilePicture} />
          <View style={styles.details}>
            <Text style={styles.name}>{developer.name}</Text>
            <Text style={styles.role}>{developer.role}</Text>
            <Text style={styles.batch}>{developer.batch}</Text>

            <View style={styles.socialLinks}>
              <TouchableOpacity onPress={() => handleSocialLink(developer.instagram)} style={styles.socialButton}>
                <FontAwesome name="instagram" size={24} color="white" />
                <Text style={styles.socialText}>Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSocialLink(developer.linkedin)} style={styles.socialButton}>
                <FontAwesome name="linkedin" size={24} color="white" />
                <Text style={styles.socialText}>LinkedIn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  developerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  batch: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 5,
  },
  socialText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});

export default DeveloperPage;
