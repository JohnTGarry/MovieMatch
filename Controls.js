import React from 'react';
import { View } from 'react-native';
import AddButton from './AddButton';

const containerStyle = {
    backgroundColor: 'black',
    height: 60,
};

const Controls = () => {
    const handleAddButtonPress = () => {
        setSearching(true);
    };

    return (
        <View style={containerStyle}>
            <AddButton onPress={handleAddButtonPress} />
        </View>
    );
};

export default Controls;