import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Linking,
} from "react-native";
import { BlurView } from "expo-blur";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "react-native-vector-icons";

const HomePage: React.FC = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const menuAnimation = React.useRef(new Animated.Value(-300)).current;

  const toggleMenu = () => {
    const isClosing = menuVisible;
    setMenuVisible(!menuVisible);

    Animated.timing(menuAnimation, {
      toValue: isClosing ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    if (menuVisible) {
      toggleMenu();
    }
  };

  const handleBoxPress = (page: string) => {
    navigation.navigate(page);
  };

  const developers = [
    {
      name: "Akhilesh",
      role: "Full Stack Developer",
      image: require("@/assets/images/Akhilesh.jpeg"),
      instagram: "https://instagram.com/akhilesh_profile",
      linkedin: "https://linkedin.com/in/akhilesh_profile",
    },
    {
      name: "Sravani",
      role: "Frontend Developer",
      image: require("@/assets/images/bus3.jpg"),
      instagram: "https://instagram.com/sravani_profile",
      linkedin: "https://linkedin.com/in/sravani_profile",
    },
    {
      name: "Sanjana",
      role: "Backend Developer",
      image: require("@/assets/images/bus3.jpg"),
      instagram: "https://instagram.com/sanjana_profile",
      linkedin: "https://linkedin.com/in/sanjana_profile",
    },
    {
      name: "Manvika",
      role: "Frontend Developer",
      image: require("@/assets/images/bus3.jpg"),
      instagram: "https://instagram.com/manvika_profile",
      linkedin: "https://linkedin.com/in/manvika_profile",
    },
    {
      name: "Lakshman",
      role: "Chill guy",
      image: require("@/assets/images/bus3.jpg"),
      instagram: "https://instagram.com/lakshman_profile",
      linkedin: "https://linkedin.com/in/lakshman_profile",
    },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image source={require("@/assets/images/bus.png")} style={styles.profilePic} />
      </View>

      {/* Menu Button */}
      {!menuVisible && (
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <View style={styles.hamburgerIcon}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>
      )}

      {/* Shadow Line */}
      <View style={styles.shadowLine} />

      {menuVisible && (
        <BlurView intensity={100} style={styles.blurView}>
          <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.menuTitle}>Developers</Text>
            <ScrollView contentContainerStyle={styles.developerContainer}>
              {developers.map((dev, index) => (
                <View key={index} style={styles.developerBox}>
                  <Image source={dev.image} style={styles.developerImage} />
                  <Text style={styles.developerName}>{dev.name}</Text>
                  <Text style={styles.developerRole}>{dev.role}</Text>
                  <View style={styles.socialLinks}>
                    <TouchableOpacity onPress={() => openLink(dev.instagram)}>
                      <Ionicons name="logo-instagram" size={24} color="#E4405F" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink(dev.linkedin)}>
                      <Ionicons name="logo-linkedin" size={24} color="#0A66C2" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </BlurView>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Video Section */}
        <View style={styles.videoContainer}>
          <Video
            source={require("@/assets/VIT-AP BUS.mp4")}
            style={styles.video}
            resizeMode="contain"
            isLooping
            shouldPlay
            isMuted={false}
          />
        </View>

        {/* Boxes Section */}
        <View style={styles.boxesContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.box} onPress={() => handleBoxPress("MapPage")}>
              <Image source={require("@/assets/images/bus3.jpg")} style={styles.boxImage} />
              <Text style={styles.boxText}>Bus Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => handleBoxPress("PersonalDataPage")}>
              <Image source={require("@/assets/images/personaldata.png")} style={styles.boxImage} />
              <Text style={styles.boxText}>Personal Data</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.box} onPress={() => handleBoxPress("AnalyticsPage")}>
              <Image source={require("@/assets/images/Analytics.png")} style={styles.boxImage} />
              <Text style={styles.boxText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={() => handleBoxPress("FAaculty")}>
              <Image source={require("@/assets/images/d.png")} style={styles.boxImage} />
              <Text style={styles.boxText}>Faculty</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>WHOOP IT UP!</Text>
          <Text style={styles.footerSubText}>Crafted with ❤️ for students by students</Text>
        </View>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profileContainer: { position: "absolute", top: 50, right: 20, zIndex: 2 },
  profilePic: { width: 50, height: 50, borderRadius: 25 },
  menuButton: { position: "absolute", top: 65, left: 20, zIndex: 2 },
  hamburgerIcon: { width: 30, height: 25, justifyContent: "space-between" },
  hamburgerLine: { width: "120%", height: 5, backgroundColor: "#333", borderRadius: 4 },
  shadowLine: { width: "100%", height: 4, backgroundColor: "#ddd", elevation: 5, marginTop: 110 },
  closeButton: { position: "absolute", top: 40, right: 10, zIndex: 2 },
  closeText: { fontSize: 30, color: "#333" },
  blurView: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 },
  menu: {
    backgroundColor: "#fff",
    width: 300,
    height: "100%",
    padding: 20,
    position: "absolute",
    top: 40,
    left: 0,
    zIndex: 2,
    borderRightWidth: 4,
    borderColor: "#333",
    borderRadius: 12,
  },
  menuTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 70, color: "#333",top:20, },
  developerContainer: { alignItems: "center" },
  developerBox: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "90%",
  },
  developerImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  developerName: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  developerRole: { fontSize: 14, color: "#555", marginBottom: 10 },
  socialLinks: { flexDirection: "row", justifyContent: "space-between", width: "50%" },
  scrollContainer: { alignItems: "center", paddingVertical: 20 },
  videoContainer: { marginTop: 30, width: "90%", height: 200 },
  video: { width: "100%", height: "100%" },
  boxesContainer: { width: "90%", marginTop: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  box: {
    backgroundColor: "#fff",
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  boxImage: { width: 60, height: 60, marginBottom: 10 },
  boxText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  footerContainer: { marginTop: 30, alignItems: "center", justifyContent: "center", padding: 20 },
  footerText: { fontSize: 72, fontWeight: "bold", color: "#808080" },
  footerSubText: { fontSize: 16, color: "#808080", marginTop: 10 },
});

export default HomePage;
