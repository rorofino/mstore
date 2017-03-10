import React, {Component} from "react";
import {View, Text, Animated, ScrollView, TouchableOpacity} from "react-native";
import Toolbar from "./../../../components/Toolbar"
import css from "./../style_2";
import ApiNews from "./../../../services/ApiNews";
import EventEmitter from "./../../../utils/AppEventEmitter";
import news from "./../style";
import {Actions} from "react-native-router-flux";

export default class PostMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paddingTop: 100,
            categories: null,
            categoryActive: null,
            _animatedMenu: this.props.animateMenu
        }
    }

    fetchData() {
        var self = this;
        // init categories
        ApiNews.getCategories()
            .then((data) => {
                console.log('getCategories', data);
                self.setState({categories: data});
            });
    }

    componentWillMount() {
        this.fetchData();
    }


    /**
     * Format the category name
     * @param string
     * @returns {string}
     */
    upCaseTitle(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    /**
     * Set active category
     * @param cateId
     */
    setActiveCategory(cateId) {
        console.log(cateId);
        // this.categoryActive = cateId;
        this.setState({categoryActive: cateId});
        EventEmitter.emit('posts.updateCategory', {category: cateId});
        EventEmitter.emit('posts.updateBanner', {category: cateId});
    }

    updateLayout() {
        this.setState({ oneColumnLayout: !this.state.oneColumnLayout});
    }

    render() {
        console.log('this.state.categories', this.state.categories);
        if (this.state.categories === null) {
            return <View style={[css.toolbarView, {transform: [{translateY: 0}]}]}>
                <Toolbar name="Mstore News" action={Actions.news} newsLayoutButton={true} searchButton={true}/>

                <View style={news.menuView}></View>
            </View>
        }

        return <Animated.View style={[css.toolbarView, {transform: [{translateY: this.state._animatedMenu}]}]}>
            <Toolbar name="Mstore News"  action={Actions.news}  newsLayoutButton={true} searchButton={true}/>

            <View style={news.menuView}>
                <ScrollView directionalLockEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}>

                    <TouchableOpacity
                        onPress={ this.setActiveCategory.bind(this, null) }
                        style={[news.menuItemView, this.state.categoryActive == null ? news.menuItemActive : null ]}>
                        <Text
                            style={[news.menuItem, this.state.categoryActive == null ? news.menuActiveText : null ]}>All</Text>
                    </TouchableOpacity>

                    {this.state.categories.map((category, i) => {
                        return <TouchableOpacity onPress={this.setActiveCategory.bind(this, category.id) }
                                                 key={category.id}
                                                 style={[news.menuItemView, this.state.categoryActive == category.id ? news.menuItemActive : null]}>
                            <Text
                                style={[news.menuItem, this.state.categoryActive == category.id ? news.menuActiveText : null]}>{this.upCaseTitle(category.name) }</Text>
                        </TouchableOpacity>
                    })}

                </ScrollView>
            </View>
        </Animated.View>
    }
}
