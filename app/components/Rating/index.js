'use strict'

import React, {PropTypes, Component} from 'react'
import {View, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Constants from '../../Constants'

export default class Rating extends Component {

    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string,
        rating: PropTypes.number.isRequired,
    };


    //noinspection JSUnusedGlobalSymbols
    static defaultProps = {
        size: Constants.Rating.Size,
        color: Constants.Color.Rating,
        rating: 5,
    };

    render() {
        let stars = []
        for (let i = 1; i < 6; i++) {
            stars[i - 1] = <Icon
                key={i}
                name={this.props.rating >= i ? Constants.Icon.RatingFull : Constants.Icon.RatingEmpty}
                size={this.props.size} color={this.props.color}
            />
        }

        return (
            <View style={[styles.container, this.props.style]}>
                {stars}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
})