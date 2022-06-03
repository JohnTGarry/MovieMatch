import React from 'react';
import { View, Text } from 'react-native';
import { WHITE } from './resources/colours';

const viewStyle = {
  flexDirection: 'row',
};

const textStyle = {
  color: WHITE,
  paddingLeft: 5,
  marginTop: 7,
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
