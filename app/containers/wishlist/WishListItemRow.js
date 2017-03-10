/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component, PropTypes} from 'react'
import {Alert, Text, View, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'

import Constants from './../../Constants'
import Languages from './../../Languages'
import Button from './../../components/Button'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import {addCartItem} from '../../reducers/Cart/actions'

class WishListItemRow extends Component {
    constructor(props) {
        super(props)
        this.imageWidth = Constants.Dimension.ScreenWidth(0.3)
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
                width: this.imageWidth,
                height: this.imageWidth * 1.2,
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
        wishListItem: PropTypes.object.isRequired,
        addWishListItem: PropTypes.func,
    };

    // shouldComponentUpdate(nextProps) {
    //     const {wishListItem} = this.props
    //     return wishListItem !== nextProps.wishListItem
    // }

    render() {
        const _product = this.props.wishListItem.product
        const _variation = this.props.wishListItem.variation

        const index = this.props.Cart.cartItems.findIndex((item) => item.product.id == _product.id)
        this.inCartTotal = index == -1 ? 0 : this.props.Cart.cartItems[index].quantity

        const productImage = (<Image
            source={ _product.images[0] != undefined ? {uri: Constants.WooImageFetcher(_product.images[0].src, this.imageWidth)} : Constants.Image.PlaceHolder}
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
            {this.renderAttributeOptions(this.props.wishListItem.variation)}
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
        let s = ''
        if (_variation !== undefined)
            _variation.attributes.forEach((attribute) => {
                s += attribute.name + ': ' + attribute.option + ' '
            }, this)
        return s
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
            row_end: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
        }

        const onPressBuyNow = () => {
            if (this.inCartTotal < 5)
                this.props.addCartItem(product, variation)
            else
                alert(Languages.ProductLimitWaring)
        }

        const onPressDelete = () => {
            Alert.alert(
                Languages.Confirm,
                Languages.RemoveWishListItemConfirm,
                [
                    {text: Languages.CANCEL, onPress: () => undefined},
                    {text: Languages.YES, onPress: () => this.props.removeWishListItem(product, variation)},
                ]
            )
        }

        const {product, variation} =  this.props.wishListItem
        return (<View style={this.styles.buttons_wrapper}>
            <View style={styles.row_end}>
                <Button autoMargin={false}
                        onPress={onPressBuyNow}
                        style={{
                            width: this.imageWidth,
                            height: 30,
                            marginTop: 0,
                            borderWidth: 0
                        }}>{Languages.BUYNOW}</Button>

                {this.renderIconButton(Constants.Icon.Delete, onPressDelete)}
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
        WishList: state.WishList,
        Cart: state.Cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addWishListItem: (product, variation) => {
            dispatch(addWishListItem(product, variation))
        },
        removeWishListItem: (product, variation) => {
            dispatch(removeWishListItem(product, variation))
        },
        addCartItem: (product, variation) => {
            dispatch(addCartItem(product, variation))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListItemRow)
