/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'
import React, {Component} from 'react'
import {AppRegistry} from 'react-native'

import RootRouter from './app/RootRouter'

class MStore extends Component {
    render() {
        return <RootRouter />
    }
}

AppRegistry.registerComponent('MStore', () => MStore)

