import React, { useEffect } from 'react'
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { DARK_GREY, LIGHT_GREY } from './resources/colours'

const skeletonStyle = {
  height: 40,
  marginTop: 20,
  marginBottom: 20,
  backgroundColor: DARK_GREY,
}

const { width } = Dimensions.get('window')

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)

const Skeleton = () => {
  const animatedValue = new Animated.Value(0)

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      })
    ).start()
  })

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  })

  return (
    <View style={skeletonStyle}>
      <AnimatedLG
        colors={[LIGHT_GREY, DARK_GREY, DARK_GREY, LIGHT_GREY]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateX: translateX }],
        }}
      />
    </View>
  )
}

export default Skeleton
