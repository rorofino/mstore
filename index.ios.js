/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'
import React, {Component} from 'react'
import {AppRegistry, View} from 'react-native'

import RootRouter from './app/RootRouter'

class MStore extends Component {
    render() {
        return (
            <View style={{flex: 1, marginTop: 15}}>
                <RootRouter />
            </View>
        )
    }
}

AppRegistry.registerComponent('MStore', () => MStore)
