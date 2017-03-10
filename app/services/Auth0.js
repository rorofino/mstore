/**
 * Created by Luan on 11/7/2016.
 */
import Auth0Lock from 'react-native-lock'
import Constants from './../Constants'

export const LOCK_OPTIONS = {
    closable: true,
    disableSignUp: true,
    disableResetPassword: true,
}

const Lock = new Auth0Lock({
    clientId: Constants.Auth0.clientId,
    domain: Constants.Auth0.domain,
})

export default Lock