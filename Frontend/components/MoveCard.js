import React, { useQuery, gql } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Button } from "react-native-paper";

import { useNavigation } from '@react-navigation/native';

export default function MoveCard(item, type) {
    const navigation = useNavigation();
    const imgSource = { uri: "https://picsum.photos/700" };
    const moveObj = item['move'];

    const goToChat = () => {
        console.log("changing to chat");
        navigation.navigate('Chat', { chatId: moveObj.chatId});
    }

    // const saveAndGoToProfile = () => {
        // useQuery(gql`
        //     createMove {
        //         getChat(id) {
        //             id,
        //             friendIds,
        //             messageIds,
        //             creationTime,
        //             owner,
        //             type,
        //             messages,
        //             moves,
        //         }
        //     }
        // `);


    //     navigation.navigate('Profile');
    // }

    return (
      <View className="bg-white w-full py-4">
        <Card>
          <Card.Cover source={imgSource} />
          <Card.Title title={moveObj.title} subtitle={moveObj.time} />
          <Card.Content>
            <Text variant="bodyMedium">{moveObj.description}</Text>
          </Card.Content>
          <Card.Actions>
            {type == "explore" ? <Button>move!</Button> : <Button onPress={goToChat}>Message!</Button> }

          </Card.Actions>
        </Card>
      </View>
    );
  };