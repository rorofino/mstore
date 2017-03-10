/**
 * Created by Luan on 10/21/2016.
 */

export const CUSTOMER_SIGN_IN = 'CUSTOMER_SIGN_IN'
export const CUSTOMER_SIGN_OUT = 'CUSTOMER_SIGN_OUT'

export function signIn(customer) {
    return {
        type: CUSTOMER_SIGN_IN,
        customer: customer,
    }
}

export function signOut() {
    return {
        type: CUSTOMER_SIGN_OUT,
    }
}
