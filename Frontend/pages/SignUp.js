import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = getAuth();
  const [warningMessage, setWarningMessage] = useState("");
  const signUpWithCredentials = () =>
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigation.navigate("About You");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setWarningMessage(errorCode);
        console.log(errorCode);
      });

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">join the move</Text>
      {warningMessage == "auth/weak-password" ? (
        <Text textColor="red">
          make sure your password is over 6 characters. keep your account safe!
        </Text>
      ) : warningMessage == "auth/invalid-email" ? (
        <Text textColor="red">invalid email. tough</Text>
      ) : warningMessage == "auth/email-already-in-use" ? (
        <Text textColor="red">email already in use. log in to get moving</Text>
      ) : null}
      <TextInput
        label="email"
        activeUnderlineColor="#00A6A6"
        value={email}
        mode={"contained-tonal"}
        style={{ backgroundColor: "#F8F5EE" }}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        label="password"
        activeUnderlineColor="#00A6A6"
        value={password}
        mode={"contained-tonal"}
        style={{ backgroundColor: "#F8F5EE" }}
        onChangeText={(password) => setPassword(password)}
      />
      <View>
        <Button
          textColor="black"
          style={{ backgroundColor: "#FFD978" }}
          onPress={signUpWithCredentials}
          mode="contained"
        >
          sign up
        </Button>
        <Button
          textColor="black"
          onPress={() => navigation.navigate("Sign In")}
        >
          already a user? log in here!
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#F8F5EE",
    // alignItems: 'center',
    justifyContent: "center",
    gap: 15,
    padding: 40,
    paddingBottom: 100,
  },
});
