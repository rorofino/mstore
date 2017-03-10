/**
 * Created by Luan on 10/26/2016.
 */
import {SET_COUNTRIES} from './actions'

export default function Country(state = {}, action) {
    switch (action.type) {
        case SET_COUNTRIES:
            return action.countries
        default:
            return state
    }
}
