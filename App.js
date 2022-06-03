import React, { Component } from 'react';
import { View } from 'react-native';
import Banner from './Banner';
import MainContainer from './MainContainer';

const bodyStyle = {
  flexDirection: 'column',
  flex: 1,
};

const bannerStyle = {
  flex: 0.1,
};

const sideBySideContainerStyle = {
  flex: 0.9,
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
        <Banner
          style={bannerStyle}
          onActorMatchChange={this.onActorMatchChange}
          isActorMatch={this.state.isActorMatch}
        />
        <MainContainer
          style={sideBySideContainerStyle}
          isActorMatch={this.state.isActorMatch}
        />
      </View>
    );
  }
}

export default App;
