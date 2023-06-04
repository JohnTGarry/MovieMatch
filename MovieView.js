import React from 'react';
import { View, Text } from 'react-native';
import { WHITE } from './resources/colours';

const viewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyle = {
  color: WHITE,
};

const MovieView = props => {
  const { text } = props;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

export default MovieView;
