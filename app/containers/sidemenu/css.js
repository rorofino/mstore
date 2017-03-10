import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    'sideMenu': {
        'backgroundColor': '#34BC99',
        'flex': 1,
        'paddingTop': 60,
        'paddingLeft': 30,
        'paddingRight': 30
    },
    'menuRow': {
        'flexDirection': 'row',
        'alignItems': 'center',
        'position': 'relative',
        'paddingTop': 7,
        'paddingBottom': 7,
        'height': 48,
        'marginBottom': 12,
        'borderTopWidth': 0,
        'borderTopColor': 'rgba(255,255,255,0.1)'
    },
    'noBorder': {
        'borderTopWidth': 0
    },
    'icon': {
        'fontSize': 24,
        'color': 'white',
        'marginRight': 20
    },
    'menuBadge': {
        'borderRadius': 9,
        'position': 'absolute',
        'right': 0,
        'top': 17,
        'fontSize': 12,
        'color': 'white'
    },
    'menuSignOut': {
        'marginTop': 100,
        'borderTopWidth': 0
    },
    'menuLink': {
        'fontSize': 14,
        'color': 'white',
        'fontWeight': '300'
    }
})