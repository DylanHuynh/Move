import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  Pressable,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
// import * as Location from 'expo-location';
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function AboutYou() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const GOOGLE_PLACES_API_KEY = "AIzaSyCnGMj8SzB61nPZ4Ljic6E6sj1pULOX9g4";

  // useEffect(() => {
  //     (async () => {

  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== 'granted') {
  //         setErrorMsg('Permission to access location was denied');
  //         return;
  //       }

  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation(location);
  //     })();
  //   }, []);

  //   let text = 'Waiting..';
  //   if (errorMsg) {
  //     text = errorMsg;
  //   } else if (location) {
  //     text = JSON.stringify(location);
  //   }

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">tell me about yourself</Text>
      <View className="flex flex-row items-start justify-between">
        <Text variant="titleLarge">when's your birthday?</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
        />
      </View>
      <Text variant="titleLarge">where are you based?</Text>
      <View className="border-2 h-[5.7vh] border-primary-color rounded-md">
        <GooglePlacesAutocomplete
          placeholder="drop the addy"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const city = data["terms"][data["terms"].length - 3].value;
            console.log(city);
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
        />
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    gap: 20,
    padding: 40,
  },
});
