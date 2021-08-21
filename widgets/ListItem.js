import React from 'react';
import { Text, View } from 'react-native';

export const ListItem = ({ title }) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
}

export default ListItem;