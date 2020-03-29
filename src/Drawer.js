/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Avatar, Text, Icon} from 'react-native-elements';

import {Actions} from 'react-native-router-flux';

import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from 'react-native';

const {height} = Dimensions.get('window');
const width = 280;

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
  profileOverview: {
    flex: 2,
    margin: 24,
    width: width,
  },
  menuItems: {
    flex: 3,
    width: width - 48,
    marginTop: 16,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  accountDesc: {
    marginLeft: 24,
    fontSize: 14,
    color: '#00000073',
  },
  menuText: {
    color: '#17224D',
    fontSize: 18,
    marginLeft: 20,
  },
  miscItems: {
    flex: 2,
    width: width - 48,
    marginTop: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  miscText: {
    color: '#17224D73',
    fontSize: 16,
  },
});

const menuToIcon = {
  // eslint-disable-next-line prettier/prettier
  'Dashboard': 'home',
  'Task Manager': 'work',
  'My Profile': 'account-circle',
  // eslint-disable-next-line prettier/prettier
  'Analytics': 'bubble-chart',
};

const menuToNav = {
  // eslint-disable-next-line prettier/prettier
    'Dashboard': 'dash',
  'Task Manager': 'tasks',
  'My Profile': 'profile',
  // eslint-disable-next-line prettier/prettier
    'Analytics': 'analytics',
};

class DrawerComp extends Component {
  constructor(props) {
    super(props);
    console.log('Drawer: ' + this.props.user_id);
    this.state = {user_id: -1, name: '', username: ''};
    this.menuItems = ['Dashboard', 'Task Manager', 'My Profile', 'Analytics'];

    AsyncStorage.getItem('user_id').then(ID => {
      if (ID) {
        this.setState({user_id: ID});
        // logic for grabbing profile pic, name, username
        this.setState({name: 'Akshat Jain', username: '@akshatjainx'});
      } else {
        Actions.login();
      }
    });
  }

  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/images/mask.png')}
          style={styles.image}>
          <View style={styles.profileOverview}>
            <Avatar
              containerStyle={{marginLeft: 24, borderRadius: 60}}
              overlayContainerStyle={{borderRadius: 60}}
              source={require('./assets/images/avatar.png')}
              size="xlarge"
            />
            <Text h3Style={{marginLeft: 24, marginTop: 16}} h3>
              {this.state.name}
            </Text>
            <Text style={styles.accountDesc}>{this.state.username}</Text>
          </View>

          <View style={styles.menuItems}>
            {this.menuItems.map(item => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={menuToIcon[item]}
                    type="material"
                    onPress={() => {
                      Actions[menuToNav[item]].call({
                        user_id: this.state.user_id,
                      });
                      Actions.drawerClose();
                    }}
                  />
                  <Text
                    style={styles.menuText}
                    onPress={() => {
                      Actions[menuToNav[item]].call({
                        user_id: this.state.user_id,
                      });
                      Actions.drawerClose();
                    }}>
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.miscItems}>
            <Text style={styles.miscText}>About Us</Text>
            <Text style={[styles.miscText, {marginTop: 16}]}>
              Privacy Policy
            </Text>
            <Text
              style={[styles.miscText, {marginTop: 48}]}
              onPress={() => {
                this.clearAsyncStorage();
                Actions.login();
              }}>
              Log Out
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default DrawerComp;
