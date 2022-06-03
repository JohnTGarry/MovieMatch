import React from 'react';
import { View, FlatList } from 'react-native';
import ResultItem from './ResultItem';

const viewStyle = {
  flex: 10,
};

const ResultsContainer = props => {
  const { results, isActorMatch } = props;

  return (
    <View style={viewStyle}>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <ResultItem
            name={item.key}
            imagePath={item.imagePath}
            year={item.year}
            isActorMatch={isActorMatch}
          />
        )}
      />
    </View>
  );
};

export default ResultsContainer;
