/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Card, Slider} from 'react-native-elements';

import Collapsible from 'react-native-collapsible';

const fakeTasks = require('./fakeTasks.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
    elevation: 15,
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    borderRadius: 20,
  },
  postDetContainer: {
    position: 'absolute',
    bottom: 0,
    top: 160,
    left: 40,
    right: 0,
  },
});

const statusOptions = [
  "Haven't Started",
  'Initial Planning',
  'Halfway Completed',
  'Finalizing Task',
  'Completed Task',
];

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    // TODO: get actual tasks from api
    this.state = {
      isCollapse: [],
      statusValues: [],
    };
  }

  // also take in task_id from item
  changeTaskStatus(index) {
    // do some api stuff here
    console.log(this.state.statusValues[index]);
  }

  render() {
    return (
      <FlatList
        useNativeDriver={true}
        style={{marginTop: 32}}
        data={fakeTasks}
        renderItem={({item, index}) => {
          this.state.isCollapse.push(true);
          this.state.statusValues.push(statusOptions.indexOf(item.status));
          return (
            <View style={styles.container}>
              <View style={styles.taskContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState(prevState => {
                      prevState.isCollapse[index] = !prevState.isCollapse[
                        index
                      ];
                      return {isCollapse: prevState.isCollapse};
                    });
                  }}>
                  <Image style={styles.thumbnail} source={{uri: item.image}} />
                </TouchableOpacity>
                <View style={styles.postDetContainer}>
                  <Text h4 style={{color: '#FFFFFF'}}>
                    {item.name}
                  </Text>
                  <Text style={{color: '#FFFFFF80', fontSize: 16}}>
                    {item.proposalTime} Day Proposal
                  </Text>
                </View>
              </View>

              <Collapsible
                collapsed={this.state.isCollapse[index]}
                style={{alignSelf: 'center', marginTop: -10}}>
                <Card
                  title="Task Description"
                  containerStyle={{borderRadius: 15, width: 375}}>
                  <Text style={{padding: 15}}>{item.description}</Text>
                </Card>
                <Card
                  title="Progress Update"
                  containerStyle={{borderRadius: 15}}>
                  <Slider
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    onSlidingComplete={() =>
                      this.changeTaskStatus(index)
                    }
                    onValueChange={value =>
                      this.setState(prevState => {
                        prevState.statusValues[index] = value;
                        return {statusValues: prevState.statusValues};
                      })
                    }
                    value={statusOptions.indexOf(item.status)}
                  />
                </Card>
              </Collapsible>
            </View>
          );
        }}
        //Setting the number of column
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default TasksList;
