/**
 * Created by Luan on 10/21/2016.
 */

export const ADD_WISHLIST_ITEM = 'ADD_WISHLIST_ITEM'
export const REMOVE_WISHLIST_ITEM = 'REMOVE_WISHLIST_ITEM'
export const EMPTY_WISHLIST = 'EMPTY_WISHLIST'

export function addWishListItem(product, variation) {
    return {
        type: ADD_WISHLIST_ITEM,
        product: product,
        variation: variation,
    }
}

export function removeWishListItem(product, variation) {
    return {
        type: REMOVE_WISHLIST_ITEM,
        product: product,
        variation: variation,
    }
}

export function emptyWishList() {
    return {
        type: EMPTY_WISHLIST
    }
}
