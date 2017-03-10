/**
 * Created by Luan on 11/10/2016.
 */
import React, {Component, PropTypes} from 'react'
import {Text, View, TouchableOpacity, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Constants from './../../Constants'

export default class ToolbarIcon extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.styles = {
            itemWrapper: {
                justifyContent: 'center',
                padding: 10,
                marginRight: 10,
                marginLeft: -10,
                // backgroundColor: 'pink'
            },
            number_background: {
                backgroundColor: 'red',
                position: 'absolute',
                top: 5,
                right: 0,
                height: 16,
                width: 16,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
            },
            number_text: {color: 'white', fontSize: 10}
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        total: PropTypes.number,
        onPress: PropTypes.func.isRequired,
    };

    static defaultProps = {
        total: 0
    };

    componentWillMount() {
        this.total = this.props.total
        this.animateValue1 = new Animated.Value(1)
        this.animateValue2 = new Animated.Value(0)
    }

    componentWillReceiveProps(nextProps) {
        const {total} = nextProps
        if (total !== this.total) {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(this.animateValue1, {
                        toValue: 0.5,
                        duration: 200,
                    }),
                    Animated.timing(this.animateValue2, {
                        toValue: this.total < total ? -5 : 5,
                        duration: 200,
                    })
                ]),
                Animated.parallel([
                    Animated.timing(this.animateValue1, {
                        toValue: 1,
                        duration: 200,
                    }),
                    Animated.spring(this.animateValue2, {
                        toValue: 0,
                        duration: 200,
                    })
                ])
            ]).start()
            this.total = total
        }
    }

    render() {
        const animatedStyle1 = {
            opacity: this.animateValue1,
            width: 42,
        }
        const animatedStyle2 = {
            transform: [
                {translateY: this.animateValue2}
            ]
        }
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{flex: 1}}>
                <Animated.View style={[this.styles.itemWrapper, animatedStyle1]}>
                    <Icon name={this.props.name} size={25} color={Constants.Color.ToolbarIcon}/>
                    {this.props.total == 0 ? <View/> :
                        <Animated.View style={[this.styles.number_background, animatedStyle2]}>
                            <Text style={this.styles.number_text}>{this.props.total}</Text>
                        </Animated.View>}
                </Animated.View>
            </TouchableOpacity>)
    }
}