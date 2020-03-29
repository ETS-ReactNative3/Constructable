import React, {Component} from 'react';

import {Router, Scene, Drawer} from 'react-native-router-flux';

import Login from './src/auth/login/index';
import Registration from './src/auth/registration/index';
import DrawerComp from './src/Drawer.js';

import Home from './src/dashboard/Home';
import Splash from './src/splash';
import Profile from './src/profile';
import NewPost from './src/dashboard/NewPost';
import MyProjects from './src/taskManagement/myProjects';
import NewTask from './src/taskManagement/NewTask';
import NewProject from './src/taskManagement/NewProject';
import MyTasks from './src/taskManagement/myTasks';

class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Router>
        <Scene>
          <Scene key="splash" component={Splash} hideNavBar initial />
          <Scene key="login" component={Login} hideNavBar />
          <Scene key="register" component={Registration} hideNavBar />

          <Drawer hideNavBar key="drawer" contentComponent={DrawerComp}>
            <Scene hideNavBar panHandlers={null}>
              <Scene key="dash" component={Home} navTransparent />
              <Scene key="profile" component={Profile} navTransparent />
              <Scene key="newPost" component={NewPost} navTransparent />
              <Scene key="projects" component={MyProjects} navTransparent />
              <Scene key="newTask" component={NewTask} navTransparent />
              <Scene key="newProject" component={NewProject} navTransparent />
              <Scene key="tasks" component={MyTasks} navTransparent />
            </Scene>
          </Drawer>
        </Scene>
      </Router>
    );
  }
}

export default App;
