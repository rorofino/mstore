'use strict'

import WooCommerceAPI from './WooCommerceAPI'
import Constants from './../Constants'

const Api = new WooCommerceAPI({
    url: Constants.WooCommerce.url,
    consumerKey: Constants.WooCommerce.consumerKey,
    consumerSecret: Constants.WooCommerce.consumerSecret,
    wp_api: Constants.WooCommerce.wp_api,
    version: Constants.WooCommerce.version,
    timeout: Constants.WooCommerce.timeout
})

export const OrderStatus = {
    pending: 'pending',
    processing: 'processing',
    onHold: 'on-hold',
    completed: 'completed',
    cancelled: 'cancelled',
    refunded: 'refunded',
    failed: 'failed'
}

const WooWorker = {
    customerByEmail: (email, callback, callback2) => {
        Api.get('customers', {email: email}).then((responseData) => {
            if (responseData.length != 0)
                callback(responseData[0])
            else {
                callback2()
            }
        }).catch((error) => console.log(error))
    },
    customerById: (id, callback) => {
        Api.get('customers/' + id).then((responseData) => {
            if (responseData.message === undefined)
                callback(responseData)
            else
                console.log(JSON.stringify(responseData.message))
        }).catch((error) => console.log(error))
    },
    createCustomer: (data, callback, callback2) => {
        console.log('CREATE CUSTOMER')
        Api.post('customers', data).then((responseData) => {
            if (responseData.code === undefined)
                callback(responseData)
            else {
                callback2()
                console.log(JSON.stringify(responseData))
            }
        }).catch((error) => console.log(error))
    },
    categories: (callback, error = (e) => console.log(e)) => {
        Api.get('products/categories', {
            hide_empty: true,
            per_page: 100,
            order: 'desc',
            orderby: 'count'
        }).then((json) => {
            if (json.message === undefined)
                callback(json)
            else
                error(JSON.stringify(json.message))
        }).catch(error)
    },
    productById: (callback, error = (e) => console.log(e), id) => {
        Api.get('products/' + id).then((json) => {
            if (json.message === undefined)
                callback(json)
            else
                error(JSON.stringify(json.message))
        }).catch(error)
    },
    productsByCategoryId: (callback, error = (e) => console.log(e), id, per_page, page) => {
        Api.get('products', {category: id, per_page: per_page, page: page}).then((json) => {
            if (json.message === undefined)
                callback(json)
            else
                error(JSON.stringify(json.message))
        }).catch(error)
    },
    productsByName: (callback, error = (e) => console.log(e), name, per_page, page) => {
        Api.get('products', {search: name, per_page: per_page, page: page}).then((json) => {
            if (json.message === undefined)
                callback(json)
            else
                error(JSON.stringify(json.message))
        }).catch(error)
    },
    reviewByProductId: (id, callback) => {
        Api.get('products/' + id + '/reviews').then((responseData) => {
            if (responseData.message === undefined)
                callback(responseData)
            else
                console.log(JSON.stringify(responseData.message))
        }).catch((error) => console.log(error))
    },
    createOrder: (data, callback) => {
        console.log('CREATE ORDER')
        Api.post('orders', data).then((json) => {
            if (json.code === undefined)
                callback(json)
            else {
                alert(JSON.stringify(json.code))
                console.log(JSON.stringify(json))
            }
        }).catch((error) => console.log(error))
    },
    setOrderStatus: (orderId, status, callback) => {
        console.log('TRYING TO SET ORDER ' + orderId + ' TO ' + status.toUpperCase())
        Api.post('orders/' + orderId, {status: status}).then((json) => {
            if (json.code === undefined)
                callback(json)
            else {
                alert(JSON.stringify(json.code))
                console.log(JSON.stringify(json))
            }
        }).catch((error) => console.log(error))
    },
    ordersByCustomerId: (id, callback) => {
        Api.get('orders', {customer: id}).then((responseData) => {
            if (responseData.message === undefined)
                callback(responseData)
            else
                console.log(JSON.stringify(responseData.message))
        }).catch((error) => console.log(error))
    },
}

export default WooWorker