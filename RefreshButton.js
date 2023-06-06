import React from 'react'
import { View, Pressable, Image } from 'react-native'
import { LIGHT_GREY } from './resources/colours'

const buttonStyle = {
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  borderRadius: 5,
  height: 55,
}

const imageStyle = {
  width: 30,
  height: 30,
}

const RefreshButton = (props) => {
  const handlePress = () => {
    props.onPress()
  }

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          { background: pressed ? LIGHT_GREY : 'black' },
          buttonStyle,
        ]}
        onPress={handlePress}
      >
        <Image
          style={imageStyle}
          source={require('./resources/images/erase.png')}
        />
      </Pressable>
    </View>
  )
}

export default RefreshButton
