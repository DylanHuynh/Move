import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AboutYou from "./pages/AboutYou";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Onboarding from "./pages/Onboarding";
import Explore from "./pages/Explore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://37c7-2600-387-f-571a-00-1.ngrok.io/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const signedIn = true;

  return (
    <ApolloProvider client={client}>
    <PaperProvider>
      <NavigationContainer>
        {signedIn ? (
          <Tab.Navigator>
            <Tab.Screen name="About You" component={AboutYou} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Explore" component={Explore} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="About You" component={AboutYou} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


AppRegistry.registerComponent('Move', () => App);