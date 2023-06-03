import React, { useState, useEffect } from "react";
import { View } from "react-native";
import QueriesContainer from "./QueriesContainer";
import ResultsContainer from "./ResultsContainer";
import AddButton from "./AddButton";
import SearchBar from "./SearchBar";
import { DARK_RED } from "./resources/colours";
import {
  getYearFromDate,
  getCommonElements,
  objectArrayToArrayOfValues,
  arrayToArrayOfActorObjects,
  arrayToArrayOfMovieObjects,
  getCommonElementsAsObjects,
} from "./ArrayUtil";
import SuggestedResults from "./SuggestedResults";

const API_KEY = process.env.IMDB_API_KEY;
const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`;
const baseMovieUrl = "https://api.themoviedb.org/3/movie";
const baseActorUrl = "https://api.themoviedb.org/3/person";
const actorImageUrl = 'https://api.themoviedb.org/3/person/500/images?api_key=5b6bf11e83f18b3b4b24822437a402ff'

const containerStyle = {
  flex: 10,
  backgroundColor: DARK_RED,
};

const MainContainer = () => {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isActor, setIsActor] = useState(false);
  const [searching, setSearching] = useState(false);
  const [queryResponse, setQueryResponse] = useState({});

  useEffect(() => {
    setActors([]);
    setMovies([]);
  }, [isActor]);

  const handleAddButtonPress = () => {
    setSearching(true);
  };

  const onNewQuery = (query) => {
    // setSearching(false);
    updateQueries(query);
  };

  const handleSearchBarBlur = () => {
    // setSearching(false);
  };

  const updateQueries = (newQuery) => {
    fetch(`${searchUrl}&query=${newQuery.replace(" ", "+")}`)
      .then((res) => res.json())
      .then((queryResponse) => {
        setQueryResponse(queryResponse);
      }) // eslint-disable-next-line no-alert
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSuggestionPress = (suggestion) => {
    const isMediaTypePerson = suggestion?.media_type === "person";
    setIsActor(isMediaTypePerson);

    const suggestionId = suggestion.id;
    const releaseYear = isMediaTypePerson
      ? ""
      : getYearFromDate(suggestion.release_date);
    const baseUrl = isMediaTypePerson ? baseActorUrl : baseMovieUrl;
    const creditsRoute = isMediaTypePerson ? "movie_credits" : "credits";
    // const profilePath = suggestion?.profile_path || "";

    fetch(`${baseUrl}/${suggestionId}/${creditsRoute}?api_key=${API_KEY}`)
      .then((result) => result.json())
      .then((creditsResponse) => {
        if (isMediaTypePerson) {
          updateMatchingMovies(suggestion, actorImageUrl, creditsResponse);
        } else {
          updateMatchingActors(suggestion, releaseYear, creditsResponse);
        }
        setSearching(false);
      });
  };

  const updateMatchingMovies = (newActor, actorImageUrl, creditsResponse) => {
    const creditedMovies = creditsResponse.cast;
    const moviesWithYear = [];
    creditedMovies.forEach((movie) => {
      const releaseDate = movie.release_date;
      const releaseYear = releaseDate ? getYearFromDate(releaseDate) : "";
      moviesWithYear.push(`${movie.title} (${releaseYear})`);
    });
    setActors(actors.concat({ key: newActor, imagePath: actorImageUrl }));
    setMovies(
      Object.keys(movies).length > 0
        ? arrayToArrayOfMovieObjects(
            getCommonElements(
              objectArrayToArrayOfValues(movies),
              moviesWithYear
            )
          )
        : arrayToArrayOfMovieObjects(moviesWithYear)
    );
  };

  const updateMatchingActors = (newMovie, releaseYear, creditsResponse) => {
    const cast = creditsResponse.cast;
    const castImages = [];
    const castNames = [];
    cast.forEach((castMember) => {
      castNames.push(castMember.name);
      castImages.push(castMember.profile_path);
    });

    setMovies(
      movies.concat({
        key: `${newMovie.title} (${releaseYear})`,
      })
    );

    setActors(
      Object.keys(actors).length > 0
        ? getCommonElementsAsObjects(
            actors,
            arrayToArrayOfActorObjects(castNames, castImages)
          )
        : arrayToArrayOfActorObjects(castNames, castImages)
    );
  };

  return (
    <View style={containerStyle}>
      {searching && (
        <>
          <SearchBar onSubmit={onNewQuery} onBlur={handleSearchBarBlur} />
          <SuggestedResults
            queryResponse={queryResponse}
            handlePress={handleSuggestionPress}
          />
        </>
      )}
      {!searching && (
        <>
          <QueriesContainer queries={isActor ? actors : movies} />
          <ResultsContainer
            results={isActor ? movies : actors}
            isActor={isActor}
          />
        </>
      )}
      <AddButton onPress={handleAddButtonPress} />
    </View>
  );
};

export default MainContainer;
