const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)],
};

module.exports = config;
