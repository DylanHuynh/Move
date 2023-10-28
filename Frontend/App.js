import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import SignIn from './pages/SignIn';
import Onboarding from './pages/Onboarding';

const Tab = createBottomTabNavigator();

export default function App() {

  return (

    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Onboarding" component={Onboarding} />
          <Tab.Screen name="Sign In" component={SignIn} />
          <Tab.Screen name="Chat" component={Chat} />
          <Tab.Screen name="Explore" component={Explore} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
