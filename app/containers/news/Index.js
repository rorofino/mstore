'use strict'

import React, {Component} from 'react'
import {ScrollView, Platform, View} from 'react-native'

import PostCategory from './PostCategory'
import StickyScrollView from './Widget/StickyScrollView'
import Toolbar from './../../components/Toolbar'

export default class Index extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<View style={{flex: 1}}>
                <Toolbar title={this.props.title}
                         back={this.props.back}
                         cart={this.props.cart}
                         wishList={this.props.wishList}/>
                {Platform.OS === 'ios'
                    ? (
                    <StickyScrollView>
                        <PostCategory />
                    </StickyScrollView>
                )
                    : (
                    <ScrollView>
                        <PostCategory />
                    </ScrollView>
                )}
            </View>
        )
    }
}
