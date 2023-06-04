import React, { useEffect, useState } from 'react'
// import { FlatList, Text } from "react-native-web";
import { FlatList, Text, Pressable, Image, View } from 'react-native'
import { getYearFromDate } from './ArrayUtil'

const SuggestedResults = (props) => {
  const { queryResponse, handlePress } = props
  const [selectedSuggestion, setSelectedSuggestion] = useState({})

  const buttonStyle = {
    background: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
  }

  const textStyle = {
    color: 'black',
    fontSize: 12,
  }

  useEffect(() => {
    if (Object.keys(selectedSuggestion).length > 0) {
      handlePress(selectedSuggestion)
    }
  }, [selectedSuggestion])

  return (
    <FlatList
      keyboardShouldPersistTaps='handled'
      data={queryResponse?.results}
      renderItem={({ item }) => (
        <Pressable
          style={buttonStyle}
          onPress={() => {
            setSelectedSuggestion(item)
          }}
          key={
            item?.gender
              ? `${item?.name}`
              : `${item?.title || item?.name} (${
                  item?.release_date || item?.first_air_date
                })`
          }
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require('./resources/images/plus-circle-black.png')}
          ></Image>
          <View>
            <Text style={textStyle}>
              {item?.gender ? `${item?.name}` : `${item?.title || item?.name}`}
            </Text>
            <Text
              style={{ color: 'black', fontSize: 10 }}
            >{`${getYearFromDate?.(
              item?.release_date || item?.first_air_date
            )}`}</Text>
          </View>
        </Pressable>
      )}
    />
  )
}

export default SuggestedResults
