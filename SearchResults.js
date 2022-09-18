import React from "react";
import { FlatList, Text } from "react-native-web";

const SearchResults = (props) => {

  const { queryResponse } = props;

  return (
    <FlatList
      data={queryResponse?.results}
      renderItem={({ item }) => (
        <Text>{`${item?.title} (${item?.release_date})`}</Text>
      )}
    />
  );
};

export default SearchResults;
