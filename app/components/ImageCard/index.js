/**
 * Created by Luan on 10/26/2016.
 */
import React, {Component} from 'react'
import {View, Image, TouchableOpacity} from 'react-native'

import Constants from './../../Constants'

export default class ImageCard extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        source: React.PropTypes.any,
    };


    //noinspection JSUnusedGlobalSymbols
    static defaultProps = {
        source: Constants.Image.CategoryPlaceholder,
    };

    render() {
        const styles = {
            image: {
                flex: 1,
                width: undefined,
                height: undefined,
                backgroundColor: 'transparent',

            },
            dim_layout: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }
        }

        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={this.props.onPress}>
                <Image source={this.props.source}
                       style={styles.image}
                       resizeMode="cover"
                >
                    <View style={styles.dim_layout}>
                        {this.props.children}
                    </View>
                </Image>
            </TouchableOpacity>
        )
    }
}
