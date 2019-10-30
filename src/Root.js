import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';


import mainPage from './components/mainPage';
import detail from './components/detail';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Scene key="Root">
                    <Scene
                        key='mainPage'
                        component={mainPage}
                        initial
                        hideNavBar
                    />
                    <Scene
                        key='detail'
                        component={detail}
                        hideNavBar
                    />

                </Scene>

            </Router>
        );
    }
}