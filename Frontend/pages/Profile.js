import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, TextInput, Text } from 'react-native-paper';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import { StyleSheet, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// const [createMessage, { data, loading, error }] = useMutation(gql
//     mutation CreateMessage($chatId: Int!, $authorId: Int!, $text: String!) {
//         createMessage(chatId: $chatId, authorId: $authorId, text: $text) {
//             text
//             id
//         }
//     }
// );

//     const onSend = useCallback((messages = []) => {

//         //TODO: send message to BE probably updateMessage(newMessage)
//         setMessages(previousMessages =>
//             GiftedChat.append(previousMessages, messages[messages.length - 1]),
//         )

//         let aiResponse = "I don't know the answer!";


//         console.log("pre-reply",{messages});

//         // AI Response
//         if (error) {
//             console.log('Error', error.message);
//         } else {
//             console.log(loading);
//             console.log("MESSAGE: ", messages[0].text)
//             createMessage({
//                 variables: {
//                     chatId: 2,
//                     authorId: 1, //TODO: hook up userId
//                     text: messages[0].text,
//                 },
//             })
//                 .then((result) => {
//                     // Handle successful response
//                     console.log('Message created successfully:', result);
//                     aiResponse = result.data.createMessage.text;
//                     setMessages(previousMessages =>
//                         GiftedChat.append(previousMessages, [
//                             {
//                                 _id: result.data.createMessage.id,
//                                 text: aiResponse,
//                                 createdAt: new Date(),
//                                 user: {
//                                     _id: 0,
//                                     name: 'React Native',
//                                     avatar: 'https://placeimg.com/140/140/any',
//                                 },
//                             },

const GET_CURRENT_MOVES = gql`
    query {
      getUserMoves (userId: 7, status: "active") {
        id
        title
        location
        time
        userId
        description
        chatId
        type
        status
      }
    }
`;

const GET_PAST_MOVES = gql`
    query {
        getUserMoves (userId: 7, status: "past") {
            id
            title
            location
            time
            userId
            description
            chatId
            type
            status
        }
    }
`;

// const ADD_FRIEND_BY_EMAIL = gql`
//     mutation{
//         addFriendByEmail(userId: 1, email: "evann@gmail.com") 
//     }
// `;

export default function Profile() {
    const [currentMoves, setCurrentMoves] = useState([]);
    const [pastMoves, setPastMoves] = useState([]);
    const [email, setEmail] = useState('');
    const [isSearchBarVisible, setSearchBarVisible] = useState(false);
    const [addFriendByEmail] = useMutation(gql`
        mutation AddFriendByEmail($userId: Int!, $email: String!) {
            addFriendByEmail(userId: $userId, email: $email)
        }
    `)

    
    const mockProfile = {
        id: 2,
        name: "Bob",
        totalMoves: 3,
    }
    
    const profile = mockProfile;

    const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_CURRENT_MOVES);
    const { loading: pastLoading, error: pastError, data: pastData } = useQuery(GET_PAST_MOVES);
    // const [addFriendByEmail] = useMutation(ADD_FRIEND_BY_EMAIL);

    useEffect(() => {
        if (!currentLoading && currentData) {
            setCurrentMoves(currentData.getUserMoves);
        }
        if (!pastLoading && pastData) {
            setPastMoves(pastData.getUserMoves);
        }
    }, [currentLoading, currentData, pastLoading, pastData]);

    // const handleAddFriend = async () => {
    //     try {
    //         const response = await addFriendByEmail();
    //         console.log(response.data.addFriendByEmail);
    //         setEmail('');
    //         setSearchBarVisible(false);
    //         // Optionally: Update UI to show success message or refresh friend list
    //     } catch (error) {
    //         console.error('Error adding friend:', error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.totalMoves}>{profile.totalMoves} Moves</Text>
                <Pressable onPress={() => setSearchBarVisible(!isSearchBarVisible)} style={styles.addFriendIcon}>
                    <Icon name="user-plus" size={24} color="black" />
                </Pressable>
            </View>
            {isSearchBarVisible && (
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Enter friend's email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput}
                    />
                    <Button onPress={addFriendByEmail({
                        variables: {
                            userId: 1,
                            email
                        }
                    })} style={styles.addButton}>Add Friend</Button>
                </View>
            )}

            <TabsProvider defaultIndex={1} style={styles.tabsProvider}>
                <Tabs style={styles.tabs}>
                    <TabScreen label="Past Moves" icon="history">
                        <View style={styles.tabContent}>
                            {/* Render your past moves here */}
                        </View>
                    </TabScreen>
                    <TabScreen label="Current Moves" icon="bag-suitcase">
                        <View style={styles.tabContent}>
                            {/* Render your current moves here */}
                        </View>
                    </TabScreen>
                </Tabs>
            </TabsProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    totalMoves: {
        fontSize: 16,
    },
    addFriendIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    searchBar: {
        flexDirection: 'row',
        padding: 10,
    },
    textInput: {
        flex: 1,
        marginRight: 10,
    },
    addButton: {
        justifyContent: 'center',
    },
    tabsProvider: {
        flex: 1,
    },
    tabs: {
        backgroundColor: '#fff',
    },
    tabContent: {
        flex: 1,
    },
});
