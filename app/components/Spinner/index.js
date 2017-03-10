import React, {Component} from 'react'
import {View, ActivityIndicator} from 'react-native'

import Constants from './../../Constants'

const SIZES = {SMALL: 'small', LARGE: 'large'}

export default class Spinner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animating: this.props.isLoading
        }
    }

    static propTypes = {
        animating: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.oneOf(SIZES),
        fullStretch: React.PropTypes.bool,
    };

    //noinspection JSUnusedGlobalSymbols
    static defaultProps = {
        animating: true,
        color: Constants.Color.Spinner,
        size: 'large',
        fullStretch: false,
    };

    componentWillReceiveProps(nextProps) {
        const {animating} = nextProps
        this.setState({animating: animating})
    }

    render() {
        const styles = {
            container: {
                backgroundColor: 'transparent',
                height: null,
                width: null,
            },
            container_full_stretch: {
                height: null,
                width: null,
                backgroundColor: 'transparent',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            wrapper: {
                backgroundColor: 'white',
                borderRadius: this.props.size == SIZES.SMALL ? 10 : 20,
                zIndex: 100,
            }
        }

        return (
            <View style={[this.props.fullStretch ? styles.container_full_stretch : styles.container, this.props.style]}>
                <ActivityIndicator
                    size={this.props.size}
                    color={this.props.color}
                    animating={this.props.animating}
                    style={styles.wrapper}
                />
            </View>

        )
    }
}
