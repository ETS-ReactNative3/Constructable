/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, StyleSheet} from 'react-native';
import {Header, Input, Button} from 'react-native-elements';
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

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      owners: '',
      timeline: 0,
      impact: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(this.state.name);
    console.log(this.state.impact);

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
            text: this.props.project_name + ' - New Task',
            style: {fontSize: 14, fontWeight: 'bold', color: 'black'},
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Input
            placeholder="Task Name"
            containerStyle={{width: 300}}
            onChangeText={name => this.setState({name})}
          />
          <Input
            placeholder="Task Description"
            containerStyle={{width: 300}}
            onChangeText={description => this.setState({description})}
          />
          <Input
            placeholder="Task Assigned To"
            containerStyle={{width: 300}}
            onChangeText={owners => this.setState({owners})}
          />
          <Input
            placeholder="Task Timeline (Days)"
            containerStyle={{width: 300}}
            onChangeText={timeline => this.setState({timeline})}
          />
          <Input
            placeholder="Task's Impact Score"
            containerStyle={{width: 300}}
            onChangeText={impact => this.setState({impact})}
          />
        </View>

        <View style={{flex: 0.2}}>
          <Button title="Submit New Task" raised onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}

export default NewTask;
