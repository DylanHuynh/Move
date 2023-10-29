import React, { useState, useCallback, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal, Portal, Button, IconButton } from 'react-native-paper';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native';
import { useQuery, useMutation, gql } from '@apollo/client';


export default function Chat({ existingChat = false }) {
    let count = 0;
    const route = useRoute();
    // let { loading: currentLoading, error: currentError, data: chatId } = useQuery(gql`
    //     query {
    //         getChatByUserId (userId: 7) {
    //             id
    //             friendIds
    //             messageIds
    //             creationTime
    //             owner
    //             type
    //             messages
    //             moves
    //         }
    //     }
    // `)
    let chatId = 3;
    if (route && route.params && route.params.id) {
        chatId = route.params.id; //WILL REPLACE WITH GRABBED ID FROM FIREBASE
    }

    //TODO: make the above synchrnous with the chained useQuery

    const [chat, setChat] = useState([]);
    // if (!existingChat) {
    //     const [createChat] = useMutation(gql`
    //         mutation {
    //             createChat (ownerId: Int!, type: String!) {
    //                 id
    //                 friendIds
    //                 messageIds
    //                 creationTime
    //                 owner
    //                 type
    //                 messages
    //                 moves
    //             }
    //         }
    //     `);

    //     if (createChat != undefined) {
    //         createChat({
    //             variables: {
    //                 ownerId: 3,
    //                 type: 'solo',
    //             },
    //         })
    //             .then((result) => {
    //                 // Handle successful response
    //                 console.log('Chat created successfully:', result);
    //             })
    //             .catch((error) => {
    //                 // Handle error response
    //                 console.error('Error creating chat:', error);
    //             });

    //         setChat(newChat);
    //     }

    // } else {
    //     const { data: existingChat } = useQuery(gql`
    //         query {
    //             chat(id: ${chatId}) {
    //                 id,
    //                 friendIds,
    //                 messageIds,
    //                 creationTime,
    //                 owner,
    //                 type,
    //                 messages,
    //                 moves,
    //             }
    //         }
    //     `);
    //     setChat(existingChat);

    // }

    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ])

    const showModal = () => setVisible(false);
    const hideModal = () => setVisible(false);
    const acceptMove = () => {
        hideModal()
    }
    const declineMove = () => {
        hideModal()
    }
    const containerStyle = { backgroundColor: 'white', height: '40%', width: '100%', borderTopLeftRadius: '20%', borderTopRightRadius: '20%' };

    console.log("about to use mutation!!!")
    // // GOOGLE API KEY FUNCTIONS
    const [createMessage, { data, loading, error }] = useMutation(gql`
    mutation CreateMessage($chatId: Int!, $authorId: Int!, $text: String!) {
        createMessage(chatId: $chatId, authorId: $authorId, text: $text) {
            text
            id
        }
    }
`);

    const onSend = useCallback((messages = []) => {

        //TODO: send message to BE probably updateMessage(newMessage)
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages[messages.length - 1]),
        )

        let aiResponse = "I don't know the answer!";


        console.log("pre-reply",{messages});

        // AI Response
        if (error) {
            console.log('Error', error.message);
        } else {
            console.log(loading);
            console.log("MESSAGE: ", messages[0].text)
            createMessage({
                variables: {
                    chatId: 2,
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
                console.log("post-reply",{messages});
        }



        Keyboard.dismiss();
        showModal();

    }, [messages[messages.length - 1]])

    useEffect(() => {
        setMessages([
            {
                _id: -1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 0,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    return (
        <>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}

            //     // renderBubble={renderBubble}
            //     alwaysShowSend
            //     // renderSend={renderSend}
            //     scrollToBottom
            // // scrollToBottomComponent={scrollToBottomComponent}
            />

            <Portal>
                <Modal className="flex justify-end" visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View className="rounded-t-2xl h-full bg-slate-200">
                        <View className="flex flex-row-reverse justify-between">
                            <IconButton icon="close-circle-outline" onPress={hideModal} />
                        </View>
                        <Text className="text-xl text-center p-4">Move found! Do you want to accept or decline?</Text>
                        <View className="h-3/5 justify-between p-12">
                            <Button textColor="white" className="bg-primary-color" onPress={acceptMove}>Accept</Button>
                            <Button textColor="black" className="bg-secondary-color" onPress={declineMove}>Decline</Button>
                        </View>
                    </View>
                </Modal>
            </Portal>

        </>



    );
}

const styles = StyleSheet.create({});
