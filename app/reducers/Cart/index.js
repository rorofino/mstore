/**
 * Created by Luan on 10/26/2016.
 */
import {ADD_CART_ITEM, REMOVE_CART_ITEM, DELETE_CART_ITEM, EMPTY_CART} from './actions'


const compareCartItem = (cartItem, action) => {
    if (cartItem.variation !== undefined && action.variation !== undefined)
        return cartItem.product.id === action.product.id && cartItem.variation.id === action.variation.id
    else
        return cartItem.product.id === action.product.id
}


const cartItem = (state = {product: undefined, quantity: 1, variation: undefined}, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            return state.product === undefined ?
                Object.assign({}, state, {product: action.product, variation: action.variation}) :
                !compareCartItem(state, action) ? state :
                    Object.assign({}, state, {
                        quantity: state.quantity < 5 ? state.quantity + 1 : state.quantity
                    })
        case REMOVE_CART_ITEM:
            return !compareCartItem(state, action) ? state :
                Object.assign({}, state, {quantity: state.quantity - 1})
        default:
            return state
    }
}

export default function Cart(state = {cartItems: [], total: 0, totalPrice: 0}, action) {
    switch (action.type) {
        case ADD_CART_ITEM: {
            const isExisted = state.cartItems.some((cartItem) => compareCartItem(cartItem, action))
            return Object.assign({}, state, isExisted ?
                    {cartItems: state.cartItems.map(item => cartItem(item, action))} :
                    {cartItems: [...state.cartItems, cartItem(undefined, action)]},
                {
                    total: state.total + 1,
                    totalPrice: state.totalPrice + Number(action.variation === undefined ? action.product.price : action.variation.price)
                }
            )
        }
        case REMOVE_CART_ITEM: {
            const index = state.cartItems.findIndex((cartItem) => compareCartItem(cartItem, action)) // check if existed
            return index == -1 ? state : //This should not happen, but catch anyway
                Object.assign({}, state, state.cartItems[index].quantity == 1 ?
                        {cartItems: state.cartItems.filter((cartItem) => !compareCartItem(cartItem, action))} :
                        {cartItems: state.cartItems.map(item => cartItem(item, action))},
                    {
                        total: state.total - 1,
                        totalPrice: state.totalPrice - Number(action.variation === undefined ? action.product.price : action.variation.price)
                    }
                )
        }
        case DELETE_CART_ITEM: {
            const index1 = state.cartItems.findIndex((cartItem) => compareCartItem(cartItem, action)) // check if existed
            return index1 == -1 ? state : //This should not happen, but catch anyway
                Object.assign({}, state, {
                    cartItems: state.cartItems.filter((cartItem) => !compareCartItem(cartItem, action)),
                    total: state.total - Number(action.quantity),
                    totalPrice: state.totalPrice - (Number(action.quantity) * Number(action.variation === undefined ? action.product.price : action.variation.price))
                })
        }
        case EMPTY_CART:
            return Object.assign({}, state, {
                cartItems: [],
                total: 0,
                totalPrice: 0,
            })
        default:
            return state
    }
}
