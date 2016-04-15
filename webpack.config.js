const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(ROOT_PATH, 'client/src/index.jsx')
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css']
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'client/public/dist'),
    filename: 'bundle.js',
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'client/public'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: plugins
};
