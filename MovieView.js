import React from 'react'
import { View, Text } from 'react-native'
import { WHITE } from './resources/colours'

const viewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
}

const textStyle = {
  color: WHITE,
}

const baseImageUrl = 'https://image.tmdb.org/t/p/original'

const MovieView = (props) => {
  const { text, imagePath } = props

  return (
    <View style={viewStyle}>
      {imagePath ? (
        <Image
          style={imageStyle}
          source={{ uri: `${baseImageUrl}${imagePath}` }}
        />
      ) : (
        <Image
          style={imageStyle}
          source={require('./resources/images/icons8-name-96.png')}
        />
      )}
      <Text style={textStyle}>{text}</Text>
    </View>
  )
}

export default MovieView
