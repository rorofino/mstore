/**
 * Created by Luan on 10/21/2016.
 */

// import WooWorker from "../../services/WooWorker";

export const ADD_CART_ITEM = 'ADD_CART_ITEM'
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
export const EMPTY_CART = 'EMPTY_CART'

export function addCartItem(product, variation) {
    return {
        type: ADD_CART_ITEM,
        product: product,
        variation: variation,
    }
}

export function removeCartItem(product, variation) {
    return {
        type: REMOVE_CART_ITEM,
        product: product,
        variation: variation,
    }
}

export function deleteCartItem(product, variation, quantity) {
    return {
        type: DELETE_CART_ITEM,
        product: product,
        variation: variation,
        quantity: quantity,
    }
}

export function emptyCart() {
    return {
        type: EMPTY_CART
    }
}
