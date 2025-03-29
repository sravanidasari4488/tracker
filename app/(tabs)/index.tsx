import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login';
import NextPage from "../NextPage";
import NotFound from '../not-found'; // Adjust path as needed
import HomePage from '../HomePage'; // Adjust path as needed
import MapPage from '../MapPage'; // Adjust path as needed

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="NextPage" component={NextPage} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="MapPage" component={MapPage} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
