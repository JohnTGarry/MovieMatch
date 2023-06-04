import React from 'react';
import { TouchableOpacity } from 'react-native';
import ActorView from './ActorView';
import MovieView from './MovieView';
import { VERY_DARK_RED } from './resources/colours';

const buttonStyle = {
  flexDirection: 'row',
  backgroundColor: 'grey',
  borderColor: 'black',
  borderBottomWidth: 1,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 20,
};

const ResultItem = props => {
  const { name, imagePath, isActor } = props;

  const onPress = () => {
    // Todo: search movies they're in
  };

  let view;

  if (isActor) {
    view = <MovieView text={name} imagePath={imagePath}/>;
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
