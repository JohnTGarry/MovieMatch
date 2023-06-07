import React from 'react'
import Banner from './Banner'
import MainContainer from './MainContainer'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const bodyStyle = {
  backgroundColor: '#000000',
  flexDirection: 'column',
  flex: 1,
}

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={bodyStyle}>
        <StatusBar style="light" />
        <Banner />
        <MainContainer />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App
