import React from 'react';
import { View, Text, Switch, Image } from 'react-native';
import { WHITE, RED } from './resources/colours';

const viewStyle = {
  paddingTop: 60,
  paddingLeft: 40,
  backgroundColor: 'black',
  flexDirection: 'row',
};

const mainLogoStyle = {
  width: 70,
  height: 40,
};

const switchStyle = {
  flex: 1,
};

const Banner = props => {
  const { isActorMatch, onActorMatchChange } = props;

  const onValueChange = isOn => {
    onActorMatchChange(isOn);
  };

  return (
    <View style={viewStyle}>
      <Image style={mainLogoStyle} source={require('./resources/images/Logo.png')} />
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
