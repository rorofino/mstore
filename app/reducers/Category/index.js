/**
 * Created by Luan on 10/26/2016.
 */
import {SELECT_CATEGORY, REQUEST_CATEGORIES, RECEIVE_CATEGORIES, CATEGORIES_FAILURE} from './actions'

function categoryReducer(state = {}, action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return Object.assign({}, state, {
                selectedCategoryId: action.selectedCategoryId,
                selectedCategoryName: action.selectedCategoryName
            })
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                categories: [
                    ...state.categories,
                    ...action.categories
                ]
            })
        case CATEGORIES_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            })
        default:
            return state
    }
}

export default function Category(state = {
    isFetching: false,
    categories: [],
    selectedCategoryId: undefined,
    selectedCategoryName: ''
}, action) {
    return categoryReducer(state, action)
}
