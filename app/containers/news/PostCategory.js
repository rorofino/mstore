'use strict';

import React, {Component} from "react";
import {Text, View, Image, ListView, TouchableOpacity, ScrollView, StatusBar} from "react-native";
import {Actions} from "react-native-router-flux";
import Spinner from "react-native-spinkit";
import TimeAgo from "react-native-timeago";
import PostHome from "./PostHome";
import Banner from "./Widget/Banner";
import news from "./style";

import css from "./style_2";
import ApiNews from "./../../services/ApiNews";
import EventEmitter from "./../../utils/AppEventEmitter";


export default class PostCategory extends Component {
    constructor(props) {
        super(props);
        this.data = [];
        // this.tags = [];
        this.categoryActive = null;

        this.state = {
            isOneLayout: true,
            page: 1,
            limit: 5,
            state: null,
            isLoading: true,
            finish: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => true
            })
        }
    }

    componentWillMount() {
        // this.fetchTags();
        EventEmitter.addListener('posts.fetchData', this.fetchPostData.bind(this)); // Register event listener
        EventEmitter.addListener('posts.updateCategory', this.updateCategory.bind(this));
        EventEmitter.addListener('news.changeLayout', this.changeLayout.bind(this));
    }

    changeLayout() {
        this.setState({isOneLayout: !this.state.isOneLayout})
    }

    /**
     * fetching Tags data
     */
    fetchTags() {
        var self = this;
        ApiNews.getTags()
            .then((data) => {
                console.log('getTags', data);
                this.tags = data;
                self.setState({isLoading: false});
                self.fetchPostData();
            });
    }

    /**
     * Update current active category from the menu
     * @param data
     */
    updateCategory(data) {
        if (typeof data != 'undefined') {
            this.categoryActive = data.category;
            this.data = [];
            this.setState({
                page: 1,
                finish: false,
                dataSource: this.getDataSource(this.data)
            });
        }

        // reload the post
        this.fetchPostData(true)
    }

    /**
     * Fetching data from Wordpress API
     * @param data
     */
    fetchPostData(isReload) {
        var self = this;

        if (typeof isReload == 'undefined' && (this.state.finish || this.state.isLoading)) {
            return;
        }

        let postData = {
            'per_page': this.state.limit,
            'page': this.state.page,
            'filter[cat]': this.categoryActive,
            'sticky': false
        };
        if (typeof isReload !== 'undefined') {
            postData.page = 1;
        }

        self.setState({isLoading: true});

        ApiNews.getPosts(postData)
            .then(function (data) {
                console.log('posts data', data);
                self.data = self.data.concat(data);
                self.setState({
                    page: self.state.page + 1,
                    finish: data.length < self.state.limit,
                    isLoading: false,
                    dataSource: self.getDataSource(self.data)
                });
            }).done();
    }

    /**
     * Get data source for the list view
     * @param posts
     * @returns {*}
     */
    getDataSource(posts) {
        return this.state.dataSource.cloneWithRows(posts);
    }

    /**
     * Render row for the list view
     * @param post
     * @param sectionID
     * @param rowID
     * @returns {*}
     */
    renderRow(post, sectionID, rowID) {
        var oddStyle = rowID % 2 == 1 ? {backgroundColor: '#F8F8F8'} : '';
        if (typeof (post.title) == 'undefined' || post.better_featured_image == null) {
            return null;
        }

        var colorMapping = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF9800', '#FF5722', '#795548', '#607D8B'];
        var color = colorMapping[rowID % 14];

        // large view layout
        if (this.state.isOneLayout) {
            return (
                <TouchableOpacity onPress={Actions.postDetails.bind(this, {post: post, color: color})}>
                    <Image style={news.largeImage} source={{uri: post.better_featured_image.source_url }}></Image>

                    <View style={[news.largeContent, {backgroundColor: color, opacity: 0.8}]}>
                        <Text style={news.largeTitle}>{post.title.rendered} </Text>
                        <Text style={news.largeTime}><TimeAgo time={post.date} hideAgo={true}/></Text>
                    </View>
                </TouchableOpacity>
            )
        }

        // list view layout
        return (
            <TouchableOpacity onPress={Actions.postDetails.bind(this, {post: post})} style={[news.card, oddStyle]}>
                <Image style={news.image} source={{uri: post.better_featured_image.source_url }}></Image>

                <View style={news.content}>
                    <Text>{post.title.rendered} </Text>
                    <Text style={news.time}><TimeAgo time={post.date} hideAgo={true}/></Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const loadingIcon =
            <View style={css.spinner}>
                <Spinner isVisible={this.state.isLoading}
                         size={50}
                         type= "ThreeBounce"
                         color="#1CAADE"/>
            </View>


        if (this.categoryActive == null) {
            return <View>
                <Banner />
                <PostHome />
            </View>
        }

        return (
            <View>
                <ListView
                    style={news.body}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}>
                </ListView>
                {loadingIcon}
            </View>
        );
    }
}
