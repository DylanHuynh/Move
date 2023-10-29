import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, TextInput, Text } from 'react-native-paper';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import { StyleSheet, View, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GET_CURRENT_MOVES = gql`
    query {
      getUserMoves (userId: 1, status: "active") {
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
        getUserMoves (userId: 1, status: "past") {
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

    useEffect(() => {
        if (!currentLoading && currentData) {
            setCurrentMoves(currentData.getUserMoves);
        }
        if (!pastLoading && pastData) {
            setPastMoves(pastData.getUserMoves);
        }
    }, [currentLoading, currentData, pastLoading, pastData]);

    const renderMoveCard = (item) => {
        return <MoveCard move={item["item"]} />;
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
                    <Button onPress={() => {
                        addFriendByEmail({
                            variables: {
                                userId: 1,
                                email
                            }
                        })
                        setEmail('')
                    }
                    } style={styles.addButton}>Add Friend</Button>
                </View>
            )}
            <View className="h-full">
                <TabsProvider defaultIndex={1} style={styles.tabsProvider}>
                    <Tabs style={styles.tabs}>
                        <TabScreen label="Past Moves" icon="history">
                            <View style={styles.tabContent}>
                                <FlatList
                                    data={pastData != undefined && pastData["getUserMoves"].length > 0 ? pastData["getUserMoves"] : []}
                                    renderItem={renderMoveCard}
                                    keyExtractor={(move) => move.moveId}
                                    style={{ flex: 1, height: '100%', width: '100%', backgroundColor: "white" }}
                                />
                            </View>
                        </TabScreen>
                        <TabScreen label="Current Moves" icon="bag-suitcase">
                            <View style={styles.tabContent}>
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
