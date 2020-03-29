/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {Image, Input, Icon} from 'react-native-elements';
import PostInfo from './PostInfo';

import {Actions} from 'react-native-router-flux';

const commentDataFake = require('./fakeCommentData.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 322,
  },
  postDetContainer: {
    position: 'absolute',
    bottom: 10,
    top: 0,
    left: 0,
    right: 0,
  },
});

class ExpandedPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: commentDataFake[this.props.post.post_id.toString()],
      addedComment: '',
    };

    this.addComment = this.addComment.bind(this);
  }

  addComment() {
    console.log('Adding comment' + this.state.addedComment);
    Actions.reset('drawer');
  }

  render() {
    let postView;
    if ('image' in this.props.post) {
      postView = (
        <Image style={styles.thumbnail} source={{uri: this.props.post.image}} />
      );
    } else {
      postView = (
        <ScrollView
          style={{
            backgroundColor: this.props.post.color,
            width: 322,
          }}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{padding: 15}}>{this.props.post.text}</Text>
        </ScrollView>
      );
    }
    let item1 = this.props.post;
    return (
      <View style={styles.container}>
        <View style={{flex: 5}}>{postView}</View>
        <View style={styles.postDetContainer}>
          <PostInfo
            src={item1.profilePic}
            name={item1.username}
            views={item1.views}
            id={item1.user_id}
          />
        </View>
        <View style={{flex: 3}}>
          <FlatList
            data={this.state.commentData}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    margin: 16,
                    width: 340,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: item.commentProfilePic}}
                      style={{width: 50, height: 50}}
                      borderRadius={100}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                    <Text>{item.commentName}</Text>
                  </View>
                  <View style={{flex: 5}}>
                    <View
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: 'black',
                        height: 100,
                        width: 200,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{padding: 10}}>{item.comment}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            //Setting the number of column
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f0ead6',
          }}>
          <Input
            containerStyle={{flex: 4}}
            placeholder="Add a comment..."
            value={this.state.addedComment}
            onChangeText={text => this.setState({addedComment: text})}
          />
          <TouchableHighlight onPress={this.addComment}>
            <Icon containerStyle={{padding: 8}} name="rowing" />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default ExpandedPost;
