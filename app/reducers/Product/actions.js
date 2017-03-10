/**
 * Created by Luan on 10/21/2016.
 */

import WooWorker from './../../services/WooWorker'

export const TOGGLE_PRODUCT_VIEW_MODE = 'TOGGLE_PRODUCT_VIEW_MODE'

export const REQUEST_PRODUCT = 'REQUEST_PRODUCT'
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT'
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE'
export const CLEAR_PRODUCT = 'CLEAR_PRODUCT'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE'
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'

export const ProductViewMode = {
    LIST_VIEW: 'LIST_VIEW',
    GRID_VIEW: 'GRID_VIEW',
}

export function toggleProductViewMode() {
    return {type: TOGGLE_PRODUCT_VIEW_MODE}
}

export function requestProduct() {
    return {
        type: REQUEST_PRODUCT,
    }
}

export function receiveProduct(json) {
    return {
        type: RECEIVE_PRODUCT,
        product: json,
    }
}

export function productFailure(error) {
    return {
        type: PRODUCT_FAILURE,
        error: error,
    }
}

export function clearProduct() {
    return {type: CLEAR_PRODUCT}
}

export function requestProducts() {
    return {
        type: REQUEST_PRODUCTS,
    }
}

export function receiveProducts(json) {
    return {
        type: RECEIVE_PRODUCTS,
        products: json,
    }
}

export function productsFailure(error) {
    return {
        type: PRODUCTS_FAILURE,
        error: error,
    }
}

export function clearProducts() {
    return {type: CLEAR_PRODUCTS}
}

export function fetchProductById(productId, _callback) {
    return (dispatch) => {
        dispatch(requestProduct())
        const callback = (json) => {
            dispatch(receiveProduct(json))
            _callback()
        }
        const error = (error) => dispatch(productFailure(error))
        return WooWorker.productById(callback, error, productId)
    }
}

export function fetchProductsByCategoryId(categoryId, per_page, page) {
    return (dispatch) => {
        dispatch(requestProducts())
        const callback = (json) => dispatch(receiveProducts(json))
        const error = (error) => dispatch(productsFailure(error))
        return WooWorker.productsByCategoryId(callback, error, categoryId, per_page, page)
    }
}
