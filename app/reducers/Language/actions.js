/**
 * Created by Luan on 10/21/2016.
 */

export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE'

export function switchLanguage(language) {
    return {
        type: SWITCH_LANGUAGE,
        language: language,
    }
}
