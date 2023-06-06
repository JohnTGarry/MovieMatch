import React from 'react'
import { View, Pressable, Image } from 'react-native'
import { LIGHT_GREY } from './resources/colours'

const buttonStyle = {
  paddingTop: 12,
  paddingBottom: 10,
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
          { backgroundColor: pressed ? LIGHT_GREY : 'transparent' },
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
