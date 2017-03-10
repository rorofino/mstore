import React, {Component} from "react";
import {View, Text, Animated, ScrollView, TouchableOpacity} from "react-native";
import EventEmitter from "./../../../utils/AppEventEmitter";
import news from "./../style";
import PostMenu from "./PostMenu";

var offset = 0;
var beta = 30;

export default class StickyScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paddingTop: 100,
            _animatedMenu: new Animated.Value(0)
        }
    }

    /**
     * Hide animation menu
     */
    hideMenu() {
        Animated.spring(this.state._animatedMenu, {
            toValue: -60
        }).start();
        this.setState({paddingTop: 40});
    }

    /**
     * Show animation menu
     */
    showMenu() {
        Animated.spring(this.state._animatedMenu, {
            toValue: 0
        }).start();
        this.setState({paddingTop: 100});
    }

    /**
     * trigger when scroll
     * @param event
     */
    onScroll(event) {
        var currentOffset = event.nativeEvent.contentOffset.y;

        if (event.nativeEvent.contentSize.height - currentOffset < 800) {
            EventEmitter.emit('posts.fetchData');
        }

        if (currentOffset < 100) {
            this.showMenu();
            return;
        }
        else if (Math.abs(offset - currentOffset) <= beta) {
            return;
        }

        if (currentOffset > offset) {
            this.hideMenu();
        } else if (currentOffset <= offset) {
            this.showMenu()
        }
        offset = currentOffset;
    }

    render() {
        return (
            <View style={news.color}>
                <PostMenu animateMenu={this.state._animatedMenu}/>
                <ScrollView style={{paddingTop: this.state.paddingTop}} onScroll={this.onScroll.bind(this)}
                            scrollEventThrottle={60}>
                    {this.props.children}
                </ScrollView>
            </View>
        )
    }
}
