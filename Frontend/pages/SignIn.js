import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = getAuth();
  const [warningMessage, setWarningMessage] = useState(false);

  const signInWithCredentials = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigation.navigate("Tab Screen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setWarningMessage(true);
      });

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">let's move</Text>
      {warningMessage == true ? (
        <Text color="red">
          whoops! that's not right. let's move on together and try again
        </Text>
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
          onPress={signInWithCredentials}
          mode="contained"
        >
          log in
        </Button>
        <Button
          textColor="black"
          onPress={() => navigation.navigate("Sign Up")}
        >
          new user? sign up here
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
