import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { auth } from "../firebaseConfig";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigation } from '@react-navigation/native';

// Initialize Firebase and Google Sign-In
// const auth = getAuth();
// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
//   // webClientId: 'your-web-client-id', // Uncomment this line if you are using Firebase
// });

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      
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
    const navigation = useNavigation();
    const signInWithCredentials = () => (
        createUserWithEmailAndPassword(auth, email,password)
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
      <TextInput label="email" value={email} mode={'outlined'} onChangeText={setEmail} />
      <TextInput label="password" value={password} mode={'outlined'} onChangeText={setPassword} />
      <Button onPress={signInWithCredentials} mode="contained" style={styles.button}>sign up with Google</Button>
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



// v1 below:
// import React, { useState } from "react";
// import {
//   Dimensions,
//   StyleSheet,
//   View,
//   Animated,
//   Pressable,
// } from "react-native";
// import { Text, TextInput, Button } from "react-native-paper";
// import { auth } from "../firebaseConfig";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";

// import { GoogleSignin } from "@react-native-community/google-signin";

// import { initializeApp } from "firebase/app";

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
// });

// try {
//   await GoogleSignin.hasPlayServices();
//   const userInfo = await GoogleSignin.signIn();
//   const accessToken = userInfo.accessToken;

//   // Now use the access token to fetch calendar data
//   const calendarData = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   const calendarJson = await calendarData.json();
//   console.log(calendarJson);
// } catch (error) {
//   console.error(error);
// }

// // GoogleSignin.configure({
// //   webClientId: '797668500397-j6u9050o3ahviks4kkbl983ej201rn6o.apps.googleusercontent.com',
// //   offlineAccess: true,
// // })

// export default function SignIn() {
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");
//     const signInWithGoogle = () => (
//         createUserWithEmailAndPassword(auth, email,password)
//             .then((userCredential) => {
//               // Signed up
//               console.log("user created!")
//               const user = userCredential.user;
//               // ...
//             })
//             .catch((error) => {
//               const errorCode = error.code;
//               const errorMessage = error.message;
//               console.log(errorMessage);
//             }
//         )
//     );

//   return (
//     <View style={styles.container}>
//       <Text variant="displaySmall">join the move</Text>
//       <TextInput label="email" value={email} mode={'outlined'} onChangeText={email => setEmail(email)}/>
//       <TextInput label="password" value={password} mode={'outlined'} onChangeText={password => setPassword(password)}/>
//       <Button textColor="white" className="bg-primary-color" onPress={signInWithGoogle} mode="contained">sign up</Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'column',
//         flex: 1,
//         backgroundColor: '#fff',
//         // alignItems: 'center',
//         justifyContent: 'center',
//         gap: 20,
//         padding: 40, 
//       },
// });
