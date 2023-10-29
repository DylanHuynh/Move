import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {
    View,
    FlatList,
    Modal,
    Linking,
    Image,
    ScrollView,
} from "react-native";
import { Card, Button, IconButton, Text, Avatar } from "react-native-paper";
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

export default MoveCard = (item) => {
    const imgSource = { uri: "https://picsum.photos/700" };
    const moveObj = item["move"];
    const [modalVisible, setModalVisible] = useState(false);

    const [updateMoveUserIds, { moveError }] = useMutation(gql`
    mutation UpdateMoveUserIds($moveId: Int!, $userId: Int!) {
        updateMoveUserIds(moveId: $moveId, userId: $userId) {
            id
        }
    }
`);

    const [updateUserMoveIds, { userError }] = useMutation(gql`
    mutation UpdateUserMoveIds($moveId: Int!, $userId: Int!) {
        updateUserMoveIds(moveId: $moveId, userId: $userId) {
            id
        }
    }
`);
    const [currentMoves, setCurrentMoves] = useState([]);
    const GET_MOVE_MEMBERS = gql`
    query {
        getUserMoveMembers (moveId: 2)
  }`

    const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_MOVE_MEMBERS);

    useEffect(() => {
        if (!currentLoading && currentData) {
            setCurrentMoves(currentData.getUserMoveMembers);
        }

    }, [currentLoading, currentData]);


    const declineMove = () => {
        setModalVisible(!modalVisible);
    };

    const acceptMove = () => {
        setModalVisible(!modalVisible);


        if (!moveError && !userError) {
            updateMoveUserIds({
                variables: {
                    userId: 2,
                    moveId: 1, //TODO: hook up userId
                },
            })
                .then((result) => {
                    // Handle successful response
                    console.log('Move updated successfully:', result);

                })
                .catch((error) => {
                    // Handle error response
                    console.error('Error updating move', error);
                });

            updateUserMoveIds({
                variables: {
                    userId: 2,
                    moveId: 1, //TODO: hook up userId
                },
            })
                .then((result) => {
                    // Handle successful response
                    console.log('User updated successfully:', result);

                })
                .catch((error) => {
                    // Handle error response
                    console.error('Error updating user', error);
                });
        }
        navigation.navigate('Profile');
    }


    return (
        <View className="bg-background-color w-full py-6">
            <Card className="bg-white ">
                <Card.Cover
                    className="rounded-b-none h-[14vh] object-cover"
                    source={imgSource}
                />
                <View className="px-2">
                    <Card.Title
                        className="font-bold pt-6 pb-2"
                        title={moveObj.title}
                        subtitle={moveObj.location + " @ " + moveObj.time}
                        titleVariant="titleLarge"
                        titleStyle={{ fontWeight: "bold" }}
                        subtitleVariant="bodyLarge"
                    />
                    <Card.Content>
                        <Text variant="bodyMedium" numberOfLines={2}>
                            {moveObj.description}
                        </Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            className="bg-primary-color border-transparent my-2"
                            textColor="black"
                            onPress={() => setModalVisible(true)}>

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
                            <View className="flex flex-row-reverse absolute">
                                <IconButton
                                    // className="absolute"
                                    icon="close-circle-outline"
                                    iconColor="white"
                                    onPress={() => setModalVisible(!modalVisible)}
                                />
                            </View>
                            <ScrollView className="px-10">
                                <Text variant="headlineMedium" className="font-bold pt-7 pb-5">
                                    {moveObj.title}
                                </Text>
                                <View className="flex flex-row justify-between item-start">
                                    <Text variant="titleMedium" className="font-bold">
                                        {moveObj.time}
                                    </Text>
                                    {moveObj.link != null ? (
                                        <Text
                                            variant="bodyLarge"
                                            className="text-cyan-700"
                                            onPress={() => Linking.openURL(moveObj.link)}
                                        >
                                            Link to Event!
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                                <Text variant="titleMedium" className="font-bold pb-4">
                                    {moveObj.location}
                                </Text>
                                <Text variant="bodyMedium" className="pb-4">
                                    {moveObj.description}
                                </Text>
                                <Text variant="titleMedium" className="font-bold pb-4">
                                    With
                                </Text>
                                <View className="flex flex-row justify-evenly items-center">
                                    {/* <Avatar.Text size={24} label="XD" /> */}
                                    {currentMoves.slice(0, 4).map((member) => {
                                        return (
                                            <View className="items-center">
                                                <Avatar.Text
                                                    className=""
                                                    size={48}
                                                    key={member}
                                                    label={member[0]}
                                                />
                                                <Text>{member}</Text>
                                            </View>
                                        );
                                    })}
                                    {currentMoves.length > 4 ? (
                                        <Text variant="titleMedium">
                                            +{currentMoves.length - 4} more!
                                        </Text>
                                    ) : null}
                                </View>
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
                            {/* <Button
                textColor="black"
                className="bg-secondary-color w-1/3 m-10 ml-5"
                onPress={declineMove}
              >
                Cancel
              </Button> */}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
