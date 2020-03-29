/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {Text} from 'react-native-elements';
import PostInfo from './PostInfo';
import ExpandedPost from './ExpandedPost';

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
    elevation: 15,
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    borderRadius: 20,
  },
  postDetContainer: {
    position: 'absolute',
    bottom: 0,
    top: 230,
    left: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F6F7FB',
    borderWidth: 4,
    borderColor: 'black',
    width: '80%',
    height: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
  },
});

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      focusedPost: {},
    };
  }

  openPostModal(post) {
    this.setState({focusedPost: post});
    this.setState({modalVisible: true});
  }

  render() {
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({modalVisible: false})}
          visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ExpandedPost post={this.state.focusedPost} />
            </View>
          </View>
        </Modal>

        <FlatList
          style={{marginTop: 32}}
          data={this.props.postData}
          renderItem={({item}) => {
            if ('image' in item) {
              return (
                <View style={styles.postContainer}>
                  <TouchableOpacity onPress={() => this.openPostModal(item)}>
                    <Image
                      style={styles.thumbnail}
                      source={{uri: item.image}}
                    />
                  </TouchableOpacity>
                  <View style={styles.postDetContainer}>
                    <PostInfo
                      src={item.profilePic}
                      name={item.username}
                      views={item.views}
                      id={item.user_id}
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.postContainer}>
                  <TouchableOpacity onPress={() => this.openPostModal(item)}>
                    <View
                      style={[
                        styles.thumbnail,
                        {
                          backgroundColor: item.color,
                        },
                      ]}>
                      <ScrollView
                        style={{height: 300}}
                        contentContainerStyle={{flex: 1}}>
                        <Text style={{padding: 15}}>{item.text}</Text>
                      </ScrollView>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.postDetContainer}>
                    <PostInfo
                      src={item.profilePic}
                      name={item.username}
                      views={item.views}
                    />
                  </View>
                </View>
              );
            }
          }}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  }
}

export default PostList;
