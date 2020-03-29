/* eslint-disable react-native/no-inline-styles */
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
    backgroundColor: '#669DB3FF',
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
      postData: this.shuffle(
        postDataFake.reduce(function(res, current, index, array) {
          return res.concat([current, current, current, current]);
        }, []),
      ),
    };
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // componentDidMount() {
  //   // get post data from server
  //   this.setState({
  //     postData: postDataFake,
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#669DB3FF"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{text: 'Local Activity', style: {color: '#fff'}}}
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
