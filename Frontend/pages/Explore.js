import React from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";

export default function Explore() {
  const imgSource = { uri: "https://picsum.photos/700" };
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
      title: "SF Barhopping with Kids!",
    },
    {
      moveId: 2,
      location: "San Francisco 2",
      time: "1:00 PM",
      userIds: [7, 2, 3],
      description: "Sample Description!",
      chatId: 2,
      type: "private?",
      status: "Closed",
      title: "Clink with the Homies!",
    },
    {
        moveId: 3,
        location: "San Francisco 3",
        time: "2:00 PM",
        userIds: [7, 2, 3],
        description: "Sample Description 3!",
        chatId: 2,
        type: "private?",
        status: "Closed",
        title: "Clink with the Gals!",
      },
  ];

  const MoveCard = (item) => {
    const moveObj = item['move'];
    return (
      <View className="bg-white w-full py-4">
        <Card>
          <Card.Cover source={imgSource} />
          <Card.Title title={moveObj.title} subtitle={moveObj.time} />
          <Card.Content>
            <Text variant="bodyMedium">{moveObj.description}</Text>
          </Card.Content>
          <Card.Actions>
            <Button>cancel</Button>
            <Button>move!</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  const renderMoveCard = (item) => {
    return <MoveCard move={item["item"]}/>;
  };

  return (
    <View className="h-full w-full bg-white  p-4">
      <FlatList
        data={moves}
        renderItem={renderMoveCard}
        keyExtractor={(move) => move.moveId}
        style={{ flex: 1, height: '100%', width: '100%', backgroundColor: "white" }}
      />
    </View>
  );
}
