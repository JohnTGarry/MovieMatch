import React from 'react'
import { Image, Text, View } from 'react-native'
import { WHITE } from './resources/colours'

const viewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
}

const imageStyle = {
  borderRadius: 5,
  width: 60,
  height: 60,
  paddingTop: 5,
  paddingBottom: 5,
}

const nameStyle = {
  color: WHITE,
}

const ActorView = (props) => {
  const { imagePath, text } = props

  const baseImageUrl = 'https://image.tmdb.org/t/p/original'

  return (
    <View style={viewStyle}>
      {imagePath ? (
        <Image
          style={imageStyle}
          source={{ uri: `${baseImageUrl}${imagePath}` }}
        />
      ) : (
        <Image style={imageStyle} source={require('./resources/images/icons8-name-96.png')} />
      )}
      <Text style={nameStyle}>{text}</Text>
    </View>
  )
}

export default ActorView
