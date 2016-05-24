var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

commonWebpackConfig = require('./webpack.config');

productionWebpackConfig = Object.assign(commonWebpackConfig, {
  cache: true,
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/static/',
  },
});

productionWebpackConfig.plugins.push(new HtmlWebpackPlugin({
  template: 'server/static/index.html'
}));
productionWebpackConfig.plugins.push(new ExtractTextPlugin('styles.[hash].css'));
productionWebpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
productionWebpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
  })
);
productionWebpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
);

module.exports = productionWebpackConfig;