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
    const [selectedPreferences, setSelectedPreferences] = useState([])
    const [mode, setMode] = useState(-1)

    const updateSelectedPreferences = (index) => {
        const updatedPreferences = [...selectedPreferences]
            
        if (selectedPreferences.includes(index)) {
            setSelectedPreferences([...selectedPreferences].filter((pref) => pref != index))
            console.log("how", selectedPreferences)
        } else {
            updatedPreferences.push(index);
            setSelectedPreferences(updatedPreferences)
        }
    }

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">what's the move</Text>
            <Text variant="bodyMedium">for us to personalize your friday night recommendations</Text>
            {preferences.map((pref, index) => {
                return (
                    <Button key={index} mode={selectedPreferences.includes(index) ? "contained" : "contained-tonal"} textColor="black" onPress={() => updateSelectedPreferences(index)}>{pref}</Button>
                )
            })}
            <Button onPress={() => console.log("hello")} mode="contained" className="bg-primary-color">let's move</Button>
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
