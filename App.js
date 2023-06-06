import React from 'react'
import Banner from './Banner'
import MainContainer from './MainContainer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WHITE } from './resources/colours'
import { StatusBar } from 'react-native'

const bodyStyle = {
  flexDirection: 'column',
  flex: 1,
}

const App = () => {
  return (
    <SafeAreaView style={bodyStyle}>
      <StatusBar barStyle="light-content" style={{ backgroundColor: 'black' }} />
      <Banner />
      <MainContainer />
    </SafeAreaView>
  )
}

export default App
