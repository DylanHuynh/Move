import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Modal,
  Linking,
  Image,
  ScrollView,
} from "react-native";
import { Card, Button, IconButton, Text } from "react-native-paper";
import { useQuery, useMutation, gql } from "@apollo/client";

import MoveCard from "../components/MoveCard";

export default function Explore() {
  const [currentMoves, setCurrentMoves] = useState([]);
  const GET_MOVES = gql`
    query {
      moves {
        id
        title
        location
        time
        userId
        userIds
        description
        chatId
        type
        status
      }
    }
`;

  const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_MOVES);

  useEffect(() => {
    if (!currentLoading && currentData) {
      setCurrentMoves(currentData.moves);
    }

  }, [currentLoading, currentData]);

  const moves = []
  for (const move of currentMoves) {
    moves.push({
      moveId: move["id"],
      location: move["location"]
    })
  }

  // const moves = [
  //   {
  //     moveId: 1,
  //     location: "San Francisco",
  //     time: "1:00 PM",
  //     userIds: [1, 2, 3],
  //     description:
  //       "Go barhopping with your kid! I know they can't drink but bring them anyways. Don't forget them tho!",
  //     chatId: 1,
  //     type: "private?",
  //     status: "Closed",
  //     title: "sf bar hopping with kids!",
  //     link: null,
  //     moveMembers: ["Dylan", "Evan", "Caleb", "Clara", "Hallo"],
  //     userCount: 10
  //   },
  //   {
  //     moveId: 2,
  //     location: "San Francisco 2",
  //     time: "1:00 PM",
  //     userIds: [7, 2, 3],
  //     description: "Sample Description! Lorem ipsum blah blah blah. Console console console. there's no console that's what I thought, theres no. wait that looks gas can I have one. you're writing a limmerick",
  //     chatId: 2,
  //     type: "private?",
  //     status: "Closed",
  //     title: "clink with the homies!",
  //     link: "https://www.eventbrite.com/e/the-rocky-horror-show-tickets-726405728087?aff=ebdssbeditorialcollection",
  //     moveMembers: ["Dylan", "Evan"],
  //     userCount: 4
  //   },
  //   {
  //     moveId: 3,
  //     location: "San Francisco 3",
  //     time: "2:00 PM",
  //     userIds: [7, 2, 3],
  //     description: "There once was a man from Manhattan. Who walked to the side and wait that was not right. Anyways what is going on here. Where are you catching this. Um no oh hoh oh oh. Oh oh oh oh oh oh rileyyyyy auto parts. ughhhh",
  //     chatId: 2,
  //     type: "private?",
  //     status: "Closed",
  //     title: "clink with the gals!",
  //     link: null,
  //     moveMembers: ["Dylan", "Evan", "Caleb", "Clara", "Hallo"],
  //     userCount: 2
  //   },
  // ];

  const renderMoveCard = (item) => {
    return <MoveCard move={item["item"]} page="explore"/>;
  };
  return (
    <View className="h-full w-full bg-background-color p-4">
      <FlatList
        data={moves}
        renderItem={renderMoveCard}
        keyExtractor={(move) => move.moveId}
      />
    </View>
  );
}
