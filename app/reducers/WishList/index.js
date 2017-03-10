/**
 * Created by Luan on 10/26/2016.
 */
import {ADD_WISHLIST_ITEM, REMOVE_WISHLIST_ITEM, EMPTY_WISHLIST} from './actions'

const compareWishListItem = (wishListItem, action) => {
    if (wishListItem.variation !== undefined && action.variation !== undefined)
        return wishListItem.product.id === action.product.id && wishListItem.variation.id === action.variation.id
    else
        return wishListItem.product.id === action.product.id
}


const wishListItem = (state = {product: undefined, variation: undefined}, action) => {
    switch (action.type) {
        case ADD_WISHLIST_ITEM:
            return Object.assign({}, state, {product: action.product, variation: action.variation})
        default:
            return state
    }
}

export default function WishList(state = {wishListItems: [], total: 0, totalPrice: 0}, action) {
    switch (action.type) {
        case ADD_WISHLIST_ITEM: {
            const isExisted = state.wishListItems.some((wishListItem) => compareWishListItem(wishListItem, action))
            return isExisted ? state : Object.assign({}, state,
                {
                    wishListItems: [...state.wishListItems, wishListItem(undefined, action)],
                    total: state.total + 1,
                },
            )
        }
        case REMOVE_WISHLIST_ITEM: {
            const index1 = state.wishListItems.findIndex((wishListItem) => compareWishListItem(wishListItem, action)) // check if existed
            return index1 == -1 ? state : //This should not happen, but catch anyway
                Object.assign({}, state, {
                    wishListItems: state.wishListItems.filter((wishListItem) => !compareWishListItem(wishListItem, action)),
                    total: state.total - 1,
                })
        }
        case EMPTY_WISHLIST:
            return Object.assign({}, state, {
                wishListItems: [],
                total: 0,
            })
        default:
            return state
    }
}
