import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, TextInput, Text, Avatar } from "react-native-paper";
import { Tabs, TabScreen, TabsProvider } from "react-native-paper-tabs";
import { StyleSheet, View, Pressable, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const GET_CURRENT_MOVES = gql`
  query {
    getUserMoves(userId: 7, status: "active") {
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
    getUserMoves(userId: 7, status: "past") {
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
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMoves, setCurrentMoves] = useState([]);
  const [pastMoves, setPastMoves] = useState([]);
  const [email, setEmail] = useState("");
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [addFriendByEmail] = useMutation(gql`
    mutation AddFriendByEmail($userId: Int!, $email: String!) {
      addFriendByEmail(userId: $userId, email: $email)
    }
  `);

  const mockProfile = {
    id: 2,
    name: "Bob",
    totalMoves: 32,
    totalFriends: 90,
    motion: 20
  };

  const profile = mockProfile;

  const addFriend = () => {
    setModalVisible(!modalVisible);
    addFriendByEmail({
      variables: {
        userId: 1,
        email,
      },
    });
    setEmail("");
  };

  const {
    loading: currentLoading,
    error: currentError,
    data: currentData,
  } = useQuery(GET_CURRENT_MOVES);
  const {
    loading: pastLoading,
    error: pastError,
    data: pastData,
  } = useQuery(GET_PAST_MOVES);

  useEffect(() => {
    if (!currentLoading && currentData) {
      setCurrentMoves(currentData.getUserMoves);
    }
    if (!pastLoading && pastData) {
      setPastMoves(pastData.getUserMoves);
    }
  }, [currentLoading, currentData, pastLoading, pastData]);
  const [text, setText] = useState("")
  return (
    <View style={styles.container}>
      <View className="p-8 items-center justify-between h-2/5">
        <View className="flex flex-row-reverse w-full m-3">
          <View className="flex flex-end">
            <Pressable
              onPress={() => setModalVisible(true)}
            >
              <Icon name="user-plus" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <Avatar.Text size={56} label={profile.name[0]} />
        <Text variant="headlineLarge">{profile.name}</Text>

        <View className="flex flex-row p-2 items-center w-full justify-evenly">
          <View className="flex flex-col p-2 items-center">
            <Text variant="titleLarge" className="font-bold mr-2">
              {profile.totalMoves}
            </Text>
            <Text variant="titleSmall" className="mr-2">
              Moves
            </Text>
          </View>
          {/* <Text variant="titleLarge" className="mr-2">|</Text> */}
          <View className="flex flex-col p-2 items-center ">
            <Text variant="titleLarge" className="font-bold mr-2">
              {profile.totalFriends}
            </Text>
            <Text variant="titleSmall" className="mr-2">
              Friends
            </Text>
          </View>
          <View className="flex flex-col p-2 items-center">
            <Text variant="titleLarge" className="font-bold mr-2">
              {profile.motion}
            </Text>
            <Text variant="titleSmall" className="mr-2">
              Motion
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center">
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View className="flex flex-1 justify-center items-center mt-22 bg-black/50">
              <View className="flex flex-col items-center justify-between m-20 bg-white rounded-2xl w-5/6 h-[30vh] p-5 shadow-2xl shadow-neutral-900">
                <Text className="font-bold text-lg pt-6">Add Friend</Text>
                <TextInput
                  placeholder="Enter friend's email"
                  value={email}
                  onChangeText={setEmail}
                  className="h-[5vh] w-full bg-secondary-color/25"
                />
                <View className="flex flex-col w-1/2">
                  <Button
                    className="bg-secondary-color my-2"
                    textColor="white"
                    onPress={() => {
                      if (email.length != 0) {
                         addFriend();
                      }
                    }}
                    style={styles.addButton}
                  >
                    Add Friend
                  </Button>
                  <Button
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    textColor="black"
                    style={styles.addButton}
                  >
                    Cancel
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      {isSearchBarVisible && (
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Enter friend's email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
          />
          <Button
            onPress={() => {
              addFriendByEmail({
                variables: {
                  userId: 1,
                  email,
                },
              });
              setEmail("");
            }}
            style={styles.addButton}
          >
            Add Friend
          </Button>
        </View>
      )}

      <TabsProvider defaultIndex={1} style={styles.tabsProvider}>
        <Tabs style={styles.tabs}>
          <TabScreen label="Past Moves" icon="history">
            <View style={styles.tabContent}>
              {/* Render your past moves here */}
            </View>
          </TabScreen>
          <TabScreen label="Current Moves" icon="satellite-uplink">
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
    alignItems: "center",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  totalMoves: {
    fontSize: 16,
  },
  addFriendIcon: {
    position: "absolute",
    right: 20,
    // top: 20,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    justifyContent: "center",
  },
  tabsProvider: {
    flex: 1,
  },
  tabs: {
    backgroundColor: "#fff",
  },
  tabContent: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
