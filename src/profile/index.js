/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, StyleSheet, AsyncStorage, ActivityIndicator} from 'react-native';
import {
  Card,
  Tooltip,
  Text,
  Avatar,
  Header,
  Image,
} from 'react-native-elements';
import PostList from '../dashboard/PostList';
import {Actions} from 'react-native-router-flux';

const postDataFake = require('../dashboard/fakePostData.json');
const usersDataFake = require('./fakeUsers.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0ead6',
  },
  headerContainer: {
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myFakePosts: [],
      user: {},
    };


    this.getUserData = this.getUserData.bind(this);

    AsyncStorage.getItem('user_id').then(ID => {
      if (ID) {
        ID = this.props.user_id ? this.props.user_id : ID;

        this.setState({
          myFakePosts: postDataFake.filter(post => {
            return post.user_id == ID;
          }),
          user: this.getUserData(ID),
        });
      } else {
        Actions.login();
      }
    });
  }

  getUserData(user_id) {
    return usersDataFake[user_id.toString()];
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#669DB3FF"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{
            text: this.state.user.name,
            style: {fontSize: 16, color: '#fff'},
          }}
        />

        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 35,
            borderWidth: 1,
            borderColor: 'black',
            marginTop: 16,
            backgroundColor: 'white',
            width: '95%',
          }}>
          <Image
            containerStyle={{flex: 1.2, marginLeft: 10}}
            source={{uri: this.state.user.profilePic}}
            style={{width: 100, height: 100}}
            borderRadius={100}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#010101'}}>
              {this.state.user.impact}
            </Text>
            <Text style={{fontSize: 13, color: '#0101014D'}}>Impact Score</Text>
          </View>
          <View
            style={{
              flex: 0.75,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#010101'}}>
              {this.state.myFakePosts.length}
            </Text>
            <Text style={{fontSize: 13, color: '#0101014D'}}>Posts</Text>
          </View>
          <View
            style={{
              flex: 0.8,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#010101'}}>
              {this.state.user.projects}
            </Text>
            <Text style={{fontSize: 13, color: '#0101014D'}}>Projects</Text>
          </View>
        </View>
        <View style={{flex: 7}}>
          <PostList postData={this.state.myFakePosts} />
        </View>
      </View>
    );
  }
}

export default Profile;
