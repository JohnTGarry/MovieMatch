import React from 'react'
import { Pressable } from 'react-native'
import ActorView from './ActorView'
import MovieView from './MovieView'

const buttonStyle = {
  flexDirection: 'row',
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 20,
}

const ResultItem = (props) => {
  const { name, imagePath, isActor } = props

  const onPress = () => {
    // Todo: search movies they're in
  }

  let view

  if (isActor) {
    view = <MovieView text={name} imagePath={imagePath} />
  } else {
    view = <ActorView text={name} imagePath={imagePath} />
  }

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      {view}
    </Pressable>
  )
}

export default ResultItem
