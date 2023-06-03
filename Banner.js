import React from 'react';
import { View, Text, Switch } from 'react-native';
import { WHITE, RED } from './resources/colours';

const viewStyle = {
  backgroundColor: RED,
  flexDirection: 'row',
};

const textStyle = {
  color: `${WHITE}`,
  textAlign: 'center',
  margin: 0,
  fontSize: 40,
  fontWeight: 'bold',
  flex: 5,
};

const switchStyle = {
  flex: 1,
};

const Banner = props => {
  const { isActorMatch, onActorMatchChange } = props;

  const onValueChange = isOn => {
    onActorMatchChange(isOn);
  };

  const getAppName = () => {
    return isActorMatch ? 'ActorMatch' : 'MovieMatch';
  };

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{getAppName()}</Text>
      <Switch
        style={switchStyle}
        disabled={false}
        value={isActorMatch}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default Banner;
