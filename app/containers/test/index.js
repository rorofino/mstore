/**
 * Created by luanp on 22/09/2016.
 */
'use strict'
/*eslint no-unused-vars: "off"*/

import React, {Component, PropTypes} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    ListView,
    Alert,
    WebView
} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
// import Modal from 'react-native-modalbox'
import Toolbar from './../../components/Toolbar/index'
import Button from '../../components/Button/index'
// import PayPalPanel, {PAYMENT_ERROR} from '../../components/PayPalPanel'
import TextInputWrapper from './Form/TextInputWrapper'

import Constants from './../../Constants'
import CountryWorker from './../../services/CountryWorker'


class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            isLoading: true,
            // paymentState: PAYMENT_ERROR,
        }

        this.openModal = () => this.refs.PayPalModal.open()
        this.closeModal = () => this.refs.PayPalModal.close()
    }

    static propTypes = {
        state: PropTypes.object.isRequired,
    };

    componentWillMount() {
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={this.props.title} back={false} cart={true}/>
                <View style={{flex: 1}}>
                    <Button onPress={() => this.openModal()}>Pay</Button>
                </View>
                <Modal ref='PayPalModal'
                       backdropPressToClose={false}
                       backButtonClose={true}
                       swipeToClose={false}
                       onClosed={() => console.log(this.state.paymentState)}
                       style={{flex: 1}}>
                    <PayPalPanel
                        setPaymentStates={(paymentState) => this.setState({paymentState})}
                        closeModal={() => this.closeModal()}
                    />
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onTodoClick: (id) => {
        //     dispatch(toggleTodo(id));
        // }
    }
}

//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(mapStateToProps, mapDispatchToProps)(Test)
