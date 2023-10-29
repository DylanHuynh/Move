import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, TextInput, Text } from 'react-native-paper';
import {
    Tabs,
    TabScreen,
    TabsProvider
} from 'react-native-paper-tabs';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GET_CURRENT_MOVES = gql`
    query {
      moves {
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
      moves {
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

export default function Profile() {
    const [currentMoves, setCurrentMoves] = useState([]);
    const [pastMoves, setPastMoves] = useState([]);
    const [email, setEmail] = useState('');
    const [isSearchBarVisible, setSearchBarVisible] = useState(false);
    const mockProfile = {
        id: 1, // Replace with the actual logged-in user's ID
        name: "Bob",
        friends: ["12432", "84828"],
        totalMoves: 3,
    }
    const profile = mockProfile;
    
    const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_CURRENT_MOVES);
    const { loading: pastLoading, error: pastError, data: pastData } = useQuery(GET_PAST_MOVES);
    const [addFriendByEmail] = useMutation(ADD_FRIEND_BY_EMAIL);

    useEffect(() => {
        if (!currentLoading && !currentError) {
            setCurrentMoves(currentData.moves);
        }
        if (!pastLoading && !pastError) {
            setPastMoves(pastData.moves);
        }
    }, [currentLoading, currentError, currentData, pastLoading, pastError, pastData]);

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
                    <Button onPress={handleAddFriend} style={styles.addButton}>Add Friend</Button>
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
