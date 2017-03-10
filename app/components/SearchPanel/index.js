/**
 * Created by luanp on 22/09/2016.
 */
'use strict'

import React, {Component, PropTypes} from 'react'
import {Text, TextInput, View, TouchableOpacity, Platform, ListView, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import TimerMixin from 'react-timer-mixin'
import DismissKeyboard from 'dismissKeyboard'
import {Actions} from 'react-native-router-flux'

import Constants from './../../Constants'
import Languages from './../../Languages'
import ItemRow from './ItemRow'
import AppEventEmitter from './../../utils/AppEventEmitter'
import WooWorker from './../../services/WooWorker'
// import {selectCategory} from '../../reducers/Category/actions'

class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.data = []
        this.state = {
            text: '',
            page: 1,                // Page counter (the numbers of fetch we done).
            limit: 8,               // 5 product per fetch.
            isLoading: false,       // Flag to know we are retrieving product data or not.
            searched: false,
            finish: false,          // Flag to know there is remain product to fetch from server.
            dataSource: new ListView.DataSource({rowHasChanged: () => true})
        }
        this.getDataSource = (products) => this.state.dataSource.cloneWithRows(products)

        this.closeModal = () => {
            DismissKeyboard() // There is a serious bug occurs whenever the keyboard close AFTER modal
            TimerMixin.setTimeout(() => AppEventEmitter.emit(Constants.EmitCode.SearchModalClose), 400)
        }
    }

    componentDidMount() {
        TimerMixin.setTimeout(() => this.refs.textInput != undefined && this.refs.textInput.focus(), 400)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderSearchBar()}
                <View style={{flex: 1}}>
                    {this.data.length == 0 ?
                        <Text
                            style={{textAlign: 'center'}}>{this.state.searched ? Languages.NoResultError : ''}</Text> :
                        this.renderResultList()
                    }
                </View>
            </View>
        )
    }

    renderSearchBar() {
        const closeButton = (
            <TouchableOpacity
                onPress={() => this.closeModal()}
                style={{width: 50, justifyContent: 'center', alignItems: 'center',}}>
                <Icon name={Constants.Icon.Close} size={30}/>
            </TouchableOpacity>)

        const separate = <View style={{borderLeftWidth: 1, borderColor: Constants.Color.DirtyBackground}}/>

        const searchInput = (
            <TextInput
                ref="textInput"
                placeholder={Languages.SearchPlaceHolder}
                style={{flex: 1, marginLeft: 10, fontSize: 18}}
                value={this.state.text}
                onChangeText={(text) => this.setState({text})}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.startNewSearch()}
            />)

        return (
            <View style={{
                height: 50,
                flexDirection: 'row',
                marginBottom: 10,
                borderBottomWidth: 1,
                borderColor: Constants.Color.DirtyBackground,
            }}>
                {closeButton}
                {separate}
                {searchInput}
            </View>
        )
    }

    renderResultList() {
        const onEndReached = () => {
            if (!this.state.isLoading) this.fetchSearchResults()
        }
        const onPress = (productId) => {
            Actions.product({productId: productId})
            this.closeModal()
        }
        return (
            <ListView
                onEndReached={onEndReached}
                dataSource={this.state.dataSource}
                renderRow={(item) => <ItemRow product={item} onPress={onPress}/>}
                refreshControl={ <RefreshControl refreshing={this.state.isLoading}
                                                 onRefresh={() => this.startNewSearch()}/> }
            />
        )
    }

    fetchSearchResults(newSearch = false, page = this.state.page, finish = this.state.finish) {
        if (finish) return
        const callback = (data) => {
            this.data = newSearch ? data : this.data.concat(data)
            this.setState({
                page: this.state.page + 1,
                finish: data.length < this.state.limit,
                dataSource: this.getDataSource(this.data),
                isLoading: false,
                searched: true
            })
        }
        this.setState({isLoading: true})
        WooWorker.productsByName(callback, null, this.state.text, this.state.limit, page)
    }

    startNewSearch() {
        this.setState({
            page: 1,
            finish: false,
            isLoading: true,
        })
        this.fetchSearchResults(true, 1, false)
    }
}

const mapStateToProps = (state) => {
    return {
        //currentScene: state.routes.scene.name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
//        clearProducts: () => dispatch(clearProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)