/**
 * Created by luanp on 22/09/2016.
 */
'use strict'

import React, {Component, PropTypes} from 'react'
import {WebView} from 'react-native'
import PayPalAPI, {
    RETURN_URL,
    CANCEL_URL,
    PAYMENT_APPROVED_CODE,
    PAYMENT_CANCELED_CODE,
} from './../../services/PayPalAPI'


export default class PayPalPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {url: 'https://www.paypal.com'}
        this.shouldCheckURL = true // use to make sure accept or cancel only execute once.
    }

    static propTypes = {
        closeModal: PropTypes.func.isRequired,
        setPaymentStates: PropTypes.func.isRequired,
        order: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const {order} = this.props

        // create items array
        const items = [] //cart items
        for (let item of order.line_items) {
            items.push({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                tax: item.total_tax,
                sku: item.sku !== '' ? item.sku : 'no sku',
                currency: order.currency
            })
        }

        this.transactions = [
            {
                amount: {
                    total: order.total,
                    currency: order.currency,
                    details: {
                        tax: order.total_tax,
                        shipping: order.shipping_total,
                    }
                },
                invoice_number: order.id,
                payment_options: {allowed_payment_method: 'INSTANT_FUNDING_SOURCE'},
                item_list: {items: items}
            }
        ]
    }

    componentDidMount() {
        const setPaymentDetails = (json, access_token) => {
            this.executeURL = json.links[2].href // execute => store accept payment request
            this.access_token = access_token
            this.setState({
                url: json.links[1].href, //approval_url => user accept payment request
            })
        }
        PayPalAPI.startPaymentProcess(this.transactions, setPaymentDetails)
    }

    render() {
        return (
            <WebView
                style={{flex: 1}}
                source={{uri: this.state.url}}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                javaScriptEnabled={true}
                startInLoadingState={true}
            />
        )
    }

    _onNavigationStateChange(webViewState) {
        if (!this.shouldCheckURL) return // Prevent duplicate check after finished.
        const url = webViewState.url
        if (url.substring(0, RETURN_URL.length) == RETURN_URL) {
            this.shouldCheckURL = false

            let payer_id = ''
            for (let i = url.length - 1; url[i] !== '='; --i) {
                payer_id = url[i] + payer_id
            }

            PayPalAPI.executePayment(this.executeURL, payer_id, this.access_token, (json) => this.onPaymentComplete(json))
        } else if (url.substring(0, CANCEL_URL.length) == CANCEL_URL) {
            this.shouldCheckURL = false
            this.props.setPaymentStates(PAYMENT_CANCELED_CODE)
            this.props.closeModal()
        }
    }

    onPaymentComplete(json) {
        if (json.state == 'approved') {
            this.props.setPaymentStates(PAYMENT_APPROVED_CODE)
            this.props.closeModal()
        } else {
            console.log(JSON.stringify(json))
            throw 'FATAL ERROR: ORDER WERE PAID BUT PAYPAL RESPONSE DON\'T MATCH, CHECK LOGS FOR MORE DETAILS'
        }
    }

}
