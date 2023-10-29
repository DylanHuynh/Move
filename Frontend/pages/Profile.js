import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQuery, gql } from '@apollo/client';

import {
    Button,
    Title,
    Paragraph,
} from 'react-native-paper';
import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
    TabsProvider
} from 'react-native-paper-tabs';
import { Dimensions, StyleSheet, View, Animated, Pressable, Text } from 'react-native';


export default function Profile() {
    const [currentMoves, setCurrentMoves] = useState([]);
    const [pastMoves, setPastMoves] = useState([]);
    const mockProfile = {
        name: "Bob",
        friends: ["12432", "84828"],
        totalMoves: 3,
    }
    const profile = mockProfile;
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
    }`;

    const { loading: currentLoading, error: currentError, data: currentData } = useQuery(GET_CURRENT_MOVES);
    const { loading: pastLoading, error: pastError, data: pastData } = useQuery(GET_PAST_MOVES);

    useEffect(() => {
        console.log(currentLoading);
        console.log(currentError);
        console.log(currentData);

        console.log(pastData);

        if (!currentLoading && !currentError) {
            setCurrentMoves(currentData.moves);
        }
        if (!pastLoading && !pastError) {
            setPastMoves(pastData.moves);
        }
    }, [currentLoading, currentError, currentData, pastLoading, pastError, pastData]);

    // setCurrentMoves(currentData);
    // setPastMoves(pastData);




return (
    <View className="flex">
        <View className='flex-none items-center h-40 p-10'>
            <Text className="font-bold text-4xl">{mockProfile.name}</Text>
            <Text>{mockProfile.totalMoves}</Text>
        </View>

        <View className="flex-auto" >
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

                        </View>
                    </TabScreen>
                    <TabScreen
                        label="Current Moves"
                        icon="bag-suitcase"
                    // optional props
                    // badge={true} // only show indicator
                    // badge="text"
                    // badge={1}
                    // onPressIn={() => {
                    //   console.log('onPressIn explore');
                    // }}
                    // onPress={() => {
                    //   console.log('onPress explore');
                    // }}
                    >
                        <View style={{ backgroundColor: 'red', flex: 1 }} />
                    </TabScreen>
                </Tabs>
            </TabsProvider>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
});
