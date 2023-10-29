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

    const saveAndGoToProfile = (moveObj) => {
        const [createMove, { data, loading, error }] = useMutation(gql`
            mutation CreateMove($userId: Int!, $location: String!, $time: DateTime!, $description: String!, $chatId: Int!, $type: String!, $status: String!) {
                createMove(userId: $userId, location: $location, time: $time, description: $description, chatId: $chatId, type: $type, status: $status) {
                    id
                }
            }
        `);

        if (!error) {
            createMove({
                variables: {
                    userId: 2,
                    authorId: 1, //TODO: hook up userId
                    text: messages[0].text,
                },
            })
                .then((result) => {
                    // Handle successful response
                    console.log('Message created successfully:', result);
                    aiResponse = result.data.createMessage.text;
                    setMessages(previousMessages =>
                        GiftedChat.append(previousMessages, [
                            {
                                _id: result.data.createMessage.id,
                                text: aiResponse,
                                createdAt: new Date(),
                                user: {
                                    _id: 0,
                                    name: 'React Native',
                                    avatar: 'https://placeimg.com/140/140/any',
                                },
                            },
                        ]),
                    )
                })
                .catch((error) => {
                    // Handle error response
                    console.error('Error creating chat:', error);
                });

        }


        navigation.navigate('Profile');
    }

    return (
      <View className="bg-white w-full py-4">
        <Card>
          <Card.Cover source={imgSource} />
          <Card.Title title={moveObj.title} subtitle={moveObj.time} />
          <Card.Content>
            <Text variant="bodyMedium">{moveObj.description}</Text>
          </Card.Content>
          <Card.Actions>
            {type == "explore" ? <Button onPress={() => saveAndGoToProfile(moveObj)}>move!</Button> : <Button onPress={goToChat}>Message!</Button> }

          </Card.Actions>
        </Card>
      </View>
    );
  };