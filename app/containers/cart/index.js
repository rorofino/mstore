/**
 * Created by luanp on 22/09/2016.
 */
'use strict'

import React, {Component, PropTypes} from 'react'
import {Text, View, ListView} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'

import CartItemRow from './CartItemRow'
import Constants from './../../Constants'
import Languages from './../../Languages'
import Toolbar from './../../components/Toolbar'
import Button from './../../components/Button'

class Cart extends Component {
    constructor(props) {
        super(props)
        this.styles = {
            container: {flex: 1},
            container_total: {
                flexDirection: 'row',
                paddingTop: 10,
                borderTopWidth: 1,
                borderTopColor: Constants.Color.ViewBorder,
            },
            totalText: {
                flex: 1,
                color: Constants.Color.TextLight,
                fontSize: 16,
                fontWeight: 'bold',
            },
            totalPrice: {
                flex: 1,
                color: Constants.Color.ProductPrice,
                alignItems: 'center',
                textAlign: 'right',
                fontWeight: 'bold',
                marginRight: 5,
            }
        }

        this.opCheckOut = () => {
            if (this.props.Cart.cartItems.length === 0) alert(Languages.EmptyCheckout)
            else Actions.checkout()
        }
    }

    static propTypes = {
        Cart: PropTypes.object.isRequired,
    };

    render() {
        return (
            <View style={this.styles.container}>
                <Toolbar {...this.props}/>
                <View style={{
                    flex: 1,
                    width: Constants.Dimension.ScreenWidth(0.9),
                    marginLeft: Constants.Dimension.ScreenWidth(0.05)
                }}>
                    {this.props.Cart.cartItems.length == 0 ?
                        this.renderError(Languages.NoCartItem) :
                        this.renderCartItems(this.props.Cart.cartItems)}
                    <View style={this.styles.container_total}>
                        <Text style={this.styles.totalText}>{Languages.Total}</Text>
                        <Text style={ this.styles.totalPrice}>
                            {Constants.Formatter.currency(this.props.Cart.totalPrice) }
                        </Text>
                    </View>
                    <Button
                        onPress={this.opCheckOut.bind(this)}
                        autoMargin={false}
                        style={{marginBottom: Constants.Dimension.ScreenWidth(0.05)}}
                        borderLess
                    >
                        {Languages.Checkout}
                    </Button>
                </View>
            </View>
        )
    }

    renderError(error) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>{error}</Text>
        </View>
    }

    renderCartItems(data) {
        const dataSource = new ListView.DataSource({rowHasChanged: () => true})

        const renderRow = (cartItem) => <CartItemRow cartItem={cartItem}/>

        return <ListView
            dataSource={dataSource.cloneWithRows(data)}
            renderRow={renderRow}
            enableEmptySections={true}
        />
    }
}

const mapStateToProps = (store) => {
    return {
        Cart: store.Cart,
    }
}

export default connect(mapStateToProps)(Cart)
