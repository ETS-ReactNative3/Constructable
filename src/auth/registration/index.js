/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  AsyncStorage,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {Header, Image, Button, Input} from 'react-native-elements';
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

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      phoneNumber: '',
      company: '',
      linkedin: '',
      photo: null,
    };

    this.createFormData = this.createFormData.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.storeUserID = this.storeUserID.bind(this);
  }
  createFormData = () => {
    const data = new FormData();

    Object.keys(this.state).forEach(key => {
      if (key === 'photo') {
        data.append('photo', {
          name: this.state[key].fileName,
          type: this.state[key].type,
          uri:
            Platform.OS === 'android'
              ? this.state[key].uri
              : this.state[key].uri.replace('file://', ''),
        });
      } else {
        data.append(key, this.state[key]);
      }
    });

    return data;
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  async storeUserID(user_id) {
    try {
      console.log('logging user id');
      await AsyncStorage.setItem('user_id', user_id.toString());
    } catch (e) {
      console.log('something goes wrong at storeUserID()!' + e);
    }
  }

  handleSubmit() {
    // fetch('http://localhost:3000/api/upload', {
    //   method: 'POST',
    //   body: this.createFormData(),
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('upload succes', response);
    //     alert('Upload success!');
    //     this.setState({photo: null});
    //   })
    //   .catch(error => {
    //     console.log('upload error', error);
    //     alert('Upload failed!');
    //   });
    this.storeUserID(2);
    Actions.drawer({user_id: 2});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#F3F4F9"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: 'black'}}
          centerComponent={{
            text: 'Sign Up - ' + this.props.role,
            style: {fontSize: 16, fontWeight: 'bold', color: 'black'},
          }}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/signup.png')}
            style={{width: 275, height: 200}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View
          style={{
            flex: 1.5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Input
            placeholder="Email"
            containerStyle={{width: 300}}
            onChangeText={email => this.setState({email})}
          />
          <Input
            placeholder="Username"
            containerStyle={{width: 300}}
            onChangeText={username => this.setState({username})}
          />
          <Input
            placeholder="Phone Number"
            containerStyle={{width: 300}}
            onChangeText={phoneNumber => this.setState({phoneNumber})}
          />
          <Input
            placeholder="Company"
            containerStyle={{width: 300}}
            onChangeText={company => this.setState({company})}
          />
          <Input
            placeholder="LinkedIn"
            containerStyle={{width: 300}}
            onChangeText={linkedin => this.setState({linkedin})}
          />
          <Button
            title="Choose Profile Picture"
            onPress={this.handleChoosePhoto}
            raised
          />
        </View>

        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            buttonStyle={{padding: 10}}
            title="Sign Up"
            onPress={this.handleSubmit}
            raised
          />
        </View>
      </View>
    );
  }
}

export default Registration;
