import React from 'react';
import { View, FlatList } from 'react-native';
import QueryPill from './QueryPill';

const containerStyle = {
  flex: 1,
};

const QueryContainer = props => {
  const { queries } = props;

  return (
    <View style={containerStyle}>
      <FlatList
        horizontal
        data={queries}
        renderItem={({ item }) => (
          <QueryPill name={item.key} imagePath={item.imagePath} />
        )}
      />
    </View>
  );
};

export default QueryContainer;
