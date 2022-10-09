import React from "react";
import { FlatList } from "react-native";
import ResultItem from "./ResultItem";

const viewStyle = {
  // flex: 10,
};

const ResultsContainer = (props) => {
  const { results, isActor } = props;

  return (
    <FlatList
      style={viewStyle}
      data={results}
      renderItem={({ item }) => (
        <ResultItem
          name={item.key}
          imagePath={item.imagePath}
          year={item.year}
          isActor={isActor}
        />
      )}
    />
  );
};

export default ResultsContainer;
