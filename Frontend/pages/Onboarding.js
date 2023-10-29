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
import { useNavigation } from '@react-navigation/native';



// GoogleSignin.configure({
//   webClientId: '797668500397-j6u9050o3ahviks4kkbl983ej201rn6o.apps.googleusercontent.com',
//   offlineAccess: true,
// })

export default function Onboarding() {
    const navigation = useNavigation();

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
            <View className="gap-y-5 items-center">
            {preferences.map((pref, index) => {
                return (
                    <Button className="w-full" key={index} mode={selectedPreferences.includes(index) ? "contained-tonal" : "elevated"} style={{backgroundColor: selectedPreferences.includes(index) ? "#FDF0B0" : "#fff" }} textColor="black" onPress={() => updateSelectedPreferences(index)}>{pref}</Button>
                )
            })}
            <Button className="bg-primary-color w-fit" onPress={() => navigation.navigate("Tab Screen") } mode="contained" textColor="black">let's move</Button>
            </View>
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
