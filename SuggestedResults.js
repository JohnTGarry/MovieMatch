import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native-web";
import { Pressable } from "react-native";

const SuggestedResults = (props) => {
  const { queryResponse, handlePress } = props;
  const [selectedSuggestion, setSelectedSuggestion] = useState({});

  const textStyle = {
    color: "white",
  };

  const buttonStyle = {
    background: "transparent",
    border: "1px solid white",
  };

  useEffect(() => {
    if (Object.keys(selectedSuggestion).length > 0) {
      handlePress(selectedSuggestion);
    }
  }, [selectedSuggestion]);

  return (
    <FlatList
      data={queryResponse?.results}
      renderItem={({ item }) => (
        <Pressable
          style={buttonStyle}
          onPress={() => {setSelectedSuggestion(item)}}
          key={`${item?.title} (${item?.release_date})`}
        >
          <Text
            style={textStyle}
          >{`${item?.title} (${item?.release_date})`}</Text>
        </Pressable>
      )}
    />
  );
};

export default SuggestedResults;
