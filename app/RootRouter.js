'use strict'
/*eslint no-unused-vars: "off"*/

import React, {Component} from 'react'
import {Alert, Image, AsyncStorage, BackAndroid} from 'react-native'
import {Scene, Router, Actions, ActionConst} from 'react-native-router-flux'
import TimerMixin from 'react-timer-mixin'
import Drawer from 'react-native-drawer'
import Modal from 'react-native-modalbox'
import {connect, Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk'

import reducers from './reducers'
import SideMenu from './containers/sidemenu'
import SearchPanel from './components/SearchPanel'
import Constants from './Constants'
import Languages from './Languages'
import AppEventEmitter from './utils/AppEventEmitter'
import FCM from 'react-native-fcm'
import firebaseApp from './services/Firebase' // We don't use it but we still need to import it to init the instance

//Scenes
import Intro from './containers/intro'
import Home from './containers/home'
import Category from './containers/category'
import Product from './containers/product'
import Cart from './containers/cart'
import WishList from './containers/wishlist'
import Checkout from './containers/checkout'
import MyOrder from './containers/myorders'
import News from './containers/news/Index'
import PostDetails from './containers/news/NewsDetail'
import Settings from './containers/settings'
import Test from './containers/test'

//Redux store setup
const RouterWithRedux = connect()(Router)
const middleware = [thunk]
const store = compose(
    applyMiddleware(...middleware),
    autoRehydrate())(createStore)(reducers)
persistStore(store, {storage: AsyncStorage, blacklist: ['Category', 'Product']})

export default class RootRouter extends Component {
    constructor(props) {
        super(props)
        this.state = {isLoading: true}
        this.introFlag = true
    }

    componentWillMount() {
        //Check if the app need to show Intro Screen or not
        TimerMixin.setTimeout(
            () => AsyncStorage.getItem(Constants.AsyncCode.Intro, (error, result) => {
                if (error) console.log(error); else this.introFlag = (result != 'done')
                this.setState({isLoading: false})
            }),
            Constants.SplashScreen.Duration
        )

        //Short methods
        this.openSideMenu = () => this.refs.drawer.open()
        this.closeSideMenu = () => this.refs.drawer.close()
        this.openSearchModal = () => this.refs.search.open()
        this.closeSearchModal = () => this.refs.search.close()
    }

    componentDidMount() {
        //Subscribe listeners
        this.sideMenuOpenListener = AppEventEmitter.addListener(Constants.EmitCode.SideMenuOpen, this.openSideMenu.bind(this))
        this.sideMenuCloseListener = AppEventEmitter.addListener(Constants.EmitCode.SideMenuClose, this.closeSideMenu.bind(this))
        this.searchModalOpenListener = AppEventEmitter.addListener(Constants.EmitCode.SearchModalOpen, this.openSearchModal.bind(this))
        this.searchModalCloseListener = AppEventEmitter.addListener(Constants.EmitCode.SearchModalClose, this.closeSearchModal.bind(this))

        //Register Firebase Cloud Message Topic
        FCM.requestPermissions() // iOS only
        FCM.getFCMToken().then(token => console.log('Firebase token: ' + token))
        FCM.subscribeToTopic('/topics/G_NOTIFICATION')
    }

    componentWillUnmount() {
        //Unsubscribe listeners
        this.sideMenuOpenListener.remove()
        this.sideMenuCloseListener.remove()
        this.searchModalOpenListener.remove()
        this.searchModalCloseListener.remove()
    }

    render() {
        //Set language at this phase is fine because RootRouter only render once.
        Languages.setLanguage(store.getState().Language)

        //Return splash screen if the app is still loading
        if (this.state.isLoading)
            return (<Image
                style={{height: Constants.Dimension.ScreenHeight(1), width: Constants.Dimension.ScreenWidth(1)}}
                source={Constants.SplashScreen.Image}/>)

        //App scenes
        const scenes = Actions.create(
            <Scene key="scene">
                <Scene key="home" component={Home} title={Languages.Home} cart={true} search={true}
                       type={ActionConst.RESET}/>
                <Scene key="intro" component={Intro} title={Languages.Intro} initial={this.introFlag}/>
                <Scene key="category" component={Category} cart={true} back={true} search={true}/>
                <Scene key="product" component={Product} title={Languages.Product} cart={true} back={true}
                       wishList={true}/>
                <Scene key="cart" component={Cart} title={Languages.Cart} back={true} wishList={true}/>
                <Scene key="wishlist" component={WishList} title={Languages.WishList} back={true} cart={true}/>
                <Scene key="checkout" component={Checkout} title={Languages.Checkout} back={true}/>
                <Scene key="myorder" component={MyOrder} title={Languages.MyOrder} cart={true} back={true}/>
                <Scene key="news" component={News} title={Languages.News} back={true}/>
                <Scene key="postDetails" component={PostDetails} title={Languages.PostDetails} back={true}/>
                <Scene key="settings" component={Settings} title={Languages.Settings} back={true}/>
                <Scene key="test" component={Test} title="Test"/>
            </Scene>
        )

        // Exit confirm
        const onExitApp = () => {
            Alert.alert(
                Languages.Exit,
                Languages.ExitConfirm,
                [
                    {text: Languages.CANCEL, onPress: () => undefined},
                    {text: Languages.YES, onPress: () => BackAndroid.exitApp()},
                ]
            )
            return true
        }

        return (
            <Provider store={store}>
                <Drawer
                    ref="drawer"
                    type="overlay"
                    tapToClose={true}
                    captureGestures={true}
                    panThreshold={Constants.Drawer.panThreshold}
                    panOpenMask={Constants.Drawer.panOpenMask}
                    panCloseMask={Constants.Drawer.panCloseMask}
                    openDrawerOffset={Constants.Drawer.openDrawerOffset}
                    tweenHandler={(ratio) => ({main: {opacity: (2 - ratio) / 2}})} //handle overlay animation
                    side={Constants.Drawer.side}
                    content={<SideMenu/>}>
                    <RouterWithRedux hideNavBar={true}
                                     onExitApp={onExitApp}
                                     panHandlers={null}
                                     scenes={scenes}/>
                    <Modal ref='search'
                           backdropPressToClose={false}
                           backButtonClose={true}
                           swipeToClose={false}
                           entry="top"
                           style={{flex: 1}}>
                        <SearchPanel/>
                    </Modal>
                </Drawer>
            </Provider>
        )
    }
}