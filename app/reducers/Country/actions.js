/**
 * Created by Luan on 10/21/2016.
 */

export const SET_COUNTRIES = 'SET_COUNTRIES'

export function setCountries(countries) {
    return {
        type: SET_COUNTRIES,
        countries: countries,
    }
}
