/**
 * Created by Luan on 11/10/2016.
 */

import React, {Component, PropTypes} from 'react';
import {TextInput, View, Image, StyleSheet, ScrollView} from 'react-native';
import validate from "validate.js";

export default class TextInputWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: '',
        })
        this.styles = {
            text_input: {
                borderWidth: 1,
                borderColor: 'black',
                height: 40,
                margin: this.props.autoMargin ? 10 : 0,
            }
        }
    }

    static propTypes = {
        // ...TextInput.propTypes,
        autoMargin: PropTypes.bool,
    };

    static defaultProps = {
        autoMargin: true,
    };


    render() {
        //number only
        const onChangeText = (value1) => {
            value = String.prototype.toUpperCase(value1);
            // var re = new RegExp("^[0-9]{0,10}$");
            // if (re.test(value))
                this.setState({value})
        }


        this.textInput = <TextInput
            {...this.props}
            value={this.state.value}
            onChangeText={onChangeText}
            style={[this.styles.text_input, this.props.style]}
        />
        return (this.textInput);
    }

    getValue() {
        var re = new RegExp("^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$");
        return re.test(this.state.value);
    }

}
