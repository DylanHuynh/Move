import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper'

import AboutYou from './pages/AboutYou'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Onboarding from './pages/Onboarding'
import Explore from './pages/Explore';

const Tab = createBottomTabNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://3701-2600-387-f-6110-00-b.ngrok.io/graphql',
  cache: new InMemoryCache()
});

export default function App() {

  return (

    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="About You" component={AboutYou} />
            <Tab.Screen name="Onboarding" component={Onboarding} />
            <Tab.Screen name="Sign In" component={SignIn} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


AppRegistry.registerComponent('Move', () => App);