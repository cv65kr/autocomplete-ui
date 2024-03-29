const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

/**
 * Development configuration
 */
const browserConfig = merge(baseConfig, {
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'apisearch-autocomplete.js',
        libraryTarget: 'umd',
        library: 'apisearchAutocomplete'
    }
});

module.exports = [browserConfig];