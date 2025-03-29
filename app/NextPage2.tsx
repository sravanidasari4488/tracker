import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import HomePage2 from "./Homepage2";
import MapPage from "./MapPage";
import ProfilePage from "./ProfilePage";
import { useRouter } from "expo-router";

const Tab = createBottomTabNavigator();

const NextPage2: React.FC = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isSignedIn) {
      router.replace("/Login"); // Redirect to login if not signed in
    }
  }, [isSignedIn]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? "home" : "home-outline";
          if (route.name === "Map") iconName = focused ? "location" : "location-outline";
          if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "white" },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage2} />
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default NextPage2;
