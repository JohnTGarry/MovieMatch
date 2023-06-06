import React from 'react'
import { View } from 'react-native'
import AddButton from './AddButton'
import RefreshButton from './RefreshButton'

const containerStyle = {
  height: 70,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

const Controls = (props) => {
  const { handleAddButtonPress, handleRefreshButtonPress, isFirstSearch } =
    props

  return (
    <View style={containerStyle}>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <AddButton
          onPress={handleAddButtonPress}
          isFirstSearch={isFirstSearch}
        />
      </View>

      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
      >
        {!isFirstSearch && <RefreshButton onPress={handleRefreshButtonPress} />}
      </View>
    </View>
  )
}

export default Controls
