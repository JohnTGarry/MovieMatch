import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import ResultsContainer from './ResultsContainer';
import { WHITE, DARK, BROWN, RED } from './resources/colours';
import {
  getCommonElements,
  arrayToArrayOfObjects,
  objectArrayToArrayOfValues,
  getYearFromDate,
} from './ArrayUtil';

const API_KEY = process.env.API_KEY;
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
const searchActorUrl = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`;
const baseMovieUrl = 'https://api.themoviedb.org/3/movie';
const baseActorUrl = 'https://api.themoviedb.org/3/person';

const fullContainer = {
  flex: 1,
  flexDirection: 'column',
};

const sideBySideContainerStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  flex: 6,
};

const sidePanelStyle = {
  flexDirection: 'column',
  flex: 1,
  backgroundColor: DARK,
};

const rightPanelStyle = {
  borderLeftColor: WHITE,
  borderLeftWidth: 1,
};

const headerStyle = {
  flex: 1,
  backgroundColor: BROWN,
  color: WHITE,
  textAlign: 'center',
  textAlignVertical: 'center',
};

const textInputStyle = {
  flex: 2,
  textAlign: 'center',
  textAlignVertical: 'center',
  backgroundColor: BROWN,
  color: WHITE,
};

export default class SideBySideContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      movies: [],
      addNewActor: 'ADD NEW ACTOR',
      addNewMovie: 'ADD NEW MOVIE',
      isMovieLastChanged: false,
    };
  }

  updateActors = newActor => {
    if (this.state.isMovieLastChanged) {
      this.refresh();
    }

    fetch(`${searchActorUrl}&query=${newActor.replace(' ', '+')}`)
      .then(res => res.json())
      .then(queryResponse => {
        const actorId = queryResponse.results[0].id;

        fetch(`${baseActorUrl}/${actorId}/movie_credits?api_key=${API_KEY}`)
          .then(result => result.json())
          .then(creditsResponse => {
            const creditedMovies = creditsResponse.cast;
            const movieTitles = [];
            creditedMovies.forEach(movie => {
              const releaseYear = getYearFromDate(movie.release_date);
              movieTitles.push(`${movie.title} (${releaseYear})`);
            });
            this.setState({
              actors: this.state.actors.concat({ key: newActor }),
              movies:
                Object.keys(this.state.movies).length > 0
                  ? arrayToArrayOfObjects(
                      getCommonElements(
                        objectArrayToArrayOfValues(this.state.movies),
                        movieTitles,
                      ),
                    )
                  : arrayToArrayOfObjects(movieTitles),
            });
          });
      }) // eslint-disable-next-line no-alert
      .catch(error => alert('No actor by that name'));

    this.setState({
      addNewActor: 'ADD NEW ACTOR',
    });
  };

  updateMovies = newMovie => {
    if (!this.state.isMovieLastChanged) {
      this.refresh();
    }

    fetch(`${searchMovieUrl}&query=${newMovie.replace(' ', '+')}`)
      .then(res => res.json())
      .then(queryResponse => {
        const movie = queryResponse.results[0];
        const movieId = movie.id;
        const releaseYear = getYearFromDate(movie.release_date);

        fetch(`${baseMovieUrl}/${movieId}/credits?api_key=${apiKey}`)
          .then(result => result.json())
          .then(creditsResponse => {
            const cast = creditsResponse.cast;
            const castNames = [];
            cast.forEach(castMember => {
              castNames.push(castMember.name);
            });

            this.setState({
              movies: this.state.movies.concat({
                key: `${newMovie} (${releaseYear})`,
              }),
              actors:
                Object.keys(this.state.actors).length > 0
                  ? arrayToArrayOfObjects(
                      getCommonElements(
                        objectArrayToArrayOfValues(this.state.actors),
                        castNames,
                      ),
                    )
                  : arrayToArrayOfObjects(castNames),
            });
          });
      }) // eslint-disable-next-line no-alert
      .catch(error => alert('No movie by that name'));

    this.setState({
      addNewMovie: 'ADD NEW MOVIE',
    });
  };

  onFocusActor = () => {
    this.setState({
      addNewActor: '',
    });
  };

  onFocusMovie = () => {
    this.setState({
      addNewMovie: '',
    });
  };

  onBlur = () => {
    this.setState({
      addNewMovie: 'ADD NEW MOVIE',
      addNewActor: 'ADD NEW ACTOR',
    });
  };

  onChangeMovieText = text => {
    this.setState({
      addNewMovie: text,
    });
  };

  onChangeActorText = text => {
    this.setState({
      addNewActor: text,
    });
  };

  refresh = () => {
    this.setState({
      actors: [],
      movies: [],
      isMovieLastChanged: !this.state.isMovieLastChanged,
    });
  };

  render() {
    return (
      <View style={fullContainer}>
        <Button title={'Refresh'} onPress={this.refresh} color={RED} />
        <View style={sideBySideContainerStyle}>
          <View style={sidePanelStyle}>
            <Text style={headerStyle}>MOVIES</Text>
            <ResultsContainer list={this.state.movies} />
            <TextInput
              style={textInputStyle}
              onChangeText={text => this.onChangeMovieText(text)}
              onSubmitEditing={event =>
                this.updateMovies(event.nativeEvent.text)
              }
              onFocus={this.onFocusMovie}
              onBlur={this.onBlur}
              value={this.state.addNewMovie}
            />
          </View>
          <View style={{ ...sidePanelStyle, ...rightPanelStyle }}>
            <Text style={headerStyle}>ACTORS</Text>
            <ResultsContainer list={this.state.actors} isActor={true} />
            <TextInput
              style={textInputStyle}
              onChangeText={text => this.onChangeActorText(text)}
              onSubmitEditing={event =>
                this.updateActors(event.nativeEvent.text)
              }
              onFocus={this.onFocusActor}
              onBlur={this.onBlur}
              value={this.state.addNewActor}
            />
          </View>
        </View>
      </View>
    );
  }
}
