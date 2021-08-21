import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListLayout from './layouts/ListLayout';
import { searchImdb } from './utils/ApiUtils';

export default function App() {
  // searchImdb('lost 2004');

  return (
    <View style={styles.container}>
      <ListLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
