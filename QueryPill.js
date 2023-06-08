import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { LIGHT_GREY, RED, WHITE } from './resources/colours'

const pillStyle = {
  borderRadius: 5,
  marginTop: 5,
  marginBottom: 10,
  marginRight: 5,
  marginLeft: 5,
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 5,
  paddingRight: 5,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
}

const textContainerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
}

const QueryPill = (props) => {
  const { name, id, handleQueryPress } = props
  let mainText = name?.name || name || '?'
  let year
  if (mainText?.includes('(')) {
    ;[mainText, year] = mainText.split('(')
    year = year?.split(')')[0]
  }

  return (
    <Pressable
      onPress={(e) => handleQueryPress(id)}
      style={({ pressed }) => [
        { backgroundColor: pressed ? LIGHT_GREY : RED },
        pillStyle,
      ]}
    >
      <View style={textContainerStyle}>
        <Text style={{ color: WHITE, fontSize: 14, fontWeight: 'bold' }}>
          {mainText}
        </Text>
        {!!year && (
          <Text style={{ color: LIGHT_GREY, fontSize: 12 }}>{year}</Text>
        )}
      </View>
      <Image
        style={{ height: 16, width: 16 }}
        source={require('./resources/images/x-white.png')}
      />
    </Pressable>
  )
}

export default QueryPill
