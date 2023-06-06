import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import QueriesContainer from './QueriesContainer'
import ResultsContainer from './ResultsContainer'
import Controls from './Controls'
import SearchBar from './SearchBar'
import { WHITE } from './resources/colours'
import {
  getYearFromDate,
  getCommonElements,
  objectArrayToArrayOfValues,
  arrayToArrayOfActorObjects,
  arrayToArrayOfMovieObjects,
  getCommonElementsAsObjects,
} from './ArrayUtil'
import SuggestedResults from './SuggestedResults'

const API_KEY = process.env.IMDB_API_KEY
const searchMultiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`
const searchActorUrl = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`
const baseMovieUrl = 'https://api.themoviedb.org/3/movie'
const baseActorUrl = 'https://api.themoviedb.org/3/person'
const actorImageUrl =
  'https://api.themoviedb.org/3/person/500/images?api_key=5b6bf11e83f18b3b4b24822437a402ff'

const containerStyle = {
  flex: 10,
  backgroundColor: WHITE,
}

const tipStyle = {
  paddingTop: 20,
  paddingLeft: 40,
  paddingRight: 40,
}

const MatchTypes = {
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

  useEffect(() => {
    setActors([])
    setMovies([])
  }, [matchType])

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
  }

  const onNewQuery = (query) => {
    updateQueries(query)
  }

  const updateQueries = (newQuery) => {
    let searchUrl = searchMultiUrl
    if (matchType === MatchTypes.Actor) searchUrl = searchActorUrl
    else if (matchType === MatchTypes.Movie) searchUrl = searchMovieUrl

    fetch(`${searchUrl}&query=${newQuery.replace(' ', '+')}`)
      .then((res) => res.json())
      .then((queryResponse) => {
        setQueryResponse(queryResponse)
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

    setMatchType(isMovie ? MatchTypes.Movie : MatchTypes.Actor)

    const suggestionId = suggestion.id
    const releaseYear = isMovie ? getYearFromDate(suggestion.release_date) : ''
    const baseUrl = isMovie ? baseMovieUrl : baseActorUrl
    const creditsRoute = isMovie ? 'credits' : 'movie_credits'
    // const profilePath = suggestion?.profile_path || "";

    fetch(`${baseUrl}/${suggestionId}/${creditsRoute}?api_key=${API_KEY}`)
      .then((result) => result.json())
      .then((creditsResponse) => {
        if (isMovie) {
          updateMatchingActors(suggestion, releaseYear, creditsResponse)
        } else {
          updateMatchingMovies(suggestion, actorImageUrl, creditsResponse)
        }
        setSearching(false)
      })
  }

  const updateMatchingMovies = (newActor, actorImageUrl, creditsResponse) => {
    const creditedMovies = creditsResponse.cast
    const moviesWithYear = []
    creditedMovies?.forEach((movie) => {
      const releaseDate = movie.release_date
      const releaseYear = releaseDate ? getYearFromDate(releaseDate) : ''
      moviesWithYear.push(`${movie.title} (${releaseYear})`)
    })
    setActors(actors.concat({ key: newActor, imagePath: actorImageUrl }))
    setMovies(
      Object.keys(movies).length > 0
        ? arrayToArrayOfMovieObjects(
            getCommonElements(
              objectArrayToArrayOfValues(movies),
              moviesWithYear
            )
          )
        : arrayToArrayOfMovieObjects(moviesWithYear)
    )
  }

  const updateMatchingActors = (newMovie, releaseYear, creditsResponse) => {
    const cast = creditsResponse.cast
    const castImages = []
    const castNames = []
    cast?.forEach((castMember) => {
      castNames.push(castMember.name)
      castImages.push(castMember.profile_path)
    })

    setMovies(
      movies.concat({
        key: `${newMovie.title} (${releaseYear})`,
      })
    )

    setActors(
      Object.keys(actors).length > 0
        ? getCommonElementsAsObjects(
            actors,
            arrayToArrayOfActorObjects(castNames, castImages)
          )
        : arrayToArrayOfActorObjects(castNames, castImages)
    )
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
          }}
        >
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Text>
      </View>
      {searching && (
        <View style={{ marginLeft: 28, marginRight: 28, gap: 10 }}>
          <SearchBar onSubmit={onNewQuery} />
          <SuggestedResults
            queryResponse={queryResponse}
            handlePress={handleSuggestionPress}
          />
        </View>
      )}
      {!searching && (
        <>
          <QueriesContainer
            queries={matchType === MatchTypes.Actor ? actors : movies}
          />
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
