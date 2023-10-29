import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, TextInput, Text } from 'react-native-paper';
import {
    Tabs,
    TabScreen,
    TabsProvider
} from 'react-native-paper-tabs';
import { Dimensions, StyleSheet, View, Animated, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import MoveCard from '../components/MoveCard';


export default function Profile() {
    const [currentMoves, setCurrentMoves] = useState({ getUserMoves: [] });
    const [pastMoves, setPastMoves] = useState({ getUserMoves: [] });
    const mockProfile = {
        name: "Bob",
        friends: ["12432", "84828"],
        totalMoves: 3,
    }
    const profile = mockProfile;
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
    }`
        ;

    const ADD_FRIEND_BY_EMAIL = gql`
        mutation {
            addFriendByEmail(userId: 2, email: "evann@gmail.com")
        }
    `;

    const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_CURRENT_MOVES);
    const { loading: pastLoading, error: pastError, data: pastData } = useQuery(GET_PAST_MOVES);
    const [addFriendByEmail] = useMutation(ADD_FRIEND_BY_EMAIL);

    useEffect(() => {
        if (!currentLoading && !currentError) {
            console.log('setting current moves');
            setCurrentMoves(currentData.moves);
        }
        if (!pastLoading && !pastError) {
            console.log('setting past moves');

            setPastMoves(pastData.moves);
        }
    }, [currentLoading, currentError, currentData, pastLoading, pastError, pastData]);

    // setCurrentMoves(currentData);
    // setPastMoves(pastData);

    const handleAddFriend = async () => {
        try {
            const response = await addFriendByEmail({
                variables: {
                    userId: profile.id,
                    email: email,
                },
            });
            console.log(response.data.addFriendByEmail);
            setEmail('');
            setSearchBarVisible(false);
            // Optionally: Update UI to show success message or refresh friend list
        } catch (error) {
            if (error.graphQLErrors) {
                // Handle errors from the GraphQL server
                error.graphQLErrors.map(({ message }) => console.log(message));
            } else if (error.networkError) {
                // Handle network errors here
                console.log('Network error', error.networkError);
            } else {
                console.error('Error adding friend:', error);
            }
        }

    };
    const renderMoveCard = (item) => {
        return <MoveCard move={item["item"]} />;
    };


    return (
        <View className="flex">
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
                    <Button onPress={handleAddFriend} style={styles.addButton}>Add Friend</Button>
                </View>
            )}

            <View className=" h-full" >
                <TabsProvider
                    defaultIndex={1}
                // onChangeIndex={handleChangeIndex} optional
                >
                    <Tabs
                        // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
                        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
                        // iconPosition // leading, top | default=leading
                        style={{ backgroundColor: '#fff' }} // works the same as AppBar in react-native-paper
                    // dark={false} // works the same as AppBar in react-native-paper
                    // theme={} // works the same as AppBar in react-native-paper
                    // mode="scrollable" // fixed, scrollable | default=fixed
                    // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
                    // disableSwipe={false} // (default=false) disable swipe to left/right gestures
                    >
                        <TabScreen label="Past Moves" icon="history">
                            <View style={{ flex: 1 }}>
                                {/* <FlatList
                                    data={pastData != undefined && pastData["getUserMoves"].length > 0 ? pastData["getUserMoves"] : []}
                                    renderItem={renderMoveCard}
                                    keyExtractor={(move) => move.moveId}
                                    style={{ flex: 1, height: '100%', width: '100%', backgroundColor: "white" }}
                                /> */}
                            </View>
                        </TabScreen>
                        <TabScreen
                            label="Current Moves"
                            icon="bag-suitcase"
                        >
                            <View style={{ backgroundColor: 'red', flex: 1 }}>
                                <FlatList
                                    data={currentData != undefined && currentData["getUserMoves"].length > 0 ? currentData["getUserMoves"] : []}
                                    renderItem={renderMoveCard}
                                    keyExtractor={(move) => move.moveId}
                                    style={{ flex: 1, height: '100%', width: '100%', backgroundColor: "white" }}
                                />
                            </View>
                        </TabScreen>
                    </Tabs>
                </TabsProvider>
            </View>
        </View>
    )
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
