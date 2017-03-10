/**
 * Created by Luan on 10/28/2016.
 */

import React, {Component, PropTypes} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Constants from './../../Constants'
import Languages from './../../Languages'
import {ProductViewMode} from '../../reducers/Product/actions'
const {LIST_VIEW} =  ProductViewMode

export default class TopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideSubCategory: true,
        }
        this.styles = {
            topBar: {
                backgroundColor: Constants.Color.TopBar,
                width: Constants.Dimension.ScreenWidth(),
                //elevation: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 40,
                borderColor: Constants.Color.ViewBorder,
                borderBottomWidth: 1,
                borderTopWidth: 0,
            },
            iconWrapper: {
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderLeftWidth: 1,
                borderColor: Constants.Color.ViewBorder,
                width: 50,
            },
            iconWithTextWrapper: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                marginLeft: 20,
            },
            buttonText: {color: 'black', fontSize: 15},
        }
    }

    static propTypes = {
        toggleProductViewMode: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired,
        viewMode: PropTypes.string.isRequired,
    };

    render() {
        const isListMode = this.props.viewMode === LIST_VIEW
        const filterText = this.state.hideSubCategory ? Languages.ShowFilter : Languages.HideFilter
        const filterIcon = this.state.hideSubCategory ? Constants.Icon.ShowItem : Constants.Icon.HideItem

        const filterButton = this.renderIconWithText(filterText, filterIcon, () => this.props.openModal())
        //const sortButton = this.renderIconWithText(Languages.Sort, Constants.Icon.Sort, () => alert("Mock Sort"))
        const viewModeButton = this.renderIcon(isListMode ?
            Constants.Icon.GridMode : Constants.Icon.ListMode, this.props.toggleProductViewMode)

        return (
            <View style={this.styles.topBar}>
                {filterButton}
                {viewModeButton}
            </View>
        )
    }

    renderIcon(icon, callback) {
        return (
            <TouchableOpacity
                onPress={callback}
                style={this.styles.iconWrapper}
            >
                <Icon
                    name={icon}
                    size={30}
                    color={Constants.Color.TopBarIcon}
                />
            </TouchableOpacity>
        )
    }

    renderIconWithText(text, icon, callback) {
        return (
            <TouchableOpacity
                onPress={callback}
                style={this.styles.iconWithTextWrapper}
            >
                <Icon
                    name={icon}
                    size={20}
                    color={Constants.Color.TopBarIcon}
                    style={{marginRight: 10}}
                />
                <Text style={this.styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        )
    }
}