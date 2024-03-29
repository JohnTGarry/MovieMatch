import React, { useEffect, useState } from 'react'
import { FlatList, Text, Pressable, Image, View } from 'react-native'
import { getYearFromDate } from './ArrayUtil'
import { GREY, WHITE } from './resources/colours'
import Skeleton from './Skeleton'

const SuggestedResults = (props) => {
  const { queryResponse, handlePress, previousSearches, skeletonActive } = props

  const buttonStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 2,
  }

  const imageStyle = {
    borderRadius: 5,
    width: 40,
    height: 40,
  }

  const baseImageUrl = 'https://image.tmdb.org/t/p/original'

  const filteredResults = queryResponse?.results?.filter((result) => {
    return (
      (!!result.profile_path || !!result.poster_path) &&
      !previousSearches?.includes(result.id)
    )
  })

  const skeletonArray = new Array(15).fill(0)

  return skeletonActive ? (
    <FlatList
      data={skeletonArray}
      renderItem={({ item }) => <Skeleton />}
    ></FlatList>
  ) : (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={filteredResults}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? GREY : 'transparent',
            },
            buttonStyle,
          ]}
          onPress={(e) => {
            handlePress(item)
          }}
          key={
            item?.gender
              ? `${item.name}`
              : `${item.title || item.name} (${
                  item.release_date || item.first_air_date
                })`
          }
        >
          <Image
            style={{ width: 20, height: 20 }}
            source={require('./resources/images/plus-circle.png')}
          />
          {item.profile_path || item.poster_path ? (
            <Image
              style={imageStyle}
              source={{
                uri: `${baseImageUrl}${item.profile_path || item.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={imageStyle}
              source={require('./resources/images/icons8-name-96.png')}
            />
          )}
          <View>
            <Text style={{ color: WHITE, fontSize: 14 }}>
              {item.gender ? `${item.name}` : `${item.title || item.name}`}
            </Text>
            {(item.release_date || item.first_air_date) && (
              <Text
                style={{ color: WHITE, fontSize: 12 }}
              >{`${getYearFromDate?.(
                item.release_date || item.first_air_date
              )}`}</Text>
            )}
          </View>
        </Pressable>
      )}
    />
  )
}

export default SuggestedResults
