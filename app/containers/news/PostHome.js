'use strict';

import React, {Component} from "react";
import {Text, View, Image, ListView, TouchableOpacity, ScrollView} from "react-native";
import style from "./style";
import Post from "./Post";
const Constants = {
    Post: {
        layout_one: 1,
        layout_two: 2,
        layout_three: 3
    },
    colors: [
        'rgba(58, 75, 133, 0.6)',
        'rgba(188, 59, 36, 0.6)',
        'rgba(57, 174, 84, 0.6)',
        'rgba(188, 59, 36, 0.6)',
        'rgba(141, 114, 91, 0.6)',
        'rgba(128, 140, 141, 0.6)'
    ],
}
import Languages from "./../../Languages";

import ApiNews from "./../../services/ApiNews";

export default class PostHome extends Component {

    constructor(props) {
        super(props);
        this.data = [];

        this.state = {
            limit: 10,
            page: 1,
            isLoading: false,
            finish: false,
            hasData: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => true
            })
        };
    }

    componentDidMount() {
        this.fetchPostData();
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
            'hasData': true,
            'filter[cat]': this.categoryActive,
            'sticky': false
        };
        if (typeof isReload !== 'undefined') {
            postData.page = 1;
        }

        self.setState({isLoading: true});

        ApiNews.getPosts(postData)
            .then(function (data) {
                console.log('posts data here: ', data);

                if (data != null) {
                    self.data = self.data.concat(data);
                    self.setState({
                        page: self.state.page + 1,
                        finish: data.length < self.state.limit,
                        isLoading: false,
                        dataSource: self.getDataSource(self.data)
                    });
                }

            }).done();
    }

    getDataSource(posts) {
        return this.state.dataSource.cloneWithRows(posts);
    }

    renderRow(layout, post) {
        return <Post post={post} layout={layout}/>
    }

    getPlaceHolderColor() {
        var randColor = Constants.colors.length;
        return {backgroundColor: Constants.colors[Math.floor(Math.random() * randColor)]};
    }

    scrollView(layout) {
        // if (this.state.isLoading == true) {
        //     return <View/>
        //
        //     return <View style={[style.placeHolderImage, this.getPlaceHolderColor()]}>
        //         <Spinner isVisible={this.state.isLoading}
        //                  size={30}
        //                  type="ThreeBounce"
        //                  color="#ffffff"/>
        //     </View>
        // }

        return <ListView
            style={style.body}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderRow={this.renderRow.bind(this, layout)}>
        </ListView>
    }

    render() {
        return (
            <View style={style.hlist}>
                <ScrollView>
                    <View style={{marginTop: 8}}/>
                    {this.scrollView(Constants.Post.layout_three)}
                    <View>
                        <Text style={style.title}>{Languages.FeatureArticles}</Text>
                        {/*<Text style={style.titleSmall}>Powered by BeoNews</Text>*/}
                    </View>
                    {this.scrollView(Constants.Post.layout_two)}

                    <View>
                        <Text style={style.title}>{Languages.MostViews}</Text>
                        {/*<Text style={style.titleSmall}>Powered by BeoNews</Text>*/}
                    </View>
                    {this.scrollView(Constants.Post.layout_three)}

                    <View>
                        <Text style={style.title}>{Languages.EditorChoice}</Text>
                        {/*<Text style={style.titleSmall}>Powered by BeoNews</Text>*/}
                    </View>
                    {this.scrollView(Constants.Post.layout_one)}

                    <View style={{marginBottom: 40}}/>
                </ScrollView>
            </View>
        );
    }
}
