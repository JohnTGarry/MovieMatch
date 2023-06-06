import React from 'react'
import { View, Pressable, Text, Image } from 'react-native'
import { LIGHT_GREY, RED, WHITE } from './resources/colours'

const buttonStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  flexDirection: 'row',
  gap: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  height: 55,
}

const AddButton = (props) => {
  const { isFirstSearch, onPress } = props

  const handlePress = () => {
    onPress()
  }

  const text = isFirstSearch ? 'Search Movie/Actor' : 'Match Movie/Actor'

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          { background: pressed ? LIGHT_GREY : RED },
          buttonStyle,
        ]}
        onPress={handlePress}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require('./resources/images/search-white.png')}
        />
        <Text style={{ color: WHITE, fontSize: 16, fontWeight: 'bold' }}>
          {text}
        </Text>
      </Pressable>
    </View>
  )
}

export default AddButton
