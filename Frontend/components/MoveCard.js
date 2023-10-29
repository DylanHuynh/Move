import React, { useState, useQuery, gql } from "react";
import {
    View,
    FlatList,
    Modal,
    Linking,
    Image,
    ScrollView,
} from "react-native";
import { Card, Button, IconButton, Text } from "react-native-paper";

import { useNavigation } from '@react-navigation/native';

export default MoveCard = (item) => {
    const imgSource = { uri: "https://picsum.photos/700" };
    const moveObj = item['move'];
    const [modalVisible, setModalVisible] = useState(false);

    const acceptMove = () => {
        setModalVisible(!modalVisible);
    };
    const declineMove = () => {
        setModalVisible(!modalVisible);
    };

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
        <View className="bg-background-color w-full py-6">
            <Card className="bg-white ">
                {/* <Card.Cover className="rounded-b-none h-[14vh]" source={imgSource} /> */}
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
