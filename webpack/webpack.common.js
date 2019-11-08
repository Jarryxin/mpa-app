const path = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const SRC_PATH = path.resolve(__dirname, '../src')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name]-[hash:4].js',
    chunkFilename: '[name]-[hash:8].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx', '.es'],
    alias: {
      'react-dom': process.env.NODE_ENV === 'development'? '@hot-loader/react-dom': 'react-dom',
    }
  },
  module: {
    rules: [
      {
        exclude: [/\.html$/, /\.(js|jsx|ts|tsx)$/, /\.css$/, /\.json$/, /\.svg$/],
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }
      },
      {
        test: /\.(js|jsx|es|ts|tsx)$/,
        include: SRC_PATH,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.svg$/,
        include: SRC_PATH,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production',
      test: /\.(jpe?g|png|gif|svg)$/i,
    }),
  ]
}