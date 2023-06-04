import React, { useState, useEffect, useRef } from "react";
import { Image, TextInput, View } from "react-native";
import { debounce } from './ApiUtils';

const SearchBar = (props) => {

  const containerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgb(200, 200, 200)',
    borderRadius: 100,
    paddingLeft: 2,
  };

  const [value, setValue] = useState("");
  const {onSubmit, onBlur} = props;

  const onSubmitDebounce = useRef(debounce(query => query ? onSubmit(query) : {}));
  
  useEffect(() => {
    onSubmitDebounce.current(value);
  }, [value]);

  return (
    <View style={containerStyle}>
      <Image style={{width: 20, height: 20}} source={require('./resources/images/search.png')}></Image>
      <TextInput
        onChangeText={(text) => {
          setValue(text);
        }}
        onFocus={() => setValue("")}
        onBlur={onBlur()}
        value={value}
        style={{ color: 'black',}}
        autoFocus
      />
    </View>
  );
};

export default SearchBar;
