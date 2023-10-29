import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, gql } from '@apollo/client';


// GoogleSignin.configure({
//   webClientId: '797668500397-j6u9050o3ahviks4kkbl983ej201rn6o.apps.googleusercontent.com',
//   offlineAccess: true,
// })

export default function Onboarding() {

    const auth = getAuth();
    const user = auth.currentUser;


    const route = useRoute();
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

    const [createUser, { error }] = useMutation(gql`
            mutation CreateUser($id: Int!, $name: String!, $email: String!) {
                createUser(id: $id, name: $name, email: $email) {
                    id
                }
            }
        `);

    const handleSubmit = () => {
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const email = user.email;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            createUser({
                variables: {
                    id: uid,
                    name: route.params.name, //TODO: hook up userId
                    email,
                },
            })
                .then((result) => {
                    // Handle successful response
                    console.log('Message created successfully:', result);

                })
                .catch((error) => {
                    // Handle error response
                    console.error('Error creating chat:', error);
                });
        }

    }


    navigation.navigate("Tab Screen");


    return (
        <View style={styles.container}>
            <Text variant="displaySmall">what's the move</Text>
            <Text variant="bodyMedium">for us to personalize your friday night recommendations</Text>
            <View className="gap-y-5 items-center">
                {preferences.map((pref, index) => {
                    return (
                        <Button className="w-full" key={index} mode={selectedPreferences.includes(index) ? "contained-tonal" : "elevated"} style={{ backgroundColor: selectedPreferences.includes(index) ? "#FDF0B0" : "#fff" }} textColor="black" onPress={() => updateSelectedPreferences(index)}>{pref}</Button>
                    )
                })}
                <Button className="bg-primary-color w-fit" onPress={() => handleSubmit()} mode="contained" textColor="black">let's move</Button>
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
