/**
 * Created by Luan on 11/23/2016.
 */

import React, {Component, PropTypes} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {RadioButtons} from 'react-native-radio-buttons'
import Icon from 'react-native-vector-icons/Ionicons'
import TimerMixin from 'react-timer-mixin'

import Constants from './../../Constants'
import Languages from './../../Languages'
import Button from './../../components/Button'
import {selectCategory} from '../../reducers/Category/actions'
import {clearProducts} from '../../reducers/Product/actions'

class FilterPanel extends Component {
    constructor(props) {
        super(props)
        const {currentCateName, initCategoryName, initCategoryId, clearProducts, selectCategory, closeModal} = this.props
        this.state = ({
            selectedOption: currentCateName != undefined ? currentCateName : initCategoryName, //selected category name
            isChanged: false,
        })

        this.styles = {
            container: {
                backgroundColor: 'white',
                maxHeight: Constants.Dimension.ScreenHeight(0.5),
                width: Constants.Dimension.ScreenWidth(0.8),
                margin: 20,
            },
            heading: {
                width: undefined,
                marginBottom: 10,
                height: 50,
                justifyContent: 'center',
                borderColor: Constants.Color.ViewBorder,
                borderWidth: 1,
                borderRadius: 1,
            },
            headingText: {
                fontSize: 20,
                fontWeight: 'bold',
                color: Constants.Color.ToolbarText,
                textAlign: 'center'
            }
        }

        this.onApplyCategory = () => { // Call when user apply a new category
            if (this.state.isChanged) { // prevent user to load the same category
                const selectedCategory = (this.state.selectedOption != initCategoryName) ?
                    this.subCategories.filter(category => category.name === this.state.selectedOption)[0] : //Sub category
                    {name: initCategoryName, id: initCategoryId} // Parent category
                closeModal()

                TimerMixin.setTimeout(() => {
                    clearProducts()
                    selectCategory(selectedCategory.id, selectedCategory.name)
                }, 400)
            }
        }
    }

    static propTypes = {
        //Redux functions
        selectCategory: PropTypes.func.isRequired,
        clearProducts: PropTypes.func.isRequired,
        //View control function
        closeModal: PropTypes.func.isRequired,
        //Others...
        categories: PropTypes.array.isRequired,
        initCategoryId: PropTypes.number.isRequired,
        initCategoryName: PropTypes.string.isRequired,
        currentCateName: PropTypes.string,
    };

    componentWillMount() {
        const {categories, initCategoryId} = this.props

        //Prepare data
        this.subCategories = categories.filter(category => category.parent === initCategoryId) //Get all children categories of current category
        this.displayCategories = this.subCategories.map((category) => category.name) // extract category's name to array
        this.displayCategories.unshift(this.props.initCategoryName) //add the parent category at start
    }

    render() {
        const {currentCateName, initCategoryName} = this.props

        return (
            <View style={this.styles.container}>
                <View style={this.styles.heading}>
                    <Text style={this.styles.headingText}>{Languages.Categories}</Text>
                </View>
                <ScrollView>
                    <RadioButtons
                        options={this.displayCategories}
                        onSelection={(selectedOption) => this.setState({
                            selectedOption: selectedOption,
                            isChanged: !((selectedOption == currentCateName) || (selectedOption == initCategoryName && currentCateName == undefined)),
                        })}
                        selectedOption={this.state.selectedOption}
                        renderOption={ this.renderRadioOption }
                        renderContainer={ (optionNodes) => <View style={{margin: 10}}>{optionNodes}</View> }
                    />
                </ScrollView>
                <Button
                    borderLess={this.state.isChanged}
                    onPress={this.onApplyCategory}
                    isLoading={this.state.isLoading}
                    style={{
                        marginBottom: 0, margin: 0,
                        backgroundColor: this.state.isChanged ? Constants.Color.ButtonBackground : Constants.Color.ViewBorder,
                    }}>
                    {Languages.APPLY}
                </Button>
            </View>
        )
    }

    renderRadioOption(option, selected, onSelect, index) {
        return (
            <TouchableOpacity
                onPress={onSelect} key={index}
                style={{
                    borderColor: Constants.Color.DirtyBackground,
                    borderTopWidth: index == 0 ? 0 : 1,
                    padding: 5,
                    flexDirection: 'row', alignItems: 'center',
                    width: undefined,
                    height: 50,
                }}>
                <Icon name={selected ? Constants.Icon.RatioOn : Constants.Icon.RatioOff} size={15}/>
                <Text style={selected ? {fontWeight: 'bold', marginLeft: 10,} : {marginLeft: 10,}}>{option}</Text>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = () => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCategory: (selectedCategoryId, selectedCategoryName) => dispatch(selectCategory(selectedCategoryId, selectedCategoryName)),
        clearProducts: () => dispatch(clearProducts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)