import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AboutYou from "./pages/AboutYou";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer} from "@react-navigation/native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { AppRegistry, StyleSheet, View } from "react-native";
import { PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import TabScreen from "./TabScreens";
import SignIn from "./pages/SignIn";

const Stack = createNativeStackNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://674d-2607-fb90-8e0a-17a6-10f-6678-816b-3864.ngrok.io/graphql',
  cache: new InMemoryCache(),
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFD978",
    background: "#F8F5EE",
  },
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={MyTheme}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="About You" component={AboutYou} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Tab Screen" component={TabScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("Move", () => App);
