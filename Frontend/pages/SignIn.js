import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signInWithCredentials = () => (
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log("user created!")
        const user = userCredential.user;
        navigation.navigate("About You")
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
      <TextInput label="email" value={email} mode={'outlined'} onChangeText={email => setEmail(email)} />
      <TextInput label="password" value={password} mode={'outlined'} onChangeText={password => setPassword(password)} />
      <Button textColor="white" className="bg-primary-color" onPress={signInWithCredentials} mode="contained">sign up</Button>
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
