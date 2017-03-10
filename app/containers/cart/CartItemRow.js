/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component, PropTypes} from 'react'
import {Alert, Text, View, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'

import Constants from './../../Constants'
import Languages from './../../Languages'
import {addCartItem, removeCartItem, deleteCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'

class CartItemRow extends Component {
    constructor(props) {
        super(props)
        this.styles = {
            container: {
                height: undefined,
                width: undefined,
                borderColor: Constants.Color.ViewBorder,
                borderWidth: 1,
                flexDirection: 'row',
                marginTop: 10,
            },
            image: {
                width: Constants.Dimension.ScreenWidth(0.3),
                height: Constants.Dimension.ScreenWidth(0.3) * 1.2,
            },
            product_name: {
                padding: 10,
                paddingTop: 5,
                paddingBottom: 5,
                height: undefined,
                justifyContent: 'flex-start',
            },
            product_price: {
                padding: 10,
                paddingTop: 0,
                paddingBottom: 0,
                flex: 1,
                justifyContent: 'flex-start',
            },
            product_variation: {
                padding: 10,
                paddingTop: 5,
                paddingBottom: 5,
                flex: 1,
                justifyContent: 'center',
            },
            buttons_wrapper: {
                padding: 10,
                paddingTop: 5,
                paddingBottom: 5,
                flex: 1,
                justifyContent: 'flex-end',
            },
            itemWrapper: {
                justifyContent: 'center',
                padding: 0,
                marginLeft: 10,
            },
        }
    }

    static propTypes = {
        wishLists: PropTypes.array.isRequired,
        cartItem: PropTypes.object.isRequired,
        addCartItem: PropTypes.func.isRequired,
        addWishListItem: PropTypes.func.isRequired,
        removeWishListItem: PropTypes.func.isRequired,
        removeCartItem: PropTypes.func.isRequired,
        deleteCartItem: PropTypes.func.isRequired,
    };

    // shouldComponentUpdate(nextProps) {
    //     const {cartItem, wishLists} = this.props
    //     return cartItem !== nextProps.cartItem || wishLists.length !== nextProps.wishLists.length
    // }

    render() {
        const {cartItem, wishLists} = this.props

        const _product = cartItem.product
        const _variation = cartItem.variation

        this.isInWishList = wishLists.find((item) => item.product.id == _product.id) != undefined

        const productImage = (<Image
            source={_product.images[0] != undefined ? {uri: Constants.WooImageFetcher(_product.images[0].src, this.styles.image.width)} : Constants.Image.PlaceHolder}
            style={this.styles.image}
            resizeMode="cover"
        />)
        const productName = (<Text
            ellipsizeMode={'tail'}
            numberOfLines={2}
            style={this.styles.product_name}
        >
            {_product.name}
        </Text>)
        const productVariations = (<Text
            ellipsizeMode={'tail'}
            numberOfLines={2}
            style={this.styles.product_name}
        >
            {this.renderAttributeOptions(_variation)}
        </Text>)

        return (
            <View style={this.styles.container}>
                {productImage}
                <View style={{flex: 1}}>
                    {productName}
                    {this.renderPriceGroup(_variation == undefined ? _product : _variation)}
                    {productVariations}
                    {this.renderButtonsGroup()}
                </View>
            </View>
        )
    }

    renderAttributeOptions(_variation) {
        let result = ''
        if (_variation !== undefined)
            _variation.attributes.forEach((attribute) => result += attribute.name + ': ' + attribute.option + ' ', this)
        return result
    }

    renderPriceGroup(_product) {
        const styles = {
            row: {
                flexDirection: 'row',
            },
            price: {
                color: Constants.Color.ProductPrice,
                fontSize: 14,
                fontWeight: 'bold',
                marginRight: 5,
            },
            sale_price: {
                textDecorationLine: 'line-through',
                color: Constants.Color.TextLight,
                fontWeight: 'normal',
            },
            sale_off: {
                color: Constants.Color.TextLight,
                fontWeight: 'normal',
            }
        }

        return (<View style={this.styles.product_price}>
            <View style={styles.row}>
                <Text style={[styles.price]}>
                    {Constants.Formatter.currency(_product.price) }
                </Text>
                <Text style={[styles.price, styles.sale_price]}>
                    {_product.on_sale ? Constants.Formatter.currency(_product.regular_price) : ''}
                </Text>
                {_product.on_sale ?
                    <Text style={[styles.price, styles.sale_off]}>
                        {'(-' + ((1 - Number(_product.price) / Number(_product.regular_price)) * 100).toFixed(0) + '%)' }
                    </Text> : <View/>
                }</View>
        </View>)
    }

    renderButtonsGroup() {
        const styles = {
            row: {
                flexDirection: 'row',
            },
            row_between: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            buttonLeft: {
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: Constants.Color.ViewBorder,
                borderWidth: 1,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
            },
            buttonMiddle: {
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: Constants.Color.ViewBorder,
                borderBottomWidth: 1,
                borderTopWidth: 1,
            },
            buttonRight: {
                justifyContent: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: Constants.Color.ViewBorder,
                borderWidth: 1,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
            },
            buttonWishList: {},
            buttonDelete: {},
        }

        const {cartItem, removeWishListItem, addWishListItem, addCartItem, deleteCartItem, removeCartItem} =  this.props
        const {product, variation, quantity} =  cartItem
        const hitBottomLimit = quantity == 1
        const hitTopLimit = quantity == 5

        const pnPressWishList = () => {
            if (this.isInWishList)
                removeWishListItem(product, variation)
            else
                addWishListItem(product, variation)
        }
        const onPressDelete = () => {
            Alert.alert(
                Languages.Confirm,
                Languages.RemoveCartItemConfirm,
                [
                    {text: Languages.CANCEL, onPress: () => undefined},
                    {text: Languages.YES, onPress: () => deleteCartItem(product, variation, quantity)},
                ]
            )
        }
        return (<View style={this.styles.buttons_wrapper}>
            <View style={styles.row_between}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.buttonLeft}
                        onPress={() => {
                            if (!hitBottomLimit) removeCartItem(product, variation)
                        }}>
                        <Text style={{
                            color: hitBottomLimit ?
                                Constants.Color.DirtyBackground :
                                Constants.Color.TextLight
                        }}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonMiddle}>
                        <Text>{quantity}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonRight}
                        onPress={() => {
                            if (!hitTopLimit) addCartItem(product, variation)
                        }}>
                        <Text
                            style={{color: hitTopLimit ? Constants.Color.DirtyBackground : Constants.Color.TextLight}}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {this.renderIconButton(this.isInWishList ? Constants.Icon.Wishlist : Constants.Icon.WishlistEmpty, pnPressWishList)}
                    {this.renderIconButton(Constants.Icon.Delete, onPressDelete)}
                </View>
            </View>
        </View>)
    }

    renderIconButton(icon, callback) {
        return (
            <TouchableOpacity onPress={callback} style={this.styles.itemWrapper}>
                <Icon name={icon} size={25}
                      color={Constants.Color.ViewBorder}/>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.Cart,
        wishLists: state.WishList.wishListItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCartItem: (product, variation) => {
            dispatch(addCartItem(product, variation))
        },
        removeCartItem: (product, variation) => {
            dispatch(removeCartItem(product, variation))
        },
        deleteCartItem: (product, variation, quantity) => {
            dispatch(deleteCartItem(product, variation, quantity))
        },
        addWishListItem: (product, variation) => {
            dispatch(addWishListItem(product, variation))
        },
        removeWishListItem: (product, variation) => {
            dispatch(removeWishListItem(product, variation))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemRow)
