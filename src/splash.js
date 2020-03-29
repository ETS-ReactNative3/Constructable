/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  Dimensions,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

const {height, width} = Dimensions.get('window');
const USER_ID = 'user_id';

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    AsyncStorage.getItem(USER_ID).then(ID => {
      if (ID) {
        console.log('In Splash ' + ID);
        setTimeout(() => Actions.drawer({user_id: ID}), 1000);
      } else {
        setTimeout(() => Actions.login(), 1000);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/images/loginBackground.png')}
          style={styles.image}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Constructable</Text>
            </View>
          </View>

          <View style={{flex: 4}} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: 151,
    height: 151,
    backgroundColor: '#000000B3',
    borderColor: '#95989A',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
