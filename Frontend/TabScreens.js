import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AboutYou from "./pages/AboutYou";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

import Explore from "./pages/Explore";

import { AppRegistry, StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Explore" component={Explore} />
    </Tab.Navigator>
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

