import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
import { RED, WHITE } from './resources/colours';

const buttonStyle = {
  borderRadius: 10,
  backgroundColor: RED,
  color: WHITE,
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
  textAlign: 'center',
};

const AddButton = props => {
  const { isActorMatch } = props;

  const onSubmit = event => {
    props.onSubmit(event.nativeEvent.text);
  };

  const getInitialValue = () => {
    return isActorMatch ? 'ADD NEW ACTOR' : 'ADD NEW MOVIE';
  };

  const [value, setValue] = React.useState(getInitialValue());

  useEffect(() => {
    setValue(isActorMatch ? 'ADD NEW ACTOR' : 'ADD NEW MOVIE');
  }, [isActorMatch]);

  return (
    <TextInput
      style={buttonStyle}
      onChangeText={text => setValue(text)}
      onSubmitEditing={event => onSubmit(event)}
      onFocus={() => setValue('')}
      onBlur={() => setValue(getInitialValue())}
      value={value}
    />
  );
};

export default AddButton;
