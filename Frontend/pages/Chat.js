import React, { useState, useCallback, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modal, Portal, Button, IconButton } from 'react-native-paper';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default function Chat() {
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 1,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ])

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const acceptMove = () => {
        hideModal()
    }
    const declineMove = () => {
        hideModal()
    }
    const containerStyle = { backgroundColor: 'white', height: '40%', width: '100%', borderTopLeftRadius: '20%', borderTopRightRadius: '20%' };

    const onSend = useCallback((messages = []) => {
        //TODO: send message to BE probably updateMessage(newMessage)
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        const aiResponse = "responding!";
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [
                {
                    _id: 1,
                    text: aiResponse,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ]),
        )
        Keyboard.dismiss();
        showModal();

    }, [])

    useEffect(() => {
        setMessages([
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
                            <IconButton icon="close-circle-outline" onPress={hideModal}/>
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
