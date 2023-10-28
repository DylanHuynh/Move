import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function Explore() {
    const imgSource = { uri: 'https://picsum.photos/700' };
    const moves = [
        {
            moveId: 1,
            location: "San Francisco",
            time: "1:00 PM",
            userIds: [1, 2, 3],
            description: "Go barhopping with your kid! I know they can't drink but bring them anyways. Don't forget them tho!",
            chatId: 1,
            type: "private?",
            status: "Closed",
            title: "SF Barhopping with Kids!"
        },
        {
            moveId: 2,
            location: "San Francisco 2",
            time: "1:00 PM",
            userIds: [7, 2, 3],
            description: "Sample Description!",
            chatId: 2,
            type: "private?",
            status: "Closed",
            title: "Clink with the Homies!"
        },
    ]
    return (
        <View>
            {moves.map((move) => {
                return (
                    <Card>
                        <Card.Cover source={imgSource} />
                        <Card.Title title={move.title} subtitle={move.time} />
                        <Card.Content>
                            <Text variant="bodyMedium">{move.description}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Move!</Button>
                        </Card.Actions>
                    </Card>
                )
            })}
        </View>
    )
}