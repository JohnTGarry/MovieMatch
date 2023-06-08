import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import QueriesContainer from './QueriesContainer'
import ResultsContainer from './ResultsContainer'
import Controls from './Controls'
import SearchBar from './SearchBar'
import { GREY, VERY_DARK_GREY } from './resources/colours'
import { getYearFromDate, getCommonElementsAsObjects } from './ArrayUtil'
import SuggestedResults from './SuggestedResults'
import Constants from 'expo-constants'

const API_KEY =
  process.env.IMDB_API_KEY || Constants.expoConfig.extra.IMDB_API_KEY
const searchMultiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
const searchActorUrl = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`
const baseMovieUrl = 'https://api.themoviedb.org/3/movie'
const baseActorUrl = 'https://api.themoviedb.org/3/person'

const containerStyle = {
  flex: 10,
  backgroundColor: VERY_DARK_GREY,
}

export const MatchTypes = {
  Actor: 'actor',
  Movie: 'movie',
  Unset: '',
}

const MainContainer = () => {
  const [actors, setActors] = useState([])
  const [movies, setMovies] = useState([])
  const [matchType, setMatchType] = useState(MatchTypes.Unset)
  const [searching, setSearching] = useState(false)
  const [queryResponse, setQueryResponse] = useState({})
  const [skeletonActive, setSkeletonActive] = useState(false)
  const [newQuery, setNewQuery] = useState('')
  const [triggerQuery, setTriggerQuery] = useState(false)

  useEffect(() => {
    newQuery && updateQueries(newQuery)
  }, [triggerQuery])

  const handleAddButtonPress = () => {
    setSearching(true)
  }

  const handleRefreshButtonPress = () => {
    clearAllState()
  }

  const clearAllState = () => {
    setActors([])
    setMovies([])
    setMatchType(MatchTypes.Unset)
    setSearching(false)
    setQueryResponse({})
    setSkeletonActive(false)
    setNewQuery('')
  }

  const beginSkeleton = () => {
    setSkeletonActive(true)
  }

  const stopSkeleton = () => {
    setSkeletonActive(false)
  }

  const clearButtonPressed = () => {
    setSearching(false)
  }

  const onNewQuery = (query) => {
    setNewQuery(query)
    setTriggerQuery((triggerQuery) => !triggerQuery)
  }

  const updateQueries = (newQuery) => {
    let searchUrl = searchMultiUrl
    if (matchType === MatchTypes.Actor) searchUrl = searchActorUrl
    else if (matchType === MatchTypes.Movie) searchUrl = searchMovieUrl

    fetch(`${searchUrl}&query=${newQuery.replace(' ', '+')}`)
      .then((res) => res.json())
      .then((queryResponse) => {
        setQueryResponse(queryResponse)
        setSkeletonActive(false)
      }) // eslint-disable-next-line no-alert
      .catch((error) => {
        console.error(error)
      })
  }

  const handleSuggestionPress = (suggestion) => {
    const isMovie =
      !suggestion?.media_type === 'person' ||
      !suggestion?.gender ||
      !suggestion?.name

    if (isMovie) {
      const currentMovies = movies.concat({
        key: `${suggestion?.title} (${
          suggestion?.release_date
            ? getYearFromDate(suggestion?.release_date)
            : ''
        })`,
        imagePath: `${suggestion?.poster_path}`,
        id: suggestion?.id,
      })
      setMatchType(MatchTypes.Movie)
      setMovies(currentMovies)
      updateMatching(currentMovies, false)
    } else {
      const currentActors = actors.concat({
        key: suggestion?.name,
        imagePath: suggestion?.profile_path,
        id: suggestion?.id,
      })
      setMatchType(MatchTypes.Actor)
      setActors(currentActors)
      updateMatching(currentActors, true)
    }
    setQueryResponse({})
    setSearching(false)
  }

  const removeQueryPill = (id) => {
    let queries = matchType === MatchTypes.Actor ? actors : movies
    if (queries?.length > 0) {
      queries = queries?.filter((item) => {
        return item.id !== id
      })
    }
    if (matchType === MatchTypes.Actor) {
      setActors(queries)
      updateMatching(queries, true)
    } else {
      setMovies(queries)
      updateMatching(queries, false)
    }
    if (queries?.length === 0) {
      clearAllState()
      setSearching(true)
    }
  }

  // If entering 2 actors and want to match their movies: matchers = actors, matchings = movies
  const updateMatching = (currentMatchers, matchingMovies) => {
    let matching = []
    const promises = []
    const matcherMatchingMap = []
    const baseMatcherUrl = matchingMovies ? baseActorUrl : baseMovieUrl
    const creditsRoute = matchingMovies ? 'movie_credits' : 'credits'

    currentMatchers.forEach((matcher) => {
      promises.push(
        fetch(
          `${baseMatcherUrl}/${matcher.id}/${creditsRoute}?api_key=${API_KEY}`
        )
          .then((result) => result.json())
          .then((creditsResponse) => {
            const currentMatchings = []
            creditsResponse?.cast?.forEach((matching) => {
              const releaseDate = matching?.release_date
              const releaseYear = releaseDate
                ? getYearFromDate(releaseDate)
                : ''
              let key = matching.title || matching.name
              key = releaseYear ? `${key} (${releaseYear})` : key

              currentMatchings.push({
                key: key,
                imagePath: matching.poster_path || matching.profile_path,
                id: matching.id,
              })
            })
            matcherMatchingMap.push({ matcher, currentMatchings })
          })
      )
    })

    Promise.all(promises).then(() => {
      matcherMatchingMap.forEach((matcher) => {
        const currentMatchings = matcher.currentMatchings
        matching =
          matching.length > 0
            ? getCommonElementsAsObjects(matching, currentMatchings)
            : currentMatchings
      })
      matchingMovies ? setMovies(matching) : setActors(matching)
    })
  }

  return (
    <View style={containerStyle}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 3 }}></View>
        <Text
          style={{
            flex: 2,
            fontFamily: 'sans-serif-thin',
            fontSize: 10,
            color: GREY,
          }}
        >
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Text>
      </View>
      <QueriesContainer
        queries={matchType === MatchTypes.Actor ? actors : movies}
        handleQueryPress={removeQueryPill}
      />

      {searching && (
        <View style={{ marginLeft: 28, marginRight: 28, gap: 10 }}>
          <SearchBar
            onSubmit={onNewQuery}
            startedTyping={beginSkeleton}
            inputEmpty={stopSkeleton}
            clearButtonPressed={clearButtonPressed}
            matchType={matchType}
          />
          <SuggestedResults
            queryResponse={queryResponse}
            handlePress={handleSuggestionPress}
            previousSearches={
              matchType === MatchTypes.Actor
                ? actors?.map((a) => a.id)
                : matchType === MatchTypes.Movie
                ? movies?.map((m) => m.id)
                : []
            }
            skeletonActive={skeletonActive}
          />
        </View>
      )}
      {!searching && (
        <>
          <ResultsContainer
            results={matchType === MatchTypes.Actor ? movies : actors}
            matchType={matchType === MatchTypes.Actor}
          />
          <Controls
            handleAddButtonPress={handleAddButtonPress}
            handleRefreshButtonPress={handleRefreshButtonPress}
            isFirstSearch={matchType === MatchTypes.Unset}
          />
        </>
      )}
    </View>
  )
}

export default MainContainer
