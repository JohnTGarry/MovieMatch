import React from 'react'
import { View, FlatList } from 'react-native'
import QueryPill from './QueryPill'

const QueryContainer = (props) => {
  const { queries, handleQueryPress } = props

  return (
    <View>
      <FlatList
        horizontal
        data={queries}
        renderItem={({ item }) => (
          <QueryPill
            name={item.key}
            id={item.id}
            handleQueryPress={handleQueryPress}
          />
        )}
      />
    </View>
  )
}

export default QueryContainer
