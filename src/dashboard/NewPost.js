/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, Platform, AsyncStorage, StyleSheet} from 'react-native';
import {Header, Button, Input, Text} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {user_id: -1, text: '', color: ''};

    this.clickHandlerImage = this.clickHandlerImage.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    this.clickHandlerText = this.clickHandlerText.bind(this);

    AsyncStorage.getItem('user_id').then(ID => {
      if (ID) {
        this.setState({
          user_id: ID,
        });
      } else {
        Actions.login();
      }
    });
  }

  clickHandlerImage() {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const data = new FormData();
        data.append('photo', {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        });
        data.append('user_id', this.state.user_id);
        this.handleUploadPhoto(data);
      }
    });
  }

  handleUploadPhoto = data => {
    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload succes', response);
      })
      .catch(error => {
        console.log('upload error', error);
      });
  };

  clickHandlerText() {
    console.log(this.state.text);
    console.log(this.state.color);
    // post to api

    Actions.dash({user_id: this.state.user_id});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#F3F4F9"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: 'black'}}
          centerComponent={{
            text: 'New Post',
            style: {fontSize: 16, fontWeight: 'bold', color: 'black'},
          }}
        />
        <View style={styles.container}>
          <Button
            raised
            title="Upload an Image"
            onPress={this.clickHandlerImage}
          />
        </View>
        <Text h4>--------- OR ---------</Text>
        <View style={styles.container}>
          <Input
            placeholder="Enter text here"
            containerStyle={{width: 300}}
            onChangeText={text => this.setState({text})}
          />
          <Input
            placeholder="Enter background color here"
            containerStyle={{width: 300, marginBottom: 50}}
            onChangeText={color => this.setState({color})}
          />
          <Button raised title="Submit Text" onPress={this.clickHandlerText} />
        </View>
      </View>
    );
  }
}

export default NewPost;
