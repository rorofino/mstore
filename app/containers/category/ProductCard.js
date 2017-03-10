/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component, PropTypes} from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
// import PureRenderMixin from 'react-addons-pure-render-mixin'

import Constants from './../../Constants'
import Rating from './../../components/Rating'
import {ProductViewMode} from '../../reducers/Product/actions'
const {LIST_VIEW} =  ProductViewMode

export default class ProductCard extends Component {
    constructor(props) {
        super(props)
        this.styles = {
            container: {
                height: undefined,
                borderColor: Constants.Color.ViewBorder,
                borderWidth: 1,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                paddingBottom: 5,
            },
            image: {
                marginBottom: 8,
            },
            price_wrapper: {
                flexDirection: 'row',
            },
            text: {
                color: 'black',
                marginBottom: 8,
            },
            sale_price: {
                textDecorationLine: 'line-through',
                color: Constants.Color.TextLight,
                marginLeft: 0,
                marginRight: 0
            },
            price: {
                fontWeight: '600',
                color: Constants.Color.ProductPrice,
            },
            sale_off: {
                color: Constants.Color.TextLight,
            }
        }
    }

    static propTypes = {
        viewMode: PropTypes.string.isRequired,
        product: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps) {
        return this.props.viewMode !== nextProps.viewMode
    }

    render() {
        const {viewMode, product, onPress} = this.props

        const isListMode = viewMode === LIST_VIEW
        this.styles = Object.assign({}, this.styles, {
            container: isListMode ? {
                ...this.styles.container,
                ...Constants.ProductCard.ListMode.container,
            } : {
                ...this.styles.container,
                ...Constants.ProductCard.GridMode.container,
            },
            image: isListMode ? {
                ...this.styles.image,
                ...Constants.ProductCard.ListMode.image,
            } : {
                ...this.styles.image,
                ...Constants.ProductCard.GridMode.image,
            },
            text: isListMode ? {
                ...this.styles.text,
                ...Constants.ProductCard.ListMode.text,
            } : {
                ...this.styles.text,
                ...Constants.ProductCard.GridMode.text,
            },
        })

        const productImage = (<Image
            source={{uri: Constants.WooImageFetcher(product.images[0].src, this.styles.image.width)}}
            style={this.styles.image}
            resizeMode="cover"
        />)

        const productRating = (<View style={this.styles.price_wrapper}>
            <Text style={{marginLeft: this.styles.text.marginLeft} }/>
            <Rating rating={Number(product.average_rating)} size={this.styles.text.fontSize + 4}/>
            <Text style={[this.styles.text, {color: Constants.Color.ViewBorder}]}>
                {'(' + product.rating_count + ')'}
            </Text>
        </View>)

        const productName = (<Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={this.styles.text}
        >
            {product.name}
        </Text>)

        const productPrice = (
            <View style={this.styles.price_wrapper}>
                <Text style={[this.styles.text, this.styles.price]}>
                    {Constants.Formatter.currency(product.price) }
                </Text>
                <Text style={[this.styles.text, this.styles.sale_price]}>
                    {product.on_sale ? Constants.Formatter.currency(product.regular_price) : ''}
                </Text>
                {!product.on_sale ? <View/> :
                    <Text style={[this.styles.text, this.styles.sale_off]}>
                        {'(' + ((1 - Number(product.price) / Number(product.regular_price)) * 100).toFixed(0) + '% off)' }
                    </Text>
                }
            </View>)

        return (
            <TouchableOpacity
                style={this.styles.container}
                onPress={() => onPress(product.id)}
            >
                {productImage}
                {productRating}
                {productName}
                {productPrice}
            </TouchableOpacity>
        )
    }
}