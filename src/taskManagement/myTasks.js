import React, {Component} from 'react';

import {View, StyleSheet, AsyncStorage} from 'react-native';
import {Header} from 'react-native-elements';
import TasksList from './TasksList';
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
});

class MyTasks extends Component {
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
            text: 'My Tasks',
            style: {fontSize: 16, fontWeight: 'bold', color: 'black'},
          }}
        />

        <TasksList user_id={this.state.user_id} />
      </View>
    );
  }
}

export default MyTasks;
