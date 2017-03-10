/**
 * Created by luanp on 22/09/2016.
 */
'use strict'

import React, {Component, PropTypes} from 'react'
import {Text, View, ScrollView, Image} from 'react-native'
import {Actions} from 'react-native-router-flux'
import TimerMixin from 'react-timer-mixin'
import {connect} from 'react-redux'
import Swiper from 'react-native-swiper'
import HTML from 'react-native-fence-html'

import ReviewTab from './ReviewTab'
import VariationsForm from './VariationsForm'

import Constants from './../../Constants'
import Languages from './../../Languages'
import Toolbar from './../../components/Toolbar'
import LogoSpinner from './../../components/LogoSpinner'
import Button from './../../components/Button'
import Rating from './../../components/Rating'
import {fetchProductById, clearProduct} from '../../reducers/Product/actions'
import {addCartItem} from '../../reducers/Cart/actions'
import {addWishListItem, removeWishListItem} from '../../reducers/WishList/actions'
import EventEmitter from './../../utils/AppEventEmitter'

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentVariation: undefined,       //current variation that match form input attributes
            isWaiting: true,
            currentPosition: 0,
        }
        this.styles = {
            container: {flex: 1},
            container_row: {
                flexDirection: 'row',
            },
            card: {
                backgroundColor: 'white',
                marginBottom: 8,
                padding: Constants.Dimension.ScreenWidth(0.05),
            },
            label: {
                color: Constants.Color.TextDark,
                fontSize: 20,
                fontWeight: 'bold',
            },
        }

        this.updatePrice = (props) => this.setState({price: props.price})
        this.swiperHeight = Constants.Dimension.ScreenWidth() * 1.2
        this.inCartTotal = 0
    }

    static propTypes = {
        fetchProductById: PropTypes.func.isRequired,
        clearProduct: PropTypes.func.isRequired,
        addCartItem: PropTypes.func.isRequired,
        addWishListItem: PropTypes.func.isRequired,

        productId: PropTypes.number.isRequired,
        product: PropTypes.object,
    };

    componentWillMount() {
        TimerMixin.setTimeout(() => this.props.fetchProductById(this.props.productId, () => this.setState({isWaiting: false})), 500,)
    }

    componentWillUnmount() {
        this.productChangePrice.remove()
    }

    componentDidMount() {
        this.productChangePrice = EventEmitter.addListener(Constants.EmitCode.ProductPriceChanged, this.updatePrice.bind(this))
    }

    componentWillReceiveProps(nextProps) {
        const {product} = nextProps
        if (product !== undefined) {
            this.setState({price: product.price})
        }
    }

    render() {
        if (this.state.isWaiting)
            return <LogoSpinner fullStretch/>

        this._product = this.props.product
        this.isInWishList = this.props.wishLists.find((item) => item.product.id == this._product.id) != undefined
        const index = this.props.Cart.cartItems.findIndex((item) => item.product.id == this._product.id)
        this.inCartTotal = index == -1 ? 0 : this.props.Cart.cartItems[index].quantity

        return (
            <View style={[this.styles.container, {backgroundColor: Constants.Color.DirtyBackground}]}>
                <Toolbar
                    {...this.props}
                    transparentMode={this.state.currentPosition < this.swiperHeight }
                />
                <ScrollView onScroll={(event) => this.setState({currentPosition: event.nativeEvent.contentOffset.y})}
                            showsVerticalScrollIndicator={false}
                            style={this.styles.container}>
                    {this.renderSwiper(this._product)}
                    <View style={this.styles.container}>
                        {this.renderTopInfo(this._product)}
                        {this.renderVariation(this._product)}
                        {this.renderDescription(this._product)}
                        {this.renderReviews(this._product)}
                    </View>
                </ScrollView>
                {this.renderButtonGroup()}
            </View>
        )
    }

    renderSwiper(_product) {
        return <Swiper
            height={this.swiperHeight}
            dot={<View style={Constants.Swiper.swiper_dot}/>}
            activeDot={<View style={Constants.Swiper.swiper_active_dot}/>}
            paginationStyle={{bottom: 20}}>
            {_product.images.map((image, index) =>
                <Image
                    key={index}
                    source={{uri: image.src}}
                    resizeMode='cover'
                    style={{flex: 1,}}
                />, this)}
        </Swiper>
    }

    renderTopInfo(_product) {
        const styles = {
            name: {
                color: Constants.Color.TextDark,
                fontSize: 26,
                margin: 5,
                marginBottom: 0,
                textAlign: 'center'
            },
            price: {
                color: Constants.Color.ProductPrice,
                fontSize: 18,
                fontWeight: 'bold',
                margin: 5,
                marginRight: 0,
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
        return (<View style={this.styles.card}>
            <Text style={styles.name}> {_product.name}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.price}>
                        {Constants.Formatter.currency(_product.price) }
                    </Text>
                    <Text style={[styles.price, styles.sale_price]}>
                        {_product.on_sale ? Constants.Formatter.currency(_product.regular_price) : ''}
                    </Text>
                    {!_product.on_sale ? <View/> :
                        <Text style={[styles.price, styles.sale_off]}>
                            {'(' + ((1 - Number(_product.price) / Number(_product.regular_price)) * 100).toFixed(0) + '% off)' }
                        </Text>
                    }
                </View>
                <View style={this.styles.container_row}>
                    <Text style={{marginLeft: 10} }/>
                    <Rating rating={Number(_product.average_rating)} size={25}/>
                    <Text style={{color: Constants.Color.ViewBorder, fontSize: 18, marginLeft: 5,}}>
                        {'(' + _product.rating_count + ')'}
                    </Text>
                </View>
            </View>
        </View>)
    }

    renderVariation(_product) {
        return (
            <View style={this.styles.card}>
                <Text style={this.styles.label}>
                    {Languages.ProductVariations}
                </Text>
                <VariationsForm
                    ref={'form'}
                    attributes={_product.attributes}
                    variations={_product.variations}
                    updateVariation={(variation) => this.setState({currentVariation: variation})}
                    defaultVariation={_product.default_attributes.length == 1
                        ? _product.default_attributes[0]
                        : {}
                    }
                />
            </View >
        )
    }

    renderDescription(_product) {
        const styles = {

            text: {
                color: Constants.Color.TextDark,
                fontSize: 14,
            },
            attribute_container: {
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: Constants.Color.ViewBorder,
            },
            attribute_left: {
                flex: 3,
                borderRightWidth: 1,
                borderColor: Constants.Color.ViewBorder,
                backgroundColor: '#F8F8F8',
            },
            attribute_right: {
                flex: 7,
            },
            attribute_name: {
                color: Constants.Color.TextDark,
                fontSize: 14,
                fontWeight: 'bold',
                margin: 10
            },
            attribute_options: {
                fontSize: 14,
                margin: 10,
            },
        }
        return (
            <View style={this.styles.card}>
                <Text style={[this.styles.label, {marginBottom: -10,}]}>
                    {Languages.AdditionalInformation}
                </Text>
                {_product.description == '' ?
                    <Text style={styles.text}>
                        {Languages.NoProductDescription}
                    </Text> :
                    <View style={{margin: 10}}>
                        <HTML html={_product.description}/>
                    </View>
                }
            </View>
        )
    }

    renderReviews(_product) {
        return (
            <View style={this.styles.card}>
                <Text style={this.styles.label}>
                    {Languages.ProductReviews + ' (' + _product.rating_count + ')'}
                </Text>
                <ReviewTab product={_product}/>
            </View >
        )
    }

    renderButtonGroup() {
        const noMargin = {
            margin: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
        }
        const opAddToCart = (go = false) => {
            if (this.inCartTotal < 5) {
                let _product = this.props.product
                let _variation = this.state.currentVariation

                // if product have variations and if current variation is not found
                if (_product.variations.length > 0) {
                    this.refs.form.onPress()
                    if (!_variation) return
                }
                this.props.addCartItem(_product, _variation)
            } else
                alert(Languages.ProductLimitWaring)

            if (go) Actions.cart()
        }

        const opAddToWishlist = () => {
            let _product = this.props.product
            let _variation = this.state.currentVariation

            // if product have variations and if current variation is not found
            if (_product.variations.length > 0) {
                this.refs.form.onPress()
                if (!_variation) return
            }
            if (this.isInWishList) {
                this.props.removeWishListItem(_product, _variation)
            } else
                this.props.addWishListItem(_product, _variation)

        }
        return (<View style={{flexDirection: 'row'}}>
            <Button autoWidth={false}
                    onPress={() => opAddToCart(true)}
                    borderLess
                    style={[noMargin, {flex: 4}]}>
                {Languages.BUYNOW}
            </Button>
            <Button autoWidth={false}
                    onPress={() => opAddToCart()}
                    borderLess
                    overlayColor={Constants.Color.BuyNowButton}
                    iconName={this.inCartTotal == 0 ? Constants.Icon.ShoppingCartEmpty : Constants.Icon.AddToCart}
                    style={[noMargin, {flex: 1}]}/>
            <Button autoWidth={false}
                    onPress={() => opAddToWishlist()}
                    borderLess
                    overlayColor={Constants.Color.BuyNowButton}
                    iconName={this.isInWishList ? Constants.Icon.Wishlist : Constants.Icon.WishlistEmpty}
                    style={[noMargin, {flex: 1}]}/>
        </View>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentProduct: state.Product.currentProduct,
        product: state.Product.currentProduct.product,
        Cart: state.Cart,
        wishLists: state.WishList.wishListItems,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCartItem: (product, variation) => {
            dispatch(addCartItem(product, variation))
        },
        addWishListItem: (product, variation) => {
            dispatch(addWishListItem(product, variation))
        },
        removeWishListItem: (product, variation) => {
            dispatch(removeWishListItem(product, variation))
        },
        fetchProductById: (productId, callback) => {
            dispatch(fetchProductById(productId, callback))
        },
        clearProduct: () => dispatch(clearProduct()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
