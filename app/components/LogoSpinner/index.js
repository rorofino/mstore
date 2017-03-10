import React, {Component, PropTypes} from 'react'
import {View, Animated, Image} from 'react-native'

import Constants from './../../Constants'

export default class Spinner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animating: this.props.isLoading
        }
    }

    static propTypes = {
        logo: PropTypes.any,
        fullStretch: PropTypes.bool,
    };

    //noinspection JSUnusedGlobalSymbols
    static defaultProps = {
        logo: Constants.Image.Logo,
        fullStretch: false,
    };

    componentWillMount() {
        this.animateValue = new Animated.Value(0)

        this.animatedStyle = {
            transform: [{
                rotate: this.animateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                })
            }]
        }
        this.animation = () => {
            this.animateValue.setValue(0)
            Animated.sequence([
                Animated.timing(this.animateValue, {
                    toValue: 6,
                    duration: 3000,
                    friction: 0.5,
                })
            ]).start(() => this.animation())
        }
    }

    componentDidMount() {
        this.animation()
    }

    componentWillUnmount() {
        this.animation()
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
                borderRadius: 25,
                zIndex: 100,
            }
        }
        return (
            <View style={[this.props.fullStretch ? styles.container_full_stretch : styles.container, this.props.style]}>
                <Animated.View style={this.animatedStyle}>
                    <Image source={this.props.logo} style={{height: 50, width: 50}}/>
                </Animated.View>
            </View>
        )
    }
}
