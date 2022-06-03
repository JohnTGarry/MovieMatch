import React from 'react';
import { TouchableOpacity } from 'react-native';
import ActorView from './ActorView';
import MovieView from './MovieView';
import { PINK } from './resources/colours';

const buttonStyle = {
  borderRadius: 20,
  backgroundColor: PINK,
  marginTop: 5,
  marginBottom: 5,
  marginRight: 5,
  paddingLeft: 5,
  paddingRight: 5,
  height: 40,
};

const QueryPill = props => {
  const { name, imagePath } = props;

  const onPress = () => {
    // Todo: close pill
  };

  let view;

  if (imagePath) {
    view = <ActorView text={name} imagePath={imagePath} />;
  } else {
    view = <MovieView text={name} />;
  }

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {view}
    </TouchableOpacity>
  );
};

export default QueryPill;
