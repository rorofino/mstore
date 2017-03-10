'use strict'

import React, {Component} from 'react'
import {ListView, Text, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import Toolbar from './../../components/Toolbar'
import LogoSpinner from './../../components/LogoSpinner'
import Constants from './../../Constants'
import Languages from './../../Languages'
import {LanguageModal, AboutModal} from './Modals'

class Settings extends Component {
    constructor(props) {
        super(props)
        const open = (modal) => modal && modal.open()
        const settingsArray = [
            {section: Languages.BASICSETTINGS, name: Languages.Language, onPress: (refs) => open(refs.languageModal)},
            {section: Languages.INFO, name: Languages.About, onPress: (refs) => open(refs.AboutModal)},
        ]
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
        const convertArrayToMap = (array) => {
            let result = {} // Create the blank map
            array.forEach((item) => {
                if (!result[item.section]) result[item.section] = []
                result[item.section].push(item)
            })
            return result
        }
        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(convertArrayToMap(settingsArray))
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Constants.Color.DirtyBackground}}>
                <Toolbar {...this.props}/>
                {this.state.isLoading ? <LogoSpinner fullStretch/> :
                    <View style={{flex: 1}}>
                        {this.renderListView(this.state.dataSource)}
                    </View>}
                {LanguageModal()}
                {AboutModal()}
            </View>
        )
    }

    renderListView(dataSource) {
        const renderRow = (item) => {
            return (<TouchableOpacity onPress={() => item.onPress(this.refs)}>
                <View style={{
                    height: 50, backgroundColor: Constants.Color.Background,
                    justifyContent: 'space-between', alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <Text style={{marginLeft: 15,}}>{item.name}</Text>
                    <Icon name={Constants.Icon.Forward} size={25} style={{marginRight: 15,}}/>
                </View>
            </TouchableOpacity>)
        }

        const renderSectionHeader = (sectionData, section) => {
            return <Text style={{padding: 5, marginLeft: 10, fontSize: 12}}>{section}</Text>
        }

        const renderSeparator = (sectionID, rowID) => {
            return <View key={sectionID + rowID}
                         style={{
                             height: 1, width: null, borderTopColor: Constants.Color.DirtyBackground, borderTopWidth: 1
                         }}/>
        }

        return <ListView
            dataSource={dataSource}
            renderRow={renderRow}
            renderSectionHeader={renderSectionHeader}
            renderSeparator={renderSeparator}
        />

    }
}
const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
    }
}

export default connect(mapStateToProps)(Settings)
