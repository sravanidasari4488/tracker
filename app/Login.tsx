import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useOAuth, useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

type EmailDomain = "@vitap.ac.in" | "@vitapstudent.ac.in";

const Login = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Check for existing valid session on component mount
  useEffect(() => {
    const checkExistingSession = async () => {
      if (isSignedIn && isLoaded && user) {
        const email = user.primaryEmailAddress?.emailAddress;
        if (email && isValidUniversityEmail(email)) {
          navigateBasedOnEmail(email);
        }
      }
    };
    checkExistingSession();
  }, [isSignedIn, isLoaded]);

  const isValidUniversityEmail = (email: string): boolean => {
    const validDomains: EmailDomain[] = ["@vitap.ac.in", "@vitapstudent.ac.in"];
    return validDomains.some(domain => email.endsWith(domain));
  };

  const navigateBasedOnEmail = (email: string) => {
    email.endsWith("@vitapstudent.ac.in") 
      ? router.replace("/Homepage2") 
      : router.replace("/HomePage");
  };

  const handleLogin = async (): Promise<void> => {
    try {
      setIsAuthenticating(true);
      
      // Ensure clean state before starting
      if (isSignedIn) {
        await signOut();
      }

      const { createdSessionId, setActive } = await startOAuthFlow();

      if (!createdSessionId || !setActive) {
        throw new Error("Authentication failed - missing session data");
      }

      // Set the active session
      await setActive({ session: createdSessionId });

      // Wait for user data to be available
      await new Promise(resolve => {
        const checkUser = () => {
          if (isLoaded && user) {
            resolve(true);
          } else {
            setTimeout(checkUser, 100);
          }
        };
        checkUser();
      });

      if (!user) {
        throw new Error("User information not available after authentication");
      }

      const email = user.primaryEmailAddress?.emailAddress;

      if (!email) {
        throw new Error("No email associated with this account");
      }

      if (isValidUniversityEmail(email)) {
        navigateBasedOnEmail(email);
      } else {
        await signOut();
        Alert.alert(
          "Invalid Email Domain",
          "Please use your VITAP university email (@vitap.ac.in or @vitapstudent.ac.in)",
          [{ text: "OK" }]
        );
      }
    } catch (err: unknown) {
      await signOut();
      console.error("Authentication error:", err);
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : "An unknown error occurred during authentication";
        
      Alert.alert("Authentication Failed", errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require("@/assets/images/Vitapbuilding.jpeg")} 
        style={styles.backgroundImage} 
      />
      <View style={styles.overlay}>
        <Image 
          source={require("@/assets/images/vit-ap.png")} 
          style={styles.logo} 
          accessibilityLabel="VITAP Logo"
        />
        <Text style={styles.title}>Bus Tracking App</Text>

        <TouchableOpacity 
          style={[
            styles.loginButton,
            isAuthenticating && styles.disabledButton
          ]} 
          onPress={handleLogin}
          disabled={isAuthenticating}
          accessibilityLabel="Sign in with Google"
        >
          <Text style={styles.loginButtonText}>
            {isAuthenticating ? "Authenticating..." : "Sign in with Google"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ... (styles remain the same)
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  backgroundImage: { 
    position: "absolute", 
    width: "100%", 
    height: "100%", 
    opacity: 0.3 
  },
  overlay: { 
    justifyContent: "center", 
    alignItems: "center", 
    width: "100%", 
    padding: 20 
  },
  logo: { 
    width: 100, 
    height: 100, 
    marginBottom: 30 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "700" as const, 
    color: "#000", 
    marginBottom: 20 
  },
  loginButton: { 
    backgroundColor: "#6C63FF", 
    padding: 15, 
    borderRadius: 10 
  },
  disabledButton: {
    opacity: 0.7
  },
  loginButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" as const 
  },
});

export default Login;
