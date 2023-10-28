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

export default function Onboarding() {
    const preferences = [
        "being active",
        "meeting new people",
        "nom nom nom",
        "touch some grass",
        "dance all night",
        "concerts and music",
        "secondhand markets"
    ];

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">what's the move</Text>
            <Text variant="bodyMedium">for us to personalize your friday night recommendations</Text>
            {/* <Button onPress={console.log()} mode="outlined">being active</Button>
            <Button onPress={console.log()} mode="outlined">meeting new people</Button>
            <Button onPress={console.log()} mode="outlined">nom nom nom</Button>
            <Button onPress={console.log()} mode="outlined">touch some grass</Button>
            <Button onPress={console.log()} mode="outlined">dance all night</Button>
            <Button onPress={console.log()} mode="outlined">concerts and music</Button>
            <Button onPress={console.log()} mode="outlined">secondhand markets</Button> */}
            {preferences.map((pref) => {
                return (
                    <Button mode="outlined" textColor="black" className="bg-secondary-color">{pref}</Button>
                )
            })}
            <Button onPress={console.log()} mode="contained" className="bg-primary-color">let's move</Button>
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
