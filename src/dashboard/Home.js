import React, {Component} from 'react';

import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Header, Image} from 'react-native-elements';
import PostList from './PostList';
import {Actions} from 'react-native-router-flux';

const postDataFake = require('./fakePostData.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('Dash: ' + this.props.user_id);
    this.state = {
      postData: postDataFake,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#F3F4F9"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: 'black'}}
          centerComponent={{
            text: 'Local Activity',
            style: {fontSize: 16, fontWeight: 'bold', color: '#black'},
          }}
        />

        <PostList postData={this.state.postData} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Actions.newPost()}
          style={styles.TouchableOpacityStyle}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
