import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListLayout from './layouts/ListLayout';
import { searchImdb } from './utils/ApiUtils';
import SearchBar from './widgets/SearchBar';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>MovieMatch</Text>
      <SearchBar /> */}
      <ListLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    color: 'white',
    backgroundColor: 'blue',
    textAlign: 'center',
  },
  searchBar: {
    flex: 10,
  },
});
