/*
 a bootstrap like style
 */
'use strict'

let LABEL_COLOR = '#000000'
let INPUT_COLOR = '#333'
let ERROR_COLOR = '#a94442'
let HELP_COLOR = '#999999'
let BORDER_COLOR = '#cccccc'
let DISABLED_COLOR = '#777777'
let DISABLED_BACKGROUND_COLOR = '#eeeeee'
let FONT_SIZE = 14
let FONT_WEIGHT = '500'

let stylesheet = Object.freeze({
    fieldset: {},
    // the style applied to the container of all inputs
    formGroup: {
        normal: {
            marginBottom: 10
        },
        error: {
            marginBottom: 10
        }
    },
    controlLabel: {
        normal: {
            color: LABEL_COLOR,
            fontSize: FONT_SIZE + 2,
            marginBottom: 7,
            marginLeft: 20,
            marginRight: 20,
            fontWeight: FONT_WEIGHT
        },
        // the style applied when a validation error occours
        error: {
            color: ERROR_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 7,
            fontWeight: FONT_WEIGHT
        }
    },
    helpBlock: {
        normal: {
            color: HELP_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 2
        },
        // the style applied when a validation error occours
        error: {
            color: HELP_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 2
        }
    },
    errorBlock: {
        fontSize: FONT_SIZE,
        padding: 0,
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        color: ERROR_COLOR
    },
    textbox: {
        normal: {
            height: 40,
            fontSize: FONT_SIZE,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            marginLeft: 20,
            marginRight: 20,
            color: INPUT_COLOR,

            borderWidth: 1,
            borderColor: BORDER_COLOR,
            marginBottom: 5,
        },
        // the style applied when a validation error occours
        error: {
            height: 40,
            fontSize: FONT_SIZE,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            borderRadius: 4,
            marginLeft: 20,
            marginRight: 20,
            color: INPUT_COLOR,

            borderColor: ERROR_COLOR,
            // borderWidth: 1,
            marginBottom: 5
        },
        // the style applied when the textbox is not editable
        notEditable: {
            fontSize: FONT_SIZE,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: BORDER_COLOR,
            borderWidth: 1,
            marginBottom: 5,
            color: DISABLED_COLOR,
            backgroundColor: DISABLED_BACKGROUND_COLOR
        }
    },
    checkbox: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
            marginBottom: 4
        }
    },
    select: {
        normal: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            borderRadius: 4,
            marginLeft: 20,
            marginRight: 20,
            borderWidth: 2,
        },
        // the style applied when a validation error occours
        error: {
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            borderRadius: 4,
            marginLeft: 20,
            marginRight: 20,
        }
    },
    pickerTouchable: {
        normal: {
            height: 44,
            flexDirection: 'row',
            alignItems: 'center'
        },
        error: {
            height: 44,
            flexDirection: 'row',
            alignItems: 'center'
        }
    },
    pickerValue: {
        normal: {
            fontSize: FONT_SIZE,
            paddingLeft: 7
        },
        error: {
            fontSize: FONT_SIZE,
            paddingLeft: 7
        }
    },
    datepicker: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
            marginBottom: 4
        }
    },
    dateTouchable: {
        normal: {},
        error: {}
    },
    dateValue: {
        normal: {
            color: INPUT_COLOR,
            fontSize: FONT_SIZE,
            padding: 7,
            marginBottom: 5
        },
        error: {
            color: ERROR_COLOR,
            fontSize: FONT_SIZE,
            padding: 7,
            marginBottom: 5
        }
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
})

module.exports = stylesheet