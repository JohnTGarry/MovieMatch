import React, { useState, useEffect, useRef } from 'react'
import { Image, Pressable, TextInput, View } from 'react-native'
import { debounce } from './ApiUtils'
import { DARK_GREY, WHITE } from './resources/colours'

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
  const { onSubmit } = props

  const onSubmitDebounce = useRef(
    debounce((query) => (query ? onSubmit(query) : {}))
  )

  useEffect(() => {
    onSubmitDebounce.current(value)
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
          style={{ color: WHITE }}
          autoFocus
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
        <Pressable style={{paddingLeft: 3, paddingRight: 1}} onPress={() => setValue('')}>
          <Image
            style={{ width: 25, height: 25 }}
            source={require('./resources/images/circle-x-white.png')}
          ></Image>
        </Pressable>
      </View>
    </View>
  )
}

export default SearchBar
