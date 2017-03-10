/**
 * Created by Luan on 10/25/2016.
 */
import * as firebase from 'firebase'
import Constants from './../Constants'

const firebaseConfig = {
    apiKey: Constants.Firebase.apiKey,
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp