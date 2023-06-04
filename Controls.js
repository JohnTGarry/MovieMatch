import React from 'react'
import { View } from 'react-native'
import AddButton from './AddButton'
import RefreshButton from './RefreshButton'

const containerStyle = {
  backgroundColor: 'black',
  height: 70,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

const Controls = (props) => {
  const { handleAddButtonPress, handleRefreshButtonPress } = props

  return (
    <View style={containerStyle}>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AddButton onPress={handleAddButtonPress} />
      </View>
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
      >
        <RefreshButton onPress={handleRefreshButtonPress} />
      </View>
    </View>
  )
}

export default Controls
