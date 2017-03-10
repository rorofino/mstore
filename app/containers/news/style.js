import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "color": {
        "position": "absolute",
        "top": 0,
        "bottom": 0,
        "left": 0,
        "right": 0,
        "backgroundColor": "#EBEBEB"
    },
    "card": {
        "width": width,
        "flexDirection": "row"
    },
    "box": {
        "width": vw * 40,
        "height": 100,
        "backgroundColor": "#ccc",
        "marginLeft": 20,
        "marginTop": 10,
        "marginBottom": 10
    },
    "body": {
        "width": width,
        "flex": 1
    },
    "image": {
        "width": vw * 40,
        "height": 90,
        "resizeMode": "cover",
        "marginLeft": 8,
        "marginTop": 20,
        "marginBottom": 10
    },
    "content": {
        "width": vw * 50,
        "marginLeft": 14,
        "marginTop": 20,
        "marginBottom": 30
    },
    "greyRow": {
        "backgroundColor": "#eee"
    },
    "menuView": {
        "backgroundColor": "rgba(255,255,255,0.8)",
        "height": 40
    },
    "menuItemView": {
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 10,
        "height": 20
    },
    "menuItem": {
        "marginTop": 2,
        "marginRight": 16,
        "marginBottom": 2,
        "marginLeft": 16,
        "fontSize": 11,
        "fontWeight": "500"
    },
    "menuItemActive": {
        "backgroundColor": "#4382D0",
        "borderRadius": 16
    },
    "menuActiveText": {
        "color": "white"
    },
    "bannerImage": {
        "flex": 1,
        "width": width,
        "height": width / 2 + 40,
        "backgroundColor": "rgba(67,130,208,0.2)"
    },
    "placeHolderImage": {
        "alignItems": "center",
        "width": width,
        "height": width/3,
        "justifyContent": "center",
        "backgroundColor": "rgba(67,130,208,0.2)"
    },
    "backgroundOne": {
        "backgroundColor": "rgba(58,75,133,0.6)"
    },
    "backgroundTwo": {
        "backgroundColor": "rgba(188,59,36,0.6)"
    },
    "backgroundThree": {
        "backgroundColor": "rgba(57,174,84,0.6)"
    },
    "bannerText": {
        "position": "absolute",
        "bottom": 30,
        "backgroundColor": "rgba(0,0,0,0.3)",
        "width": vw * 60
    },
    "bannerTitle": {
        "marginTop": 12,
        "marginRight": 12,
        "marginBottom": 2,
        "marginLeft": 12,
        "color": "white",
        "fontSize": 15
    },
    "bannerDate": {
        "color": "rgba(255,255,255,0.7)",
        "fontSize": 9,
        "fontWeight": "500",
        "marginLeft": 12,
        "marginBottom": 12
    },
    "time": {
        "color": "#787878",
        "fontSize": 11,
        "marginTop": 4
    },
    "tagView": {
        "flexDirection": "row",
        "alignItems": "flex-start",
        "justifyContent": "flex-start",
        "marginBottom": 6
    },
    "tag": {
        "backgroundColor": "#aaa",
        "borderRadius": 12,
        "alignSelf": "flex-start",
        "marginRight": 4
    },
    "tagText": {
        "fontSize": 9,
        "marginTop": 1,
        "marginRight": 8,
        "marginBottom": 1,
        "marginLeft": 8,
        "color": "white",
        "fontWeight": "600"
    },
    "hlist": {
        "flex": 1,
        "backgroundColor": "white",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "title": {
        "color": "#333",
        "fontSize": 22,
        "textAlign": "center",
        "fontWeight": "200",
        "marginTop": 12
    },
    "titleSmall": {
        "fontSize": 13,
        "color": "#999",
        "textAlign": "center",
        "marginBottom": 10,
        "marginTop": 4
    },
    "productItem": {
        "width": width-10,
        "height": (width-20)*962/875,
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5
    },
    "detailPanel": {
        "height": 300,
        "flex": 1,
        "alignItems": "center",
        "justifyContent": "flex-end"
    },
    "detailBlock": {
        "alignItems": "center",
        "backgroundColor": "#fff",
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20,
        "width": width
    },
    "detailDesc": {
        "color": "#fff",
        "fontWeight": "600",
        "fontSize": 18,
        "paddingTop": 10,
        "textAlign": "center"
    },
    "largeImage": {
        "width": width,
        "height": width + 40,
        "resizeMode": "cover"
    },
    "largeContent": {
        "width": width,
        "position": "absolute",
        "bottom": 0,
        "backgroundColor": "rgba(0,0,0,0.3)"
    },
    "largeTitle": {
        "color": "#fff",
        "fontSize": 18,
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 0,
        "paddingLeft": 20
    },
    "largeTime": {
        "color": "#ccc",
        "fontSize": 12,
        "marginTop": 4,
        "paddingTop": 0,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20
    },
    "html": {
        "marginLeft": 12,
        "marginRight": 12
    }
});