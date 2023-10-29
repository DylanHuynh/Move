import React, { useState, useQuery, gql } from "react";
import {
    View,
    FlatList,
    Modal,
    Linking,
    Image,
    ScrollView,
} from "react-native";
import { Card, Button, IconButton, Text, Avatar } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

export default MoveCard = (item) => {
  const imgSource = { uri: "https://picsum.photos/700" };
  const moveObj = item["move"];
  const [modalVisible, setModalVisible] = useState(false);

    const acceptMove = () => {
        setModalVisible(!modalVisible);
    };
    const declineMove = () => {
        setModalVisible(!modalVisible);
    };

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
                  {moveObj.moveMembers.slice(0, 4).map((member, index) => {
                    return (
                      <View key={index} className="items-center">
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
                  {moveObj.moveMembers.length > 4 ? (
                    <Text variant="titleMedium">
                      +{moveObj.moveMembers.length - 4} more!
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
