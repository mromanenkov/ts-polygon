const webpack = require('webpack');

module.exports = {
    entry: { 
      main: [
      //'webpack-dev-server/client?http://localhost:8081',
      './src/main.tsx'
    ]},
    //entry: './src/main.tsx',
    output: {
      filename: './public/bundle.js',
    },
    watch: true,
    devtool: 'source-map',
    
    module: {
      loaders: [{
        test: /\.ts|\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      hot: true,
      contentBase: './',
    }
  };
