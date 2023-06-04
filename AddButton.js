import React from 'react'
import { View, Pressable, Image } from 'react-native'

const buttonStyle = {
  backgroundColor: 'black',
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
}

const imageStyle = {
  width: 40,
  height: 40,
}

const AddButton = (props) => {
  const handlePress = () => {
    props.onPress()
  }

  return (
    <View>
      <Pressable style={buttonStyle} onPress={handlePress}>
        <Image
          style={imageStyle}
          source={require('./resources/images/plus-circle.png')}
        />
      </Pressable>
    </View>
  )
}

export default AddButton
