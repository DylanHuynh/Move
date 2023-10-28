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

export default function AboutYou() {
  const navigation = useNavigation();

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
    <View className="flex flex-col p-10 h-full justify-between">
      <ScrollView >
      <Text variant="displaySmall">tell me about yourself</Text>
      
        <View className="flex flex-col justify-between">
          <Text variant="titleLarge">what's your name</Text>
          <View className="">
            <TextInput
              label="name"
              mode={"outlined"}
              onChangeText={() => console.log()}
            />
          </View>
        </View>

        <View className="flex flex-row items-start justify-between">
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
          <Text variant="titleLarge">where are you based?</Text>
          {/* <View className="border-2 h-[10vh] border-primary-color rounded-md"> */}
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
          {/* </View>    */}
        </View>
      </ScrollView>

      <Button
        onPress={() => navigation.navigate("Onboarding")}
        mode="contained"
        className="bg-primary-color"
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
