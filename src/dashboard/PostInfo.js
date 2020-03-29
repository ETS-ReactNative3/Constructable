/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    margin: 16,
    width: 150,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

class PostInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Image
            source={{uri: this.props.src}}
            style={{width: 50, height: 50}}
            borderRadius={100}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={{flex: 0.5}} />
        <TouchableOpacity
          onPress={() => Actions.profile({user_id: this.props.id})}>
          <View style={styles.textContainer}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#FFFFFF'}}>
              {this.props.name}
            </Text>
            <Text style={{fontSize: 8, color: '#FFFFFF'}}>
              {this.props.views} views
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PostInfo;
