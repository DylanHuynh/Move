<<<<<<< HEAD
import React, { useState } from "react";
import {
  View,
  FlatList,
  Modal,
  Linking,
  Image,
  ScrollView,
} from "react-native";
import { Card, Button, IconButton, Text } from "react-native-paper";
=======
import React from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";
import MoveCard from "../components/MoveCard";
>>>>>>> 287d7a772993480decfc178432bdd60531b4bb57

export default function Explore() {
  const moves = [
    {
      moveId: 1,
      location: "San Francisco",
      time: "1:00 PM",
      userIds: [1, 2, 3],
      description:
        "Go barhopping with your kid! I know they can't drink but bring them anyways. Don't forget them tho!",
      chatId: 1,
      type: "private?",
      status: "Closed",
      title: "sf bar hopping with kids!",
      link: null,
    },
    {
      moveId: 2,
      location: "San Francisco 2",
      time: "1:00 PM",
      userIds: [7, 2, 3],
      description: "Sample Description! Lorem ipsum blah blah blah. Console console console. there's no console that's what I thought, theres no. wait that looks gas can I have one. you're writing a limmerick",
      chatId: 2,
      type: "private?",
      status: "Closed",
      title: "clink with the homies!",
      link: "https://www.eventbrite.com/e/the-rocky-horror-show-tickets-726405728087?aff=ebdssbeditorialcollection",
    },
    {
      moveId: 3,
      location: "San Francisco 3",
      time: "2:00 PM",
      userIds: [7, 2, 3],
      description: "There once was a man from Manhattan. Who walked to the side and wait that was not right. Anyways what is going on here. Where are you catching this. Um no oh hoh oh oh. Oh oh oh oh oh oh rileyyyyy auto parts. ughhhh",
      chatId: 2,
      type: "private?",
      status: "Closed",
      title: "clink with the gals!",
    },
  ];

  const MoveCard = (item) => {
    const moveObj = item["move"];
    const [modalVisible, setModalVisible] = useState(false);

    const acceptMove = () => {
      setModalVisible(!modalVisible);
    };
    const declineMove = () => {
      setModalVisible(!modalVisible);
    };

    return (
      <View className="bg-background-color w-full py-4">
        <Card className="bg-white ">
          <Card.Cover className="rounded-b-none h-[14vh]" source={imgSource} />
          <View className="px-2">
            <Card.Title
            className="font-bold"
            title={moveObj.title}
            subtitle={moveObj.location + " @ " + moveObj.time}
            titleVariant="titleMedium"
            titleStyle={{ fontWeight: "bold" }}
            subtitleVariant="bodyLarge"
          />
          <Card.Content>
            <Text variant="bodyMedium" numberOfLines={2}>{moveObj.description}</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              className="bg-primary-color border-transparent my-2"
              textColor="black"
              onPress={() => setModalVisible(true)}
            >
              move!
            </Button>
          </Card.Actions>
          </View>
          
        </Card>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="h-full bg-black/50">
            <View className="mt-auto h-[90vh] bg-background-color justify-between rounded-t-full">
              <View className="rounded-t">
                <Image className="h-[23vh] rounded-t-xl" source={imgSource} />
                <View className="flex flex-row-reverse">
                  <IconButton
                    icon="close-circle-outline"
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
                <ScrollView className="px-10">
                  <Text variant="headlineMedium" className="font-bold py-2">{moveObj.title}</Text>
                  <Text variant="titleMedium">
                    Date and Time: {moveObj.time}
                  </Text>
                  <Text variant="titleMedium" className="py-2" >Address: {moveObj.location}</Text>
                  <Text variant="bodyMedium" >{moveObj.description}</Text>
                  {moveObj.link != null ?
                  <Text
                    variant="bodyMedium"
                    className="text-cyan-700 py-2"
                    onPress={() => Linking.openURL(moveObj.link)}
                  >
                    Link to Event!
                  </Text>
                  : <></>}
                </ScrollView>
              </View>

              <View className="flex flex-row justify-center p-2">
                <Button
                  textColor="white"
                  className="bg-primary-color w-1/3 m-10"
                  onPress={acceptMove}
                >
                  Accept
                </Button>
                <Button
                  textColor="black"
                  className="bg-secondary-color w-1/3 m-10"
                  onPress={declineMove}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderMoveCard = (item) => {
    return <MoveCard move={item["item"]} />;
  };

  return (
    <View className="h-full w-full bg-background-color p-4">
      <FlatList
        data={moves}
        renderItem={renderMoveCard}
        keyExtractor={(move) => move.moveId}
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          backgroundColor: "white",
        }}
      />
    </View>
  );
}
