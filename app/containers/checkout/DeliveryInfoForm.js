/**
 * Created by Luan on 11/7/2016.
 */

import React, {Component, PropTypes} from 'react'
import Tcomb from'tcomb-form-native'
import css from './form-css'
import Validator from '../../utils/Validator'
import Languages from './../../Languages'
Languages.setLanguage(Languages.getLanguage())

const Form = Tcomb.form.Form

export default class DeliveryInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: {
                first_name: '', last_name: '',
                address_1: '',
                state: '',
                postcode: '',
                country: '',
                email: '', phone: '',
                note: ''
            },
        }
        this.onChange = (value) => this.setState({value: value})
        this.onPress = () => this.refs.form.getValue()

        const Countries = Tcomb.enums(this.props.countries)
        //override the validate method of Tcomb lib for multi validate requirement.
        const Email = Tcomb.refinement(Tcomb.String, s => Validator.checkEmail(s) === undefined)
        Email.getValidationErrorMessage = (s) => Validator.checkEmail(s)
        const Phone = Tcomb.refinement(Tcomb.String, s => Validator.checkPhone(s) === undefined)
        Phone.getValidationErrorMessage = (s) => Validator.checkPhone(s)

        //define customer form
        this.Customer = Tcomb.struct({
            first_name: Tcomb.String,       // normal string
            last_name: Tcomb.String,
            address_1: Tcomb.String,
            country: Countries,
            state: Tcomb.String,                //combobox
            postcode: Tcomb.String,
            email: Email,                   // string input with custom validate
            phone: Phone,                   // same ^
            note: Tcomb.maybe(Tcomb.String) //maybe = optional
        })

        //form options
        this.options = {
            label: Languages.DeliveryInfo, // <= form legend, displayed before the fields
            auto: 'none', //we have labels and placeholders as option here (in Engrish, ofcourse).
            stylesheet: css,
            fields: {
                first_name: {
                    placeholder: Languages.FirstName,
                    error: Languages.EmptyError, //for simple empty error warning.
                    underlineColorAndroid: 'transparent',
                },
                last_name: {
                    placeholder: Languages.LastName,
                    error: Languages.EmptyError,
                    underlineColorAndroid: 'transparent',
                },
                address_1: {
                    placeholder: Languages.Address,
                    error: Languages.EmptyError,
                    underlineColorAndroid: 'transparent',
                },
                state: {
                    placeholder: Languages.State,
                    error: Languages.EmptyError,
                    underlineColorAndroid: 'transparent',
                },
                postcode: {
                    placeholder: Languages.Postcode,
                    error: Languages.EmptyError,
                    underlineColorAndroid: 'transparent',
                },
                country: {
                    nullOption: {value: '', text: Languages.Country},
                    error: Languages.NotSelectedError,
                    styles: {
                        borderColor: 'black',
                        borderWidth: 1,
                        backgroundColor: 'pink',
                    }
                },
                email: {
                    placeholder: Languages.Email,
                    underlineColorAndroid: 'transparent',
                },
                phone: {
                    placeholder: Languages.Phone,
                    underlineColorAndroid: 'transparent',
                },
                note: {
                    placeholder: Languages.Note,
                    underlineColorAndroid: 'transparent',
                }
            }
        }
    }

    componentDidMount() {
        const {customer} = this.props

        if (customer.email !== undefined) {
            this.setState({
                value: {
                    first_name: customer.billing.first_name == '' ? customer.first_name : customer.billing.first_name,
                    last_name: customer.billing.last_name == '' ? customer.last_name : customer.billing.last_name,
                    email: customer.email.first_name == '' ? customer.email : customer.billing.email,
                    address_1: customer.billing.address_1,
                    state: customer.billing.state,
                    postcode: customer.billing.postcode,
                    country: customer.billing.country,
                    phone: customer.billing.phone
                },
            })
        }
    }

    static propTypes = {
        customer: PropTypes.object.isRequired,
    };

    render() {
        return (
            <Form
                ref="form"
                type={this.Customer}
                options={this.options}
                value={this.state.value}
                onChange={this.onChange.bind(this) }
            />
        )
    }

}

