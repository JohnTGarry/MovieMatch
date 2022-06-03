import React from "react";
import { Pressable, Text } from "react-native";
import { RED, WHITE } from "./resources/colours";

const buttonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  width: 70,
  height: 70,
  borderRadius: 100,
  backgroundColor: RED,
  marginBottom: 5,
};

const textStyle = {
  textAlign: "center",
  color: WHITE,
  fontSize: 35,
};

const AddButton = (props) => {
  const handlePress = () => {
    props.onPress();
  };

  return (
    <Pressable style={buttonStyle} onPress={handlePress}>
      <Text style={textStyle}>+</Text>
    </Pressable>
  );
};

export default AddButton;
