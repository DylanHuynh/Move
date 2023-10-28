import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
} from 'react-native-paper-tabs';
import { Dimensions, StyleSheet, View, Animated, Pressable } from 'react-native';

export default function Profile() {
    return (
        <TabsProvider
            defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
        >
            <Tabs
            // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
            // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
            // iconPosition // leading, top | default=leading
            // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
            // dark={false} // works the same as AppBar in react-native-paper
            // theme={} // works the same as AppBar in react-native-paper
            // mode="scrollable" // fixed, scrollable | default=fixed
            // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
            // disableSwipe={false} // (default=false) disable swipe to left/right gestures
            >
                <TabScreen label="Explore" icon="compass">
                    <ExploreWitHookExamples />
                </TabScreen>
                <TabScreen label="Flights" icon="airplane" disabled>
                    <View style={{ backgroundColor: 'black', flex: 1 }} />
                </TabScreen>
                <TabScreen
                    label="Trips"
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
    )
}

const styles = StyleSheet.create({
});
