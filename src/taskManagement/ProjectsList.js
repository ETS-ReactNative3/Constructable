/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Card, CheckBox} from 'react-native-elements';

import Collapsible from 'react-native-collapsible';
import {Actions} from 'react-native-router-flux';

const fakeProjects = require('./fakeProjects.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  projectContainer: {
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
  addTaskContainer: {
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 250,
    top: 222,
    right: 0,
  },
});

const statusToColor = {
  "Haven't Started": 'white',
  'Initial Planning': 'yellow',
  'Halfway Completed': 'orange',
  'Finalizing Task': 'lightgreen',
  'Completed Task': 'darkgreen',
};

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    // TODO: get actual projects from api
    this.state = {
      isCollapse: [],
    };
  }

  render() {
    return (
      <FlatList
        useNativeDriver={true}
        style={{marginTop: 32}}
        data={fakeProjects}
        renderItem={({item, index}) => {
          this.state.isCollapse.push(true);
          return (
            <View style={styles.container}>
              <View style={styles.projectContainer}>
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
                  <TouchableOpacity
                    onPress={() => {
                      Actions.newTask({
                        user_id: this.props.user_id,
                        project_name: item.name,
                      });
                    }}>
                    <Text h4 style={{color: '#FFFFFF'}}>
                      {item.name}
                    </Text>
                    <Text style={{color: '#FFFFFF80', fontSize: 16}}>
                      {item.timline} Week Proposal
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Collapsible
                collapsed={this.state.isCollapse[index]}
                style={{alignSelf: 'center', marginTop: -10}}>
                <Card title="Description" containerStyle={{borderRadius: 15}}>
                  <Text style={{padding: 15}}>{item.description}</Text>
                </Card>
                <Card title="Tasks" containerStyle={{borderRadius: 15}}>
                  {item.tasks.map((y, i) => {
                    return (
                      <CheckBox
                        uncheckedColor={statusToColor[y.status]}
                        key={i}
                        title={y.name + ' >> ' + y.workers.toString()}
                      />
                    );
                  })}
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

export default ProjectsList;
