/**
 * Created by luanp on 22/09/2016.
 */
'use strict'

import React, {Component} from 'react'
import {View, StyleSheet, Image, AsyncStorage} from 'react-native'
import {Actions} from 'react-native-router-flux'
import AppIntro from 'react-native-app-intro'

import intro from './css'

import Constants from './../../Constants'

const height = Constants.Dimension.ScreenHeight()
const width = Constants.Dimension.ScreenWidth()

export default class Intro extends Component {

    componentDidMount() {
        AsyncStorage.setItem(Constants.AsyncCode.Intro, 'done')
    }

    render() {
        return (
            <View>
                <AppIntro
                    skipBtnLabel="SKIP"
                    doneBtnLabel="DONE"
                    activeDotColor={'rgba(255,255,255,0.5)'}
                    dotColor={'rgba(255,255,255,0.1)'}
                    onDoneBtnClick={Actions.home}
                    onSkipBtnClick={Actions.home}>

                    <View style={intro.slide}>
                        <View level={10}>
                            <Image style={styles.bg}
                                   source={require('../../images/intro/android/01.1.bg.png') }/>
                        </View>

                        <View level={-20} style={{
                            'position': 'absolute',
                            'height': 200,
                            'left': 10,
                            'bottom': 0,
                            'width': width
                        }}>
                            <Image style={{
                                'width': width * 0.8,
                                'resizeMode': 'contain',
                                'marginLeft': 10
                            }} source={require('../../images/intro/android/01.1.body.png') }/>
                        </View>

                        <View level={20} style={{
                            'position': 'absolute',
                            'height': 250,
                            'left': 10,
                            'bottom': 0,
                            'width': width
                        }}>
                            <Image style={{
                                'width': width * 0.55,
                                'resizeMode': 'contain',
                                'marginLeft': 10
                            }} source={require('../../images/intro/android/01.1.title.png') }/>
                        </View>
                    </View>

                    <View style={intro.slide}>
                        <View level={10}>
                            <Image style={styles.bg}
                                   source={require('../../images/intro/android/01.2.bg.png') }/>
                        </View>

                        <View level={-20} style={{
                            'position': 'absolute',
                            'height': 200,
                            'left': 10,
                            'bottom': 0,
                            'width': width
                        }}>
                            <Image style={{
                                'width': width * 0.8,
                                'resizeMode': 'contain',
                                'marginLeft': 10
                            }} source={require('../../images/intro/android/01.2.body.png') }/>
                        </View>

                        <View level={20} style={{
                            'position': 'absolute',
                            'height': 250,
                            'left': 10,
                            'bottom': 0,
                            'width': width
                        }}>
                            <Image style={{
                                'width': width * 0.4,
                                'resizeMode': 'contain',
                                'marginLeft': 10
                            }} source={require('../../images/intro/android/01.2.title.png') }/>
                        </View>
                    </View>

                    <View style={intro.slide}>
                        <View level={10}>
                            <Image style={styles.bg}
                                   source={require('../../images/intro/android/01.3.bg.png') }/>
                        </View>

                        <View level={-20} style={{
                            'position': 'absolute',
                            'height': 220,
                            'left': 10,
                            'bottom': 0,
                            'width': width
                        }}>
                            <Image style={{
                                'width': width * 0.8,
                                'resizeMode': 'contain',
                                'marginLeft': 10
                            }} source={require('../../images/intro/android/01.3.body.png') }/>
                        </View>

                        <View level={20} style={{
                            'position': 'absolute',
                            'height': 250,
                            'left': 10,
                            'bottom': 0,
                            'width': width
                        }}>
                            <Image style={{
                                'width': width * 0.8,
                                'resizeMode': 'contain',
                                'marginLeft': 10
                            }} source={require('../../images/intro/android/01.3.title.png') }/>
                        </View>
                    </View>
                </AppIntro>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        height: height,
        width: width,
    },
})
