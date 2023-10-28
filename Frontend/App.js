import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";

import AboutYou from "./pages/AboutYou";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Onboarding from "./pages/Onboarding";
import Explore from "./pages/Explore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const signedIn = true;

  return (
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
