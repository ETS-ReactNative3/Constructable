/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';

import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  AsyncStorage,
} from 'react-native';

const {height, width} = Dimensions.get('window');

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
  authContainer: {
    width: 0.8 * width,
    backgroundColor: '#0000004D',
  },
  loginButton: {
    width: 0.8 * width,
    backgroundColor: '#FF347A',
    padding: 7,
    borderRadius: 10,
  },
  registerButtonLeft: {
    width: 0.4 * width,
    backgroundColor: '#727272',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'black',
    borderRightWidth: 2,
  },
  registerButtonRight: {
    width: 0.4 * width,
    backgroundColor: '#727272',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'black',
    borderLeftWidth: 2,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  async storeUserID(user_id) {
    try {
      console.log('logging user id');
      await AsyncStorage.setItem('user_id', user_id.toString());
    } catch (e) {
      console.log('something goes wrong at storeUserID()!' + e);
    }
  }

  attemptLogin = () => {
    // logic for confirming login
    // and getting user id goes here
    this.storeUserID(2);
    Actions.drawer({user_id: 2});
    console.log(this.state.username);
    console.log(this.state.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/loginBackground.png')}
          style={styles.image}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Constructable</Text>
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <Input
              placeholder="Username"
              containerStyle={styles.authContainer}
              inputStyle={{color: 'white'}}
              leftIcon={<Icon name="user" size={18} color="white" />}
              leftIconContainerStyle={{marginRight: 5}}
              placeholderTextColor="white"
              value={this.state.username}
              onChangeText={text => this.setState({username: text})}
            />
            <Input
              placeholder="Password"
              containerStyle={styles.authContainer}
              inputStyle={{color: 'white'}}
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={18} color="white" />}
              leftIconContainerStyle={{marginRight: 5}}
              placeholderTextColor="white"
              onChangeText={text => this.setState({password: text})}
            />
          </View>
          <View style={{flex: 3, justifyContent: 'center'}}>
            <Button
              title="LOGIN"
              raised
              buttonStyle={styles.loginButton}
              onPress={this.attemptLogin}
            />
            <View style={{flexDirection: 'row', marginTop: 16}}>
              <Button
                title="REGISTER: Supervisor"
                buttonStyle={styles.registerButtonLeft}
              />
              <Button
                title="REGISTER: Worker"
                buttonStyle={styles.registerButtonRight}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Login;
