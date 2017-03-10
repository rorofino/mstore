'use strict'

import React, {Component, PropTypes} from 'react'
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import TimerMixin from 'react-timer-mixin'

import Spinner from './../../components/Spinner'
import Lock, {LOCK_OPTIONS} from './../../services/Auth0'
import WooWorker from './../../services/WooWorker'
import {signIn, signOut} from './../../reducers/Customer/actions'

import css from './css'
import AppEventEmitter from './../../utils/AppEventEmitter'
import Constants from '../../Constants'
import Languages from '../../Languages'

/**
 * This is navigator bar as side menu.
 * This component is always on mount state in all application Scenes.
 * Put any global checking process in this class
 *
 * @class SideMenu
 */

class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
        }

        this.styles = {
            sideMenu: {
                backgroundColor: Constants.Color.SideMenu,
                flex: 1,
            },
            menuRow: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
            },
            icon: {
                fontSize: 24,
                marginRight: 20
            },
            avatar: {height: 60, width: 60, borderRadius: 30},
            avatar_background: {width: Constants.Dimension.ScreenWidth(0.7), height: 150, padding: 20,},
            fullName: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
            email: {fontWeight: 'bold', color: 'white', backgroundColor: 'transparent'},
        }
        this.dispatch = (func) => {
            AppEventEmitter.emit(Constants.EmitCode.SideMenuClose)
            TimerMixin.setTimeout(() => func(), 250)
        }
    }

    static propTypes = {
        customer: PropTypes.object.isRequired,
        signOut: PropTypes.func.isRequired,
        signIn: PropTypes.func.isRequired,
    };


    render() {
        //shorter variable name
        const {customer, signOut} = this.props
        const Lang = Languages

        // Customer display data
        const fullName = customer.email == undefined ? Lang.GuestAccount : customer.first_name + ' ' + customer.last_name
        const email = customer.email == undefined ? '' : customer.email
        const picture = customer.email == undefined ? Constants.Image.DefaultAvatar : {uri: customer.avatar_url}

        const avatarOnLoad = <View style={this.styles.avatar_background}><Spinner fullStretch/></View>

        return (
            <View style={this.styles.sideMenu}>
                {this.state.isLoading ? avatarOnLoad :
                    <Image
                        source={Constants.Image.AvatarBackground}
                        style={this.styles.avatar_background}
                        resizeMode='cover'
                    >
                        <Image source={picture} style={this.styles.avatar}/>
                        <Text style={this.styles.fullName}>{fullName}</Text>
                        <Text style={this.styles.email}>{email}</Text>
                    </Image>}
                <ScrollView style={{padding: 20}}>
                    {customer.email == undefined ?
                        this.rowRender(() => this.doLogin(), Constants.Icon.SignIn, Lang.SignIn) :
                        this.rowRender(() => signOut(), Constants.Icon.SignOut, Lang.SignOut)}
                    {this.rowRender(() => this.dispatch(() => Actions.home({type: ActionConst.RESET})), Constants.Icon.Home, Lang.Home)}
                    {this.rowRender(() => this.dispatch(() => Actions.wishlist()), Constants.Icon.Wishlist, Lang.WishList)}
                    {this.rowRender(() => this.dispatch(() => Actions.myorder()), Constants.Icon.MyOrder, Lang.MyOrder)}
                    {this.rowRender(() => this.dispatch(() => Actions.news()), Constants.Icon.News, Lang.News)}
                    {this.rowRender(() => this.dispatch(() => Actions.settings()), Constants.Icon.Config, Lang.Settings)}
                </ScrollView>
            </View>
        )
    }

    rowRender(onPress, icon, text) {
        return (
            <TouchableOpacity
                style={this.styles.menuRow}
                underlayColor="#2D2D30"
                onPress={onPress}>
                <Icon name={icon} color={Constants.Color.SideMenuIcon} style={css.icon}/>
                <Text style={css.menuLink}>{text}</Text>
            </TouchableOpacity>
        )
    }

    doLogin() {
        this.setState({isLoading: true})
        Lock.show(LOCK_OPTIONS, (err, profile, token) => {
            // console.log('error ' + JSON.stringify(err));
            // console.log('profile ' + JSON.stringify(profile));
            // console.log('token ' + JSON.stringify(token));
            if (err != null || profile == null || token == null) {
                alert(JSON.stringify(err)) // Errors from Auth0
                this.setState({isLoading: false})
            } else if (profile.email == null || profile.email_verified == false) {
                if (profile.email == null) // Account don't contain email
                    alert(profile.email_verified ? Languages.CantReactEmailError : Languages.NoEmailError)
                if (profile.email_verified == false && profile.email != null) // Account contain non-verified email
                    alert(Languages.EmailIsNotVerifiedError)
            } else {
                const customerIsExisted = (customer) => {
                    const _customer = Object.assign({}, customer, {avatar_url: profile.picture})
                    this.props.signIn(_customer)
                    this.setState({isLoading: false})
                }
                let makeNewCustomer = () => {
                    //Use to generate a new random password for new customer
                    const makeRandomPassword = (length) => {
                        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                        let text = ''
                        for (let i = 0; i < length; i++)
                            text += possible.charAt(Math.floor(Math.random() * possible.length))
                        return text
                    }
                    // New user data
                    const data = {
                        'email': profile.email,
                        'first_name': profile.family_name,
                        'last_name': profile.given_name,
                        'username': profile.email,
                        'password': makeRandomPassword(10),
                        'avatar_url': profile.picture == undefined ? null : profile.picture,
                        'billing': {
                            'first_name': profile.family_name,
                            'last_name': profile.given_name,
                            'email': profile.email,
                        },
                        'shipping': {
                            'first_name': profile.family_name,
                            'last_name': profile.given_name,
                        }
                    }
                    WooWorker.createCustomer(data, (customer) => {
                            const _customer = Object.assign({}, customer, {avatar_url: profile.picture})
                            this.props.signIn(_customer)
                            this.setState({isLoading: false})
                        }, () => {
                            alert(JSON.stringify('The account link with this email cannot be fetch.'))
                            this.setState({isLoading: false})
                        }
                    )
                }
                WooWorker.customerByEmail(profile.email, customerIsExisted, makeNewCustomer)
            }
        })
    }
}
const mapStateToProps = (state) => {
    return {
        customer: state.Customer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (customer) => {
            dispatch(signIn(customer))
        },
        signOut: () => {
            dispatch(signOut())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)