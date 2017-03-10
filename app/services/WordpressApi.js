import React, {Component} from "react";
import {AsyncStorage} from "react-native";

/**
 * init class API
 * @param opt
 * @returns {WordpressAPI}
 * @constructor
 */
function WordpressAPI(opt) {
    if (!(this instanceof WordpressAPI)) {
        return new WordpressAPI(opt);
    }
    opt = opt || {};
    this.classVersion = '1.0.0';
    this._setDefaultsOptions(opt);
}

/**
 * Default option
 * @param opt
 * @private
 */
WordpressAPI.prototype._setDefaultsOptions = async function (opt) {
    this.url = opt.url;
    this.logo = opt.logo;
    this.tags = null;
    this.categories = null;

    console.log('init api');

    this.getTags();
    this.getCategories();
};

/**
 * Get tags
 * @returns {axios.Promise}
 */
WordpressAPI.prototype.getTags =  function () {
    var tagMapping = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF9800', '#FF5722', '#795548', '#607D8B'];
    var self = this;
    var requestUrl = this.url + '/wp-json/wp/v2/tags?per_page=40';

    if (this.tags !== null) {
        return this.tags;
    }

    return this._request(requestUrl).then(function(data) {
        if (data.length > 0) {
            var tagsList = [];
            data.map((tag) => {
                tagsList[tag.id] = {
                    text: tag.name,
                    color: tagMapping[tag.id % 14]
                };
            });
            self.tags = tagsList;
            return tagsList;
        }
    });
}

/**
 * Get list of categories
 * @param callBack
 * @returns {axios.Promise|*|Promise.<TResult>}
 */
WordpressAPI.prototype.getCategories =  function (callBack) {
    var requestUrl = this.url + '/wp-json/wp/v2/categories?parent=0';

    if (this.categories !== null)   {
        return this.categories;
    }
    return this._request(requestUrl).then(function(data)   {
        this.categories = data;
        return data;
    })
}

/**
 * Request to the server
 * @param url
 * @param callback
 * @returns {axios.Promise}
 * @private
 */
WordpressAPI.prototype._request = function (url, callback) {
    return fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            if (typeof callback == 'function') {
                callback();
            }
            return responseData;
        })
}

/**
 * Get default logo from Wordpress
 * @returns {logo|{height, width, marginLeft}|{marginBottom, marginTop, height, width, alignSelf}|boolean|{width, height, resizeMode, marginTop, marginBottom, marginLeft}|{resizeMode, height, marginTop, marginRight, marginBottom, marginLeft}|*}
 */
WordpressAPI.prototype.getLogo = function () {
    return this.logo;
}


WordpressAPI.prototype.join = function (obj, separator) {
    var arr = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key + '=' + obj[key]);
        }
    }
    return arr.join(separator);
}

/**
 * Get posts listing
 * @param data
 * @param callback
 * @returns {axios.Promise}
 */
WordpressAPI.prototype.getPosts = function (data, callback) {
    var requestUrl = this.url + '/wp-json/wp/v2/posts/?filter[orderby]=id';
    if (data) {
        requestUrl += '&' + this.join(data, '&');
    }

    console.log(requestUrl);
    return this._request(requestUrl, callback);
};


export default WordpressAPI;
