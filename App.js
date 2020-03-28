import React, {Component} from 'react';

import {Router, Scene, Drawer} from 'react-native-router-flux';

import Login from './src/auth/login/index';
import Registration from './src/auth/registration/index';
import DrawerComp from './src/Drawer.js';

import Home from './src/dashboard/Home';
import Splash from './src/splash';

class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Router>
        <Scene>
          <Scene key="splash" component={Splash} hideNavBar initial />
          <Scene key="login" component={Login} hideNavBar />
          <Scene key="registration" component={Registration} hideNavBar />

          <Drawer hideNavBar key="drawer" contentComponent={DrawerComp} wrap={false}>
            <Scene key="dash" component={Home} navTransparent />
          </Drawer>
        </Scene>
      </Router>
    );
  }
}

export default App;
