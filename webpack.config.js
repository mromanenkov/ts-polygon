module.exports = {
    entry: './src/main.ts',
    output: {
      filename: './public/bundle.js',
    },
    watch: true,
    devtool: 'source-map',
    
    module: {
      loaders: [{
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
  };
