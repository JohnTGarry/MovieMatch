import React from "react";
import { FlatList, Text } from "react-native-web";

const SearchResults = (props) => {

  const { queryResponse } = props;

  const textStyle = {
    color: 'white',
  }

  return (
    <FlatList
      data={queryResponse?.results}
      renderItem={({ item }) => (
        <Text style={textStyle}>{`${item?.title} (${item?.release_date})`}</Text>
      )}
    />
  );
};

export default SearchResults;
