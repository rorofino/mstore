/**
 * Created by luanp on 22/09/2016.
 */
'use strict'

import React, {Component, PropTypes} from 'react'
import {Text, View, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'

import AppEventEmitter from './../../utils/AppEventEmitter'
import Constants from './../../Constants'
import Languages from './../../Languages'
import ToolbarIcon from './ToolbarIcon'
// import {clearProducts} from '../../reducers/Cart/actions'

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.renderMenu = this.renderMenu.bind(this)
        this.renderConfig = this.renderConfig.bind(this)
        this.backEnable = true
        this.usedToTransparent = false
        this.styles = {
            currentToolbar: {},
            baseToolbar: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 40,
                width: Constants.Dimension.ScreenWidth(),
                borderBottomColor: Constants.Color.ViewBorder,
            },
            toolbar_LeftGroup: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                height: 40,
                width: undefined,
            },
            itemWrapper: {
                justifyContent: 'center',
                padding: 10,
                marginRight: 10,
            },
            rightButtonGroup: {
                flexDirection: 'row',
                alignItems: 'center'
            },
            currentTitle: {},
            title: {
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 0,
                color: Constants.Color.ToolbarText,
            },
            titleTransparent: {
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 0,
                color: Constants.Color.ToolbarTextTrans
            },
            EmptyIcon: {height: 40, width: 50},
        }
    }

    static propTypes = {
        title: PropTypes.string,
        back: PropTypes.bool,
        cart: PropTypes.bool,
        search: PropTypes.bool,
        wishList: PropTypes.bool,
        transparentMode: PropTypes.bool,
        Cart: PropTypes.object.isRequired,
        WishList: PropTypes.object.isRequired,
    };

    //noinspection JSUnusedGlobalSymbols
    static defaultProps = {
        title: 'Toolbar',
        back: false,
        cart: false,
        search: false,
        wishList: false,
        transparentMode: false,
    };

    componentWillMount() {
        if (this.props.transparentMode)
            this.usedToTransparent = true
    }

    render() {
        let tempStyle = this.props.transparentMode ?
            {
                backgroundColor: Constants.Color.ToolbarTrans,
                borderBottomWidth: 0,
                // elevation: 0,
            } :
            {
                backgroundColor: Constants.Color.Toolbar,
                borderBottomWidth: 1,
                // elevation: 5,
            }
        if (this.usedToTransparent) {
            tempStyle.position = 'absolute'
            tempStyle.top = 0
            tempStyle.left = 0
            tempStyle.zIndex = 10
        }
        this.styles = Object.assign({}, this.styles, {
            currentToolbar: {...this.styles.baseToolbar, ...tempStyle,},
            currentTitle: this.props.transparentMode ? this.styles.titleTransparent : this.styles.title
        })


        const titleOnPress = () => {
            if (this.props.back)
                Actions.pop()
            else
                AppEventEmitter.emit(Constants.EmitCode.SideMenuOpen)
        }

        const title = (
            <TouchableOpacity style={[this.styles.itemWrapper, {marginLeft: -15}]}
                              onPress={titleOnPress}>
                <Text style={this.styles.currentTitle}>{this.props.title}</Text>
            </TouchableOpacity>)

        return (
            <View style={this.styles.currentToolbar}>
                <View style={this.styles.toolbar_LeftGroup}>
                    {this.renderMenu() }
                    {title }
                </View>
                <View style={this.styles.rightButtonGroup}>
                    {this.props.search ? this.renderSearch() : <View/> }
                    {this.props.wishList ? this.renderWishList(this.props.WishList.total) : <View/> }
                    {this.props.cart ? this.renderCart(this.props.Cart.total) : <View/> }
                </View>
            </View>
        )
    }

    renderButton(icon, callback) {
        return (
            <TouchableOpacity onPress={callback} style={this.styles.itemWrapper}>
                <Icon name={icon} size={25}
                      color={this.props.transparentMode ? Constants.Color.ToolbarIconTrans : Constants.Color.ToolbarIcon}/>
            </TouchableOpacity>
        )
    }

    renderMenu() {
        const openMenu = () => AppEventEmitter.emit(Constants.EmitCode.SideMenuOpen)
        const goBack = () => {
            if (this.backEnable) {
                this.backEnable = false
                Actions.pop()
            }
        }

        return this.props.back == true ? this.renderButton(Constants.Icon.Back, goBack)
            : this.renderButton(Constants.Icon.Menu, openMenu)
    }

    renderConfig() {
        const openConfig = () => alert('Mock Open Config')

        return this.renderButton(Constants.Icon.More, openConfig)
    }

    renderCart(number) {
        const openCart = () => {
            if (this.props.routes.scene.title == Languages.WishList) Actions.cart({type: 'replace'})
            else Actions.cart()
        }
        return <ToolbarIcon name={number == 0 ? Constants.Icon.ShoppingCartEmpty : Constants.Icon.ShoppingCart}
                            onPress={openCart} total={number}/>
    }

    renderWishList(number) {
        const openWishList = () => {
            if (this.props.routes.scene.title == Languages.Cart) Actions.wishlist({type: 'replace'})
            else Actions.wishlist()
        }
        return <ToolbarIcon name={number == 0 ? Constants.Icon.WishlistEmpty : Constants.Icon.Wishlist}
                            onPress={openWishList} total={number}/>
    }

    renderSearch() {
        const openWishList = () => AppEventEmitter.emit(Constants.EmitCode.SearchModalOpen)
        return <ToolbarIcon name={Constants.Icon.Search} onPress={openWishList}/>
    }
}

const mapStateToProps = (state) => {
    return {
        routes: state.routes,
        Cart: state.Cart,
        WishList: state.WishList,
    }
}

export default connect(mapStateToProps)(Toolbar)