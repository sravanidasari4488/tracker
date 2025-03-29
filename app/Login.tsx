import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useOAuth, useAuth } from "@clerk/clerk-expo"; // Import useAuth
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const { signOut } = useAuth(); // Get signOut from Clerk
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await signOut(); // Ensure any existing session is logged out before login
      setErrorMessage("");

      const { createdSessionId, signIn } = await startOAuthFlow();

      if (createdSessionId ) {
        router.replace("/Homepage2"); // Redirect to the home page
      } else {
        console.error("OAuth flow failed", signIn);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <View style={styles.container}>

      
      <Image source={require("@/assets/images/Vitapbuilding.jpeg")} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <Image source={require("@/assets/images/vit-ap.png")} style={styles.logo} />
        <Text style={styles.title}>Bus Tracking App</Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  backgroundImage: { position: "absolute", width: "100%", height: "100%", opacity: 0.3 },
  overlay: { justifyContent: "center", alignItems: "center", width: "100%", padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 30 },
  title: { fontSize: 28, fontWeight: "700", color: "#000", marginBottom: 20 },
  loginButton: { backgroundColor: "#6C63FF", padding: 15, borderRadius: 10 },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default Login;