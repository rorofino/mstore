/**
 * Created by Luan on 10/21/2016.
 */
import {
    TOGGLE_PRODUCT_VIEW_MODE,
    REQUEST_PRODUCT,
    RECEIVE_PRODUCT,
    PRODUCT_FAILURE,
    CLEAR_PRODUCT,
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    PRODUCTS_FAILURE,
    CLEAR_PRODUCTS,
    ProductViewMode
} from './actions'

const {LIST_VIEW, GRID_VIEW} = ProductViewMode

function productsReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: false,
                products: [
                    ...state.products,
                    ...action.products
                ],
                stillFetch: action.products.length !== 0,
            })
        case PRODUCTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            })
        case CLEAR_PRODUCTS:
            return Object.assign({}, state, {
                stillFetch: true,
                products: [],
            })
        default:
            return state
    }
}

function productReducer(state = {isFetching: false, product: undefined}, action) {
    switch (action.type) {
        case REQUEST_PRODUCT:
            return state
        case RECEIVE_PRODUCT:
            return Object.assign({}, state, {product: action.product})
        case PRODUCT_FAILURE:
            return Object.assign({}, state, {error: action.error})
        case CLEAR_PRODUCT:
            return Object.assign({}, state, {products: undefined})
        default:
            return state
    }
}

function viewMode(state = LIST_VIEW, action) {
    switch (action.type) {
        case TOGGLE_PRODUCT_VIEW_MODE:
            return state == LIST_VIEW ? GRID_VIEW : LIST_VIEW
        default:
            return state
    }
}

export default function Product(state = {isFetching: false, products: [], stillFetch: true,}, action) {
    return {
        ...productsReducer(state, action),
        currentProduct: productReducer(state.currentProduct, action),
        viewMode: viewMode(state.viewMode, action)
    }
}