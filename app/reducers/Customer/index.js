/**
 * Created by Luan on 10/26/2016.
 */
import {CUSTOMER_SIGN_IN, CUSTOMER_SIGN_OUT} from './actions'

export default function Customer(state = {}, action) {
    switch (action.type) {
        case CUSTOMER_SIGN_IN:
            return action.customer
        case CUSTOMER_SIGN_OUT:
            return {}
        default:
            return state
    }
}
