import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Pressable,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
// import * as Location from 'expo-location';
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";

const REACT_APP_GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
// const REACT_APP_GOOGLE_PLACES_API_KEY = "AIzaSyCnGMj8SzB61nPZ4Ljic6E6sj1pULOX9g4"

export default function AboutYou() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [date, setDate] = useState(new Date());


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <View className="bg-background-color flex flex-col p-10 h-full justify-between">
      <View>
      <Text variant="displaySmall">tell me about yourself</Text>
        <View className="flex flex-col justify-between py-4">
          <Text variant="titleLarge">what's your name</Text>
          <View className="">
            <TextInput
              label="name"
              value={name}
              onChangeText={(n) => setName(n)}
              mode={'contained-tonal'}
              className="bg-background-color"
            />
          </View>
        </View>

        <View className="flex flex-row items-start">
          <Text variant="titleLarge">when's your birthday?</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            // style={styles.dateTimePicker}

            onChange={onChange}
          />
        </View>

        <View className="flex flex-column justify-between h-1/2">
          <Text variant="titleLarge" className="py-4">where are you based?</Text>
          {/* <View className="border-2 h-[10vh] border-primary-color rounded-md"> */}
          <GooglePlacesAutocomplete
            placeholder="drop the addy"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              const city = data["terms"][data["terms"].length - 3].value;
              console.log(city);
            }}
            query={{
              key: REACT_APP_GOOGLE_PLACES_API_KEY,
              language: "en",
            }}
            styles={{
              textInputContainer: {
                backgroundColor: '#F8F5EE',
                borderTopWidth: 0,
                borderBottomWidth:1
              },
            }}
          />
          {/* </View>    */}
        </View>
        </View>


      <Button
        onPress={() => navigation.navigate("Onboarding", {name})}
        mode="contained"
        // className="bg-primary-color"
        style={{backgroundColor: "#FFD978"}}
        textColor="black"
      >
        next!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 0,
  },
  dateTimePicker: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#C5C5C5",
    borderWidth: 1,
    marginVertical: 10,
    height: 43,
  },
});
