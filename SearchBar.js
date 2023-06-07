import React, { useState, useEffect, useRef } from 'react'
import { Image, Pressable, TextInput, View } from 'react-native'
import { debounce } from './ApiUtils'
import { DARK_GREY, LIGHT_GREY, WHITE } from './resources/colours'
import { MatchTypes } from './MainContainer'

const SearchBar = (props) => {
  const containerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: DARK_GREY,
    borderRadius: 100,
    paddingTop: 0,
    paddingRight: 2,
    paddingLeft: 2,
  }

  const [value, setValue] = useState('')
  const { onSubmit, startedTyping, inputEmpty, clearButtonPressed, matchType } =
    props

  const onSubmitDebounce = useRef(
    debounce((query) => (query ? onSubmit(query) : {}))
  )

  const getPlaceholder = () => {
    switch (matchType) {
      case MatchTypes.Actor:
        return 'Actor Name'
      case MatchTypes.Movie:
        return 'Movie Title'
      default:
        return 'Actor Name or Movie Title'
    }
  }

  useEffect(() => {
    onSubmitDebounce.current(value)
    !!value && startedTyping()
    !value && inputEmpty()
  }, [value])

  return (
    <View style={containerStyle}>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require('./resources/images/search-white.png')}
        ></Image>
      </View>
      <View style={{ flex: 10 }}>
        <TextInput
          onChangeText={(text) => {
            setValue(text)
          }}
          onFocus={() => setValue('')}
          value={value}
          placeholder={getPlaceholder()}
          placeholderTextColor={LIGHT_GREY}
          style={{ color: WHITE }}
          autoFocus
        />
      </View>
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
      >
        <Pressable
          style={{
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 3,
            paddingRight: 1,
          }}
          onPress={() => {
            setValue('')
            clearButtonPressed()
          }}
        >
          <Image
            style={{ width: 28, height: 28 }}
            source={require('./resources/images/circle-x-white.png')}
          ></Image>
        </Pressable>
      </View>
    </View>
  )
}

export default SearchBar
