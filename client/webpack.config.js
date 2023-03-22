const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      // jw, I am adding remaining entrie points
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // jw, I will use ./index.html as a template for the manifest file
      // jw, updated from 26-Stu_Manifest
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),

      new WebpackPwaManifest({
        // TODO: Create a manifest.json:
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#ffffff', // jw, White
        theme_color: '#00FFFF', // jw, Aqua
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // jw, updated accordingly
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
        ]
        
      }),     
      
    ],

    module: {
      rules: [
        // jw, updated from 26-Stu_Manifest
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },        
      ],
    },
  };
};
