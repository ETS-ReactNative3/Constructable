import React, {Component} from 'react';

import {View, StyleSheet} from 'react-native';
import {Card, Tooltip, Text, Avatar} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View styles={styles.container}>
        <Text>My Profile</Text>
      </View>
    );
  }
}

export default Profile;
