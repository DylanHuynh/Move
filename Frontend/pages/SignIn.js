import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Initialize Firebase and Google Sign-In
const auth = getAuth();
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  // webClientId: 'your-web-client-id', // Uncomment this line if you are using Firebase
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      
      // If the sign-in was successful, you can make API calls here
      const accessToken = (await GoogleSignin.getTokens()).accessToken;
      const calendarData = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const calendarJson = await calendarData.json();
      console.log(calendarJson);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">join the move</Text>
      <TextInput label="email" value={email} mode={'outlined'} onChangeText={setEmail} />
      <TextInput label="password" value={password} mode={'outlined'} onChangeText={setPassword} />
      <Button onPress={signInWithGoogle} mode="contained" style={styles.button}>sign up with Google</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 40, 
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff6200', // Example color
  },
});
