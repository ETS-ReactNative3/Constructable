import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';

import {Text, Header} from 'react-native-elements';

const postDataFake = require('./fakePostData.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#669DB3FF',
  },
  headerContainer: {
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  postContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
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
    left: 50,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: this.shuffle(
        postDataFake.reduce(function(res, current, index, array) {
          return res.concat([current, current, current, current]);
        }, []),
      ),
    };
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // componentDidMount() {
  //   // get post data from server
  //   this.setState({
  //     postData: postDataFake,
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#669DB3FF"
          containerStyle={styles.headerContainer}
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{text: 'Local Activity', style: {color: '#fff'}}}
        />

        <FlatList
          style={{marginTop: 32}}
          data={this.state.postData}
          renderItem={({item}) => {
            console.log('image' in item);
            if ('image' in item) {
              return (
                <View style={styles.postContainer}>
                  <Image style={styles.thumbnail} source={{uri: item.image}} />
                  <Text style={styles.postDetContainer}>Test Text</Text>
                </View>
              );
            } else {
              return (
                <View style={styles.postContainer}>
                  <View
                    style={[
                      styles.thumbnail,
                      {
                        backgroundColor: item.color,
                      },
                    ]}>
                    <ScrollView
                      style={{height: 300}}
                      contentContainerStyle={{flex: 1}}>
                      <Text style={{padding: 15}}>{item.text}</Text>
                    </ScrollView>
                  </View>
                  <Text style={styles.postDetContainer}>Test Text</Text>
                </View>
              );
            }
          }}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default Home;
