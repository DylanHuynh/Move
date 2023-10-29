import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";


import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";

import { AppRegistry, StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={Chat} options={{ tabBarIcon: () => (
        <IconButton icon={"home"}/>
      )}}/>
      <Tab.Screen name="Explore" component={Explore} options={{ tabBarIcon: () => (
        <IconButton icon={"calendar-search"}/>
      )}}/>
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon: () => (
        <IconButton icon={"account"}/>
      )}}/>
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

