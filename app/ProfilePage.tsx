// ProfilePage.tsx
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from './ThemeContext';
import { useNavigation } from '@react-navigation/native';

const ProfilePage: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [name, setName] = useState('AKHILESH');
  const [email] = useState('james.robert@example.com');
  const [profilePic, setProfilePic] = useState('https://bootdey.com/img/Content/avatar/avatar6.png');
  const styles = createStyles(isDarkTheme);

  const handleSignOut = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: profilePic }} style={styles.profileImage} />
        <Text style={styles.profileName}>{name}</Text>

        <TouchableOpacity style={styles.friendButton}>
          <Text style={styles.friendButtonText}>VIT-AP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.matchButton}>
          <Text style={styles.matchButtonText}>STUDENT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>User Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Bio</Text>
          <Text style={styles.infoValue}>Hey there, I'm on this app!</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>20-30 Years Old</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>Male</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Joined</Text>
          <Text style={styles.infoValue}>March 04, 2023</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>Alger, Canada</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Text key={index} style={styles.star}>
                {index < 3 ? '★' : '☆'}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.themeToggleContainer}>
        <Text style={styles.themeText}>Theme:</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon name={isDarkTheme ? 'brightness-7' : 'brightness-2'} size={24} color={styles.icon.color} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const createStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: isDarkTheme ? '#000' : '#fff',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkTheme ? '#fff' : '#333',
    },
    profileContainer: {
      alignItems: 'center',
      padding: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkTheme ? '#fff' : '#333',
    },
    profileAge: {
      fontSize: 16,
      color: '#888',
      marginBottom: 20,
    },
    friendButton: {
      backgroundColor: '#E5FFE5',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 10,
    },
    friendButtonText: {
      color: '#2ECC71',
      fontSize: 16,
    },
    matchButton: {
      backgroundColor: '#2ECC71',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
    },
    matchButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    infoContainer: {
      padding: 20,
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      marginVertical: 20,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDarkTheme ? '#fff' : '#333',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    infoLabel: {
      fontSize: 16,
      color: '#888',
    },
    infoValue: {
      fontSize: 16,
      color: isDarkTheme ? '#fff' : '#333',
    },
    ratingContainer: {
      flexDirection: 'row',
    },
    star: {
      fontSize: 16,
      color: '#FFD700',
    },
    themeToggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    themeText: {
      fontSize: 16,
      color: isDarkTheme ? '#fff' : '#333',
      marginRight: 10,
    },
    signOutButton: {
      marginTop: 30,
      backgroundColor: '#f44336',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    signOutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    icon: {
      color: isDarkTheme ? '#fff' : '#333',
    },
  });

export default ProfilePage;