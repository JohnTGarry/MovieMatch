import React, { useState, useEffect, useRef } from 'react'
import { Image, Pressable, TextInput, View } from 'react-native'
import { debounce } from './ApiUtils'

const SearchBar = (props) => {
  const containerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgb(200, 200, 200)',
    borderRadius: 100,
    paddingLeft: 2,
  }

  const [value, setValue] = useState('')
  const { onSubmit, onBlur } = props

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
          style={{ width: 20, height: 20 }}
          source={require('./resources/images/search.png')}
        ></Image>
      </View>
      <View style={{ flex: 10 }}>
        <TextInput
          onChangeText={(text) => {
            setValue(text)
          }}
          onFocus={() => setValue('')}
          value={value}
          style={{ color: 'black' }}
          autoFocus
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
        <Pressable style={{paddingLeft: 3, paddingRight: 3}} onPress={() => setValue('')}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('./resources/images/circle-x.png')}
          ></Image>
        </Pressable>
      </View>
    </View>
  )
}

export default SearchBar
