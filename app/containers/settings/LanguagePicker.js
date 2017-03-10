/**
 * Created by Luan on 11/23/2016.
 */

import React, {Component} from 'react'
import {Text, View, Alert, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import RNRestart from 'react-native-restart'
import {RadioButtons} from 'react-native-radio-buttons'
import Icon from 'react-native-vector-icons/Ionicons'

import Constants from './../../Constants'
import Languages from './../../Languages'
import Button from './../../components/Button'
import {switchLanguage} from './../../reducers/Language/actions'

class LanguagePicker extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            selectedOption: Languages.getLanguage(),
            isLoading: false,
        })
    }

    render() {
        const onPress = () => {
            Alert.alert(
                Languages.Confirm,
                Languages.SwitchLanguageConfirm,
                [
                    {text: Languages.CANCEL, onPress: () => undefined},
                    {
                        text: Languages.OK, onPress: () => {
                        this.setState({isLoading: true})
                        this.props.switchLanguage(this.state.selectedOption)
                        RNRestart.Restart()
                    }
                    },
                ]
            )
            return true
        }
        const renderOption = (option, selected, onSelect, index) => {
            return (
                <TouchableOpacity onPress={onSelect} key={index}
                                  style={{
                                      padding: 5,
                                      backgroundColor: selected
                                          ? Constants.Color.DirtyBackground
                                          : Constants.Color.Background,
                                      flexDirection: 'row', alignItems: 'center',
                                      width: undefined,
                                  }}>
                    <Icon name={selected ? Constants.Icon.RatioOn : Constants.Icon.RatioOff} size={15}/>
                    <Text style={selected ? {fontWeight: 'bold', marginLeft: 10,} : {marginLeft: 10,}}>{option}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{
                backgroundColor: Constants.Color.Background,
                maxHeight: Constants.Dimension.ScreenHeight(0.5),
                width: Constants.Dimension.ScreenWidth(0.8)
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Constants.Color.ToolbarText,
                    width: undefined,

                }}>{Languages.AvailableLanguages}</Text>
                <ScrollView showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}>
                    <RadioButtons
                        options={Languages.getAvailableLanguages()}
                        onSelection={(selectedOption) => this.setState({selectedOption})}
                        selectedOption={this.state.selectedOption}
                        renderOption={ renderOption }
                        renderContainer={ (optionNodes) => <View style={{margin: 10}}>{optionNodes}</View> }
                    />
                </ScrollView>
                <Button onPress={onPress} borderLess style={{marginBottom: 0, margin: 0}}
                        isLoading={this.state.isLoading}>{Languages.SwitchLanguage}</Button>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.Language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        switchLanguage: (language) => {
            dispatch(switchLanguage(language))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker)