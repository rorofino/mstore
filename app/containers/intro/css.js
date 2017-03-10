import {StyleSheet, Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window'),
    vw = width / 100,
    vh = height / 100

export default StyleSheet.create({
    'slide': {
        'height': height,
        'backgroundColor': 'white',
        'alignItems': 'center',
        'zIndex': 9
    },
    'imageView': {
        'position': 'absolute',
        'top': 5 * vh
    },
    'image': {
        'width': width,
        'height': width * 2 - 300,
        'resizeMode': 'contain'
    },
    'boxView': {
        'position': 'absolute',
        'left': 0,
        'bottom': vh,
        'width': width
    },
    'box': {
        'width': width - 20,
        'resizeMode': 'contain',
        'marginLeft': 10
    },
    'text': {
        'color': 'white',
        'fontSize': 20,
        'lineHeight': 34,
        'fontWeight': 'bold',
        'textAlign': 'center'
    },
    'signupText': {
        'textShadowColor': 'black',
        'textShadowOffset': {width: 0, height: 0},
        'textShadowRadius': 2,
        'shadowOpacity': 0.2,
        'fontSize': 13,
        'position': 'absolute',
        'bottom': 42,
        'right': 34,
        'width': width,
        'textAlign': 'right',
        'backgroundColor': 'transparent',
        'color': 'rgba(255,255,255,0.8)'
    },
    'background': {
        'position': 'absolute',
        'top': 0,
        'height': height,
        'resizeMode': 'contain',
        'left': 0,
        'width': width,
        'zIndex': 0
    },
    'icon': {
        'position': 'absolute',
        'top': 20 * vh,
        'left': 20 * vw,
        'height': 100,
        'width': width
    },
    'iconAndroid': {
        'fontSize': 100,
        'color': '#A4C639',
        'backgroundColor': 'transparent',
        'marginTop': -120
    },
    'iconApple': {
        'fontSize': 100,
        'color': '#666',
        'backgroundColor': 'transparent'
    },
    'boxViewAndroid': {
        'position': 'absolute',
        'height': 300,
        'left': 0,
        'bottom': vh,
        'width': width
    },
    'boxAndroid': {
        'width': width - 20,
        'resizeMode': 'contain',
        'marginLeft': 10
    }
})