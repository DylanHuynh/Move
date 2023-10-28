import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Pressable,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { auth } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";


// GoogleSignin.configure({
//   webClientId: '797668500397-j6u9050o3ahviks4kkbl983ej201rn6o.apps.googleusercontent.com',
//   offlineAccess: true,
// })

export default function SignIn() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const signInWithGoogle = () => (
        createUserWithEmailAndPassword(auth, email,password)
            .then((userCredential) => {
              // Signed up
              console.log("user created!")
              const user = userCredential.user;
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
            }
        )
    );

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">join the move</Text>
      <TextInput label="email" value={email} mode={'outlined'} onChangeText={email => setEmail(email)}/>
      <TextInput label="password" value={password} mode={'outlined'} onChangeText={password => setPassword(password)}/>
      <Button onPress={signInWithGoogle} mode="contained">sign up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 40, 
      },
});
