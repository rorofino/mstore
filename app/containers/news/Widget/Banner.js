'use strict';

import React, {Component} from "react";
import {Text, TouchableOpacity, View, Image, ListView, StatusBar, ActivityIndicator} from "react-native";
import {Actions} from "react-native-router-flux";
import Swiper from "react-native-swiper";
import TimeAgo from "react-native-timeago";
import news from "./../style";
import ApiNews from "./../../../services/ApiNews";
import EventEmitter from "./../../../utils/AppEventEmitter";

export default class Banner extends Component {
    constructor(props) {
        super(props);
        this.data = [];

        this.state = {
            stickyPosts: null,
        }
    }

    componentDidMount() {
        this.fetchPostBanner();
        EventEmitter.addListener('posts.updateBanner', this.fetchPostBanner.bind(this));
    }

    fetchPostBanner(data) {
        var self = this, categoryId = null;

        if (typeof data != 'undefined') {
            categoryId = data.category;
        }

        // get highlight posts
        ApiNews.getPosts({
            'per_page': 5,
            'page': 1,
            'filter[cat]': categoryId,
            'sticky': true
        })
            .then(function (data) {
                console.log('sticky data', data);
                if (data.length > 0) {
                    self.setState({stickyPosts: data});
                }
            });
    }

    render() {
        if (this.state.stickyPosts === null) {
            return <View style={{height: 200}}>
                <ActivityIndicator size='large' style={news.bannerImage}/>
            </View>
        }

        return <View style={{height: 220}}>
            <Swiper
                dot={<View style={{
                    backgroundColor: 'rgba(0,0,0,.1)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 4,
                    marginRight: 4
                }}/>}
                activeDot={<View style={{
                    backgroundColor: 'rgba(0,0,0,.4)',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 4,
                    marginRight: 4
                }}/>}
                paginationStyle={{top: -220, right: 10}}
            >
                {this.state.stickyPosts.map((post, i) => {
                    if (post.better_featured_image != null) {
                        return <View key={'sticky' + i}>
                            <Image style={news.bannerImage}
                                   defaultSource={require('../../../images/placeholderImage.png')}
                                   source={{uri: post.better_featured_image.source_url}}></Image>

                            <TouchableOpacity onPress={Actions.postDetails.bind(this, {post: post}) }
                                              style={news.bannerText}>
                                <Text style={news.bannerTitle}>{post.title.rendered}</Text>
                                <Text style={news.bannerDate}><TimeAgo time={post.date}/></Text>
                            </TouchableOpacity>
                        </View>
                    }
                })}
            </Swiper>
        </View>
    }
}
