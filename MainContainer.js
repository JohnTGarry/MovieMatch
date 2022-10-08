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

const API_KEY = process.env.API_KEY;
const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`;
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
const searchActorUrl = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`;
const baseMovieUrl = "https://api.themoviedb.org/3/movie";
const baseActorUrl = "https://api.themoviedb.org/3/person";
// const actorImageUrl = 'https://api.themoviedb.org/3/person/500/images?api_key=5b6bf11e83f18b3b4b24822437a402ff'

const containerStyle = {
  flex: 10,
  backgroundColor: DARK_RED,
};

const MainContainer = (props) => {
  const { isActorMatch } = props;
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searching, setSearching] = useState(false);
  const [queryResponse, setQueryResponse] = useState({});
  const [movieQueryResponse, setMovieQueryResponse] = useState({});

  useEffect(() => {
    setActors([]);
    setMovies([]);
  }, [isActorMatch]);

  const handleAddButtonPress = () => {
    setSearching(true);
  };

  const onNewQuery = (query) => {
    // setSearching(false);
    // if (isActorMatch) {
    //   updateActors(query);
    // } else {
    //   updateMovies(query);
    // }
    updateQueries(query);
  };

  const handleSearchBarBlur = () => {
    // setSearching(false);
  };

  const updateActors = (newActor) => {
    fetch(`${searchActorUrl}&query=${newActor.replace(" ", "+")}`)
      .then((res) => res.json())
      .then((queryResponse) => {
        const firstActorResult = queryResponse.results[0];
        const actorId = firstActorResult.id;
        const actorImageUrl = firstActorResult.profile_path;

        fetch(`${baseActorUrl}/${actorId}/movie_credits?api_key=${apiKey}`)
          .then((result) => result.json())
          .then((creditsResponse) => {
            const creditedMovies = creditsResponse.cast;
            const moviesWithYear = [];
            creditedMovies.forEach((movie) => {
              const releaseDate = movie.release_date;
              const releaseYear = releaseDate
                ? getYearFromDate(releaseDate)
                : "";
              moviesWithYear.push(`${movie.title} (${releaseYear})`);
            });
            setActors(
              actors.concat({ key: newActor, imagePath: actorImageUrl })
            );
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
          });
      }) // eslint-disable-next-line no-alert
      .catch((error) => alert("No actor by that name"));
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

  const updateMovies = (newMovie) => {
    fetch(`${searchMovieUrl}&query=${newMovie.replace(" ", "+")}`)
      .then((res) => res.json())
      .then((queryResponse) => {
        setMovieQueryResponse(queryResponse);
      }) // eslint-disable-next-line no-alert
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSuggestionPress = (movie) => {
    const movieId = movie.id;
    const releaseYear = getYearFromDate(movie.release_date);

    fetch(`${baseMovieUrl}/${movieId}/credits?api_key=${API_KEY}`)
      .then((result) => result.json())
      .then((creditsResponse) => {
        const cast = creditsResponse.cast;
        const castImages = [];
        const castNames = [];
        cast.forEach((castMember) => {
          castNames.push(castMember.name);
          castImages.push(castMember.profile_path);
        });

        setMovies(
          movies.concat({
            key: `${movie.title} (${releaseYear})`,
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

        setSearching(false);
      });
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
          <QueriesContainer queries={isActorMatch ? actors : movies} />
          <ResultsContainer
            results={isActorMatch ? movies : actors}
            isActorMatch={isActorMatch}
          />
        </>
      )}
      <AddButton onPress={handleAddButtonPress} isActorMatch={isActorMatch} />
    </View>
  );
};

export default MainContainer;
