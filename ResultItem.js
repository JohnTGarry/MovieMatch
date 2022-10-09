import React from 'react';
import { TouchableOpacity } from 'react-native';
import ActorView from './ActorView';
import MovieView from './MovieView';
import { VERY_DARK_RED } from './resources/colours';

const buttonStyle = {
  marginBottom: 1,
  paddingLeft: 10,
  paddingBottom: 10,
  flexDirection: 'row',
  backgroundColor: VERY_DARK_RED,
  boxShadow: '5px 5px 5px black',
};

const ResultItem = props => {
  const { name, imagePath, isActor } = props;

  const onPress = () => {
    // Todo: open description
  };

  let view;

  if (isActor) {
    view = <MovieView text={name} />;
  } else {
    view = <ActorView text={name} imagePath={imagePath} />;
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {view}
    </TouchableOpacity>
  );
};

export default ResultItem;
