/*
 * WooCommerce API
 * DO NOT TOUCH!
 */
'use strict'

import OAuth from 'oauth-1.0a'

export default WooCommerceAPI

/**
 * WooCommerce REST API wrapper
 *
 * @param {Object} opt
 */
function WooCommerceAPI(opt) {
    if (!(this instanceof WooCommerceAPI)) {
        return new WooCommerceAPI(opt)
    }

    opt = opt || {}

    if (!(opt.url))         throw new Error('url is required')
    if (!(opt.consumerKey))         throw new Error('consumerKey is required')
    if (!(opt.consumerSecret))         throw new Error('consumerSecret is required')

    this.classVersion = '1.0.0'
    this._setDefaultsOptions(opt)
}

/**
 * Set default options
 *
 * @param {Object} opt
 */
WooCommerceAPI.prototype._setDefaultsOptions = function (opt) {
    this.url = opt.url
    this.wpAPI = opt.wpAPI || false
    this.wpAPIPrefix = opt.wpAPIPrefix || 'wp-json'
    this.version = opt.version || 'v3'
    this.isSsl = /^https/i.test(this.url)
    this.consumerKey = opt.consumerKey
    this.consumerSecret = opt.consumerSecret
    this.verifySsl = opt.verifySsl
    this.encoding = opt.encoding || 'utf8'
    this.queryStringAuth = opt.queryStringAuth || false
    this.port = opt.port || ''
    this.timeout = opt.timeout
}

/**
 * Normalize query string for oAuth
 *
 * @param  {string} url
 * @return {string}
 */
WooCommerceAPI.prototype._normalizeQueryString = function (url) {
    // Exit if don't find query string
    if (-1 === url.indexOf('?')) return url


    // let query       = _url.parse(url, true).query;
    let query = url
    let params = []
    let queryString = ''

    for (let p in query) params.push(p)
    params.sort()

    for (let i in params) {
        if (queryString.length) queryString += '&'

        queryString += encodeURIComponent(params[i]).replace('%5B', '[').replace('%5D', ']')
        queryString += '='
        queryString += encodeURIComponent(query[params[i]])
    }

    return url.split('?')[0] + '?' + queryString
}

/**
 * Get URL
 *
 * @param  {String} endpoint
 *
 * @return {String}
 */
WooCommerceAPI.prototype._getUrl = function (endpoint) {
    let url = '/' === this.url.slice(-1) ? this.url : this.url + '/'
    let api = this.wpAPI ? this.wpAPIPrefix + '/' : 'wp-json/'

    url = url + api + this.version + '/' + endpoint

    // Include port.
    if ('' !== this.port) {
        let hostname = url //_url.parse(url, true).hostname;
        url = url.replace(hostname, hostname + ':' + this.port)
    }

    if (!this.isSsl)
        return this._normalizeQueryString(url)

    return url
}

/**
 * Get OAuth
 *
 * @return {Object}
 */
WooCommerceAPI.prototype._getOAuth = function () {
    let data = {
        consumer: {
            public: this.consumerKey,
            secret: this.consumerSecret
        },
        signature_method: 'HMAC-SHA256'
    }

    if (-1 < ['v1', 'v2'].indexOf(this.version)) data.last_ampersand = false

    return new OAuth(data)
}

/**
 * Join key object value to string by separator
 */
WooCommerceAPI.prototype.join = function (obj, separator) {
    let arr = []
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key + '=' + obj[key])
        }
    }

    return arr.join(separator)
}

/**
 * Do requests
 *
 * @param  {String}   method
 * @param  {String}   endpoint
 * @param  {Object}   data
 * @param  {Function} callback
 *
 * @return {Object}
 */
WooCommerceAPI.prototype._request = function (method, endpoint, data, callback) {
    let url = this._getUrl(endpoint)

    let params = {
        url: url,
        method: method,
        encoding: this.encoding,
        timeout: this.timeout,
        headers: {
            'User-Agent': 'WooCommerce API React Native/' + this.classVersion,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    if (this.isSsl) {
        if (this.queryStringAuth) {
            params.qs = {
                consumer_key: this.consumerKey,
                consumer_secret: this.consumerSecret
            }
        } else {
            params.auth = {
                user: this.consumerKey,
                pass: this.consumerSecret
            }
        }

        params.strictSSL = this.verifySsl
    }
    else {
        if (method == 'GET') {
            params.qs = this._getOAuth().authorize({
                url: url,
                method: method,
                data: data
            })
        } else if (method == 'POST') {
            params.qs = this._getOAuth().authorize({
                url: url,
                method: method,
            })
        }
    }

    // encode the oauth_signature to make sure it not remove + charactor
    params.qs.oauth_signature = encodeURIComponent(params.qs.oauth_signature)
    let requestUrl = params.url + '?' + this.join(params.qs, '&')

    let _header
    let _body
    if (method == 'GET') {
        _header = {'Cache-Control': 'no-cache'}
    } else if (method == 'POST') {
        _header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        _body = JSON.stringify(data)
    }

    // console.log('encode', params.qs.oauth_signature);
    console.log(requestUrl)
    // alert(requestUrl);

    return fetch(requestUrl, {
        method: method,
        headers: _header,
        body: _body,
    })
        .then((response) => response.json())
        .then((responseData) => {
            if (typeof callback == 'function') {
                callback()
            }
            //console.log(responseData)
            return responseData
        }).catch((error) => console.warn(error))
}

/**
 * GET requests
 *
 * @param  {String}   endpoint
 * @param  {Function} callback
 *
 * @return {Object}
 */
WooCommerceAPI.prototype.get = function (endpoint, data, callback) {
    return this._request('GET', endpoint, data, callback)
}

/**
 * POST requests
 *
 * @param  {String}   endpoint
 * @param  {Object}   data
 * @param  {Function} callback
 *
 * @return {Object}
 */
WooCommerceAPI.prototype.post = function (endpoint, data, callback) {
    return this._request('POST', endpoint, data, callback)
}

/**
 * PUT requests
 *
 * @param  {String}   endpoint
 * @param  {Object}   data
 * @param  {Function} callback
 *
 * @return {Object}
 */
WooCommerceAPI.prototype.put = function (endpoint, data, callback) {
    return this._request('PUT', endpoint, data, callback)
}

/**
 * DELETE requests
 *
 * @param  {String}   endpoint
 * @param  {Function} callback
 *
 * @return {Object}
 */
WooCommerceAPI.prototype.delete = function (endpoint, callback) {
    return this._request('DELETE', endpoint, null, callback)
}

/**
 * OPTIONS requests
 *
 * @param  {String}   endpoint
 * @param  {Function} callback
 *
 * @return {Object}
 */
WooCommerceAPI.prototype.options = function (endpoint, callback) {
    return this._request('OPTIONS', endpoint, null, callback)
}
