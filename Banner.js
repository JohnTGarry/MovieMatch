import React from 'react'
import { View, Image } from 'react-native'

const viewStyle = {
  paddingTop: 70,
  paddingBottom: 10,
  paddingLeft: 40,
  paddingRight: 40,
  backgroundColor: 'black',
  flexDirection: 'row',
}

const mainLogoContainerStyle = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
}

const tmdbLogoContainerStyle = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
}

const mainLogoStyle = {
  width: 70,
  height: 40,
}

const tmdbLogoStyle = {
  width: 50,
  height: 20,
  paddingRight: 40,
}

const Banner = (props) => {
  return (
    <View style={viewStyle}>
      <View style={mainLogoContainerStyle}>
        <Image
          style={mainLogoStyle}
          source={require('./resources/images/Logo.png')}
        />
      </View>
      <View style={tmdbLogoContainerStyle}>
        <Image
          style={tmdbLogoStyle}
          source={require('./resources/images/tmdbLogo.png')}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

export default Banner
