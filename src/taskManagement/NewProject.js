/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, StyleSheet, Platform} from 'react-native';
import {Header, Input, Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

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

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      timeProposal: 0,
      description: '',
      photo: null,
      user_id: this.props.user_id,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createFormData = this.createFormData.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
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

    Actions.projects();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#F3F4F9"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: 'black'}}
          centerComponent={{
            text: 'New Project',
            style: {fontSize: 16, fontWeight: 'bold', color: 'black'},
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Input
            placeholder="Project Name"
            containerStyle={{width: 300}}
            onChangeText={name => this.setState({name})}
          />
          <Input
            placeholder="Project Description"
            containerStyle={{width: 300}}
            onChangeText={description => this.setState({description})}
          />
          <Input
            placeholder="Project Proposal Timeline (Days)"
            containerStyle={{width: 300}}
            onChangeText={timeProposal => this.setState({timeProposal})}
          />
          <Button
            title="Choose Photo"
            onPress={this.handleChoosePhoto}
            raised
          />
        </View>

        <View style={{flex: 0.2}}>
          <Button
            title="Submit New Project"
            onPress={this.handleSubmit}
            raised
          />
        </View>
      </View>
    );
  }
}

export default NewProject;
