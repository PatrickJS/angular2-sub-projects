var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var path = require('path');

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      // TypeScript
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /node_modules/ ] }
    ]
  },
};


var clientConfig = {
  devtool: 'source-map',
  target: 'web',
  entry: {
    polyfills: './src/polyfills',
    client: './src/client'
  },
  output: {
    path: path.join(__dirname, 'dist', 'client')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: false,
    Buffer: false
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
  ],
};


var serverConfig = {
  target: 'node',
  entry: './src/server',
  output: {
    path: path.join(__dirname, 'dist', 'server'),
    filename: 'server.bundle.js'
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};



// Default config
var defaultConfig = {
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ]
  },
  context: __dirname,
  resolve: {
    root: path.join(__dirname, '/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: '[name].bundle.js'
  }
}




module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}
