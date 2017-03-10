'use strict';

import React, {Component} from "react";
import {
    ListView,
    WebView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    AppRegistry
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import style from "./style";
import Toolbar from "./../../components/Toolbar"
import HTML from "react-native-fence-html";


export default class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: 'key1'
        }
    }

    onValueChange(key, value) {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    }

    getDescription(desc) {
        return desc.replace('<p>', '').substring(0, 200);
    }

    render() {
        const renderers = {
            img: (htmlAttribs, children, passProps) => {
                return (
                    <Image
                        source={{uri: htmlAttribs.src, width: 100, height: 100}}
                        style={passProps.htmlStyles.img}
                        {...passProps} />)
            }
        }
        const htmlStyle = {
            p: { fontSize: 14, color: '#666', lineHeight: 24 }
        };

        return (
            <View style={style.color}>
                <ParallaxScrollView
                    backgroundColor="white"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={500}
                    renderFixedHeader={() => (
                        <Toolbar title="New Details" back={true}/>
                    )}
                    renderBackground={() => (
                        <View style={{marginTop: 60}}>
                            <Image style={style.productItem} source={{uri: this.props.post.better_featured_image.source_url}}  />
                        </View>
                    )}
                    renderForeground={() => (
                           <View style={style.detailPanel}>
                                <View style={[style.detailBlock, {backgroundColor: this.props.color, opacity: 0.8} ]}>
                                    <Text style={style.detailDesc}>{this.getDescription(this.props.post.title.rendered) }
                                    </Text>
                                </View>
                            </View>
                          )}>

                    <View style={style.html}>
                        <HTML html={this.props.post.content.rendered}
                              htmlStyles={htmlStyle}
                              renderers={renderers}/>
                    </View>
                </ParallaxScrollView>
            </View>
        );
    }
}


