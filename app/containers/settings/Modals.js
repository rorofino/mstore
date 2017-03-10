/**
 * Created by Luan on 11/23/2016.
 */
import React from 'react'
import {Text, View} from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/Ionicons'

import Constants from './../../Constants'
import Languages from './../../Languages'
import LanguagePicker from './LanguagePicker'
export const baseModalConfig = {
    backButtonClose: true,
    swipeToClose: false,
    backdropOpacity: 0.7,
    style: {
        height: undefined,
        padding: 20,
        width: Constants.Dimension.ScreenWidth(0.9),
        justifyContent: 'center', alignItems: 'center'
    }
}

export function LanguageModal() {
    return (
        <Modal ref='languageModal' {...baseModalConfig}>
            <LanguagePicker/>
        </Modal>
    )
}

export function AboutModal() {
    const size = 15
    return (
        <Modal ref='AboutModal' {...baseModalConfig}>
            <View style={{width: null}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'left'}}>{Languages.AppName}</Text>
                <Text style={{fontSize: size}}>{Languages.AppDescription}</Text>
                <Icon name={Constants.Icon.Home} size={size}><Text>{Languages.AppContact}</Text></Icon>
                <Icon name={Constants.Icon.Mail} size={size}><Text>{Languages.AppEmail}</Text></Icon>
                <Text style={{fontSize: size}}>{Languages.AppCopyRights}</Text>
            </View>
        </Modal>
    )
}