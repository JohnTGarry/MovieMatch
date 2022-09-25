import React, { useState, useEffect, useRef } from "react";
import { TextInput } from "react-native";
import { debounce } from './ApiUtils';

const SearchBar = (props) => {

  const [value, setValue] = useState("");
  const {onSubmit, onBlur} = props;

  const onSubmitDebounce = useRef(debounce(query => query ? onSubmit(query) : {}));
  
  useEffect(() => {
    onSubmitDebounce.current(value);
  }, [value]);

  return (
    <TextInput
      onChangeText={(text) => {
        setValue(text);
      }}
      onFocus={() => setValue("")}
      onBlur={onBlur()}
      value={value}
      style={{ color: "white" }}
      autoFocus
    />
  );
};

export default SearchBar;
