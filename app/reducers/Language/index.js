/**
 * Created by Luan on 10/26/2016.
 */
import {SWITCH_LANGUAGE} from './actions'
import Languages from './../../Languages'

export default function Language(state = Languages.getLanguage(), action) {
    switch (action.type) {
        case SWITCH_LANGUAGE:
            return action.language
        default:
            return state
    }
}
