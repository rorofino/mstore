import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "panelOne": {
        "backgroundColor": "#eee"
    },
    "imagePanelOne": {
        "marginTop": 12,
        "alignItems": "center",
        "justifyContent": "center",
        "position": "relative",
        "width": (width)-22,
        "height": (width/3)
    },
    "nameOne": {
        "fontSize": 13,
        "width": (width)-16,
        "marginLeft": 8,
        "marginTop": 6
    },
    "timeOne": {
        "marginLeft": 8,
        "color": "#999",
        "fontSize": 10
    },
    "panelTwo": {
        "backgroundColor": "#eee",
        "position": "relative"
    },
    "imagePanelTwo": {
        "marginTop": 12,
        "alignItems": "center",
        "justifyContent": "center",
        "position": "relative",
        "width": (width/2 - 15),
        "height": (width/3),
        "marginRight": 5,
        "marginLeft": 5
    },
    "nameTwo": {
        "fontSize": 13,
        "width": (width/2 - 20),
        "marginLeft": 5,
        "marginTop": 6
    },
    "timeTwo": {
        "marginLeft": 8,
        "color": "#999",
        "fontSize": 10
    },
    "panel": {
        "position": "relative"
    },
    "imagePanel": {
        "width": (width/3)-10,
        "height": (width/3),
        "marginRight": 8,
        "alignItems": "center",
        "justifyContent": "center",
        "position": "relative"
    },
    "name": {
        "fontSize": 13,
        "width": (width/3)-10,
        "marginLeft": 4,
        "marginTop": 6
    },
    "time": {
        "marginLeft": 4,
        "color": "#999",
        "fontSize": 10,
        "marginBottom": 20
    }
});