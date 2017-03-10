import React, {PropTypes, Component} from 'react'
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Constants from './../../Constants'

export default class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: this.props.isLoading
        }
    }

    static propTypes = {
        isLoading: PropTypes.bool,
        autoWidth: PropTypes.bool,
        borderLess: PropTypes.bool,
        autoMargin: PropTypes.bool,
        color: PropTypes.string,
        overlayColor: PropTypes.string,
        iconName: PropTypes.string,
    };

    static defaultProps = {
        isLoading: false,
        autoWidth: true,
        borderLess: false,
        autoMargin: true,
        color: Constants.Color.ButtonText,
        overlayColor: Constants.Color.ButtonBackground,
        iconName: ''
        // size: 'large', // 'normal',
    };

    componentWillReceiveProps(nextProps) {
        const {isLoading} = nextProps
        this.setState({isLoading: isLoading})
    }

    render() {
        let styles = {
            button: {
                borderColor: Constants.Color.ButtonBorder,
                borderWidth: this.props.borderLess ? 0 : 1,
                backgroundColor: this.props.overlayColor,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
                marginLeft: this.props.autoMargin ? Constants.Dimension.ScreenWidth(0.05) : 0,
                marginRight: this.props.autoMargin ? Constants.Dimension.ScreenWidth(0.05) : 0,
                height: 45,
                width: this.props.autoWidth ? Constants.Dimension.ScreenWidth(0.9) : undefined,
            },
            text: {
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                color: this.props.color,
            }
        }

        return (
            <TouchableOpacity
                style={[styles.button, this.props.style]}
                onPress={this.props.onPress}>
                { this.props.isLoading ?
                    <ActivityIndicator size='small' color={this.props.color}/> : (
                    this.props.iconName === '' ?
                        <Text style={styles.text}>{this.props.children}</Text> :
                        <View>
                            <Icon name={this.props.iconName} size={30} color={Constants.Color.ButtonText}/>
                            <Text style={[styles.text, {
                                position: 'absolute', left: 9, top: 3,
                                fontSize: 12, color: this.props.overlayColor
                            }]}>{this.props.children}</Text>
                        </View>)}
            </TouchableOpacity>
        )
    }
}
