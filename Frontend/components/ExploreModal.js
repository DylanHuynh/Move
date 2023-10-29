import React from "react";
import { View, Text } from "react-native";
import { Button, Portal, Modal, IconButton } from "react-native-paper";

export default function ExploreModal( {acceptMove, declineMove, hideModal, setVisible, visible} ) {
    const containerStyle = {
        backgroundColor: "white",
        height: "40%",
        width: "100%",
        borderTopLeftRadius: "20%",
        borderTopRightRadius: "20%",
      };
    
    return (
        <Portal>
        <Modal
          className="flex justify-end"
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View className="rounded-t-2xl h-full bg-slate-200 justify-between">
            <View>
              <View className="flex flex-row-reverse">
                <IconButton icon="close-circle-outline" onPress={() => setVisible(false)} />
              </View>
              <Text className=""></Text>
              <Text className="text-xl text-center p-4">
                Move found! Do you want to accept or decline?
              </Text>
            </View>

            <View className="flex flex-row py-6 justify-evenly">
              <Button
                textColor="white"
                className="bg-primary-color w-1/3"
                onPress={acceptMove}
              >
                Accept
              </Button>
              <Button
                textColor="black"
                className="bg-secondary-color w-1/3"
                onPress={declineMove}
              >
                Decline
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    )
}

