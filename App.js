import React, { Component } from 'react';
import { View } from 'react-native';
import Banner from './Banner';
import MainContainer from './MainContainer';

const bodyStyle = {
  flexDirection: 'column',
  flex: 1,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActorMatch: false,
    };
  }

  onActorMatchChange = isActorMatch => {
    this.setState({
      isActorMatch: isActorMatch,
    });
  };

  render() {
    return (
      <View style={bodyStyle}>
        <Banner />
        <MainContainer
          isActorMatch={this.state.isActorMatch}
        />
      </View>
    );
  }
}

export default App;
