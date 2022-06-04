import React from "react";
import { TextInput } from "react-native";

const SearchBar = (props) => {
  const onSubmit = (event) => {
    props.onSubmit(event.nativeEvent.text);
  };

  const [value, setValue] = React.useState("");

  return (
    <TextInput
      onChangeText={(text) => setValue(text)}
      onSubmitEditing={(event) => onSubmit(event)}
      onFocus={() => setValue("")}
      onBlur={props.onBlur()}
      value={value}
      style={{ backgroundColor: "blue" }}
      autoFocus
    />
  );
};

export default SearchBar;
