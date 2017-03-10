/**
 * Created by Luan on 10/28/2016.
 */
import React, {Component} from 'react'
import {Text, View, Image} from 'react-native'

import Constants from './../../Constants'
import Languages from './../../Languages'
import Button from './../../components/Button'

export default class ItemRow extends Component {
    constructor(props) {
        super(props)
        this.imageWidth = Constants.Dimension.ScreenWidth(0.25)
        this.styles = {
            container: {
                height: undefined,
                width: undefined,
                borderColor: Constants.Color.ViewBorder,
                borderWidth: 1,
                flexDirection: 'row',
                margin: 10,
                marginTop: 0,
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
            buttons_wrapper: {
                padding: 10,
                paddingTop: 5,
                paddingBottom: 5,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
            },
            itemWrapper: {
                justifyContent: 'center',
                padding: 0,
                marginLeft: 10,
            },
        }
    }

    render() {
        const _product = this.props.product
        const productImage = (
            <Image
                source={ _product.images[0] != undefined ? {uri: Constants.WooImageFetcher(_product.images[0].src, this.imageWidth)} : Constants.Image.PlaceHolder}
                style={this.styles.image}
                resizeMode="cover"
            />)

        const productName = (
            <Text
                ellipsizeMode={'tail'}
                numberOfLines={2}
                style={this.styles.product_name}
            >
                {_product.name}
            </Text>)

        return (
            <View style={this.styles.container}>
                {productImage}
                <View style={{flex: 1}}>
                    {productName}
                    {this.renderPriceGroup(_product)}
                    {this.renderButtonsGroup(_product)}
                </View>
            </View>
        )
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

    renderButtonsGroup(_product) {
        return (
            <View style={this.styles.buttons_wrapper}>
                <Button autoMargin={false}
                        onPress={() => this.props.onPress(_product.id)}
                        style={{
                            width: this.imageWidth,
                            height: 30,
                            marginTop: 0,
                            borderWidth: 0
                        }}>{Languages.Details}</Button>
            </View>
        )
    }
}

