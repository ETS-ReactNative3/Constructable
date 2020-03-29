import React, {Component} from 'react';

import {View, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import {Image, Header} from 'react-native-elements';
import ProjectsList from './ProjectsList';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
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
    right: 20,
    top: 15,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {user_id: ''};
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

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#F3F4F9"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: 'black'}}
          centerComponent={{
            text: 'My Projects',
            style: {fontSize: 16, fontWeight: 'bold', color: 'black'},
          }}
        />

        <ProjectsList user_id={this.state.user_id} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Actions.newProject({user_id: this.state.user_id})}
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

export default MyProjects;
