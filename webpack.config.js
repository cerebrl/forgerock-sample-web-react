const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Point to the top level source file
  entry: {
    app: './client/index.js',
  },
  // This helps provide better debugging in browsers
  devtool: 'source-map',
  // The location of where the built files are placed
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  // Dictates some behavior in Webpack, "development" is a bit quicker
  mode: 'development',
  // Modules are essentially plugins that can extend/modify Webpack
  // Here, we are using it to transpile React's JSX to ordinary functions
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          // Babel is a JavaScript transpiler (kind of like a compiler)
          // It converts unsupported features to something browser's can use
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { esmodules: true }}],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [ require('autoprefixer') ]
              }
            }
          },
          'sass-loader',
        ]
      }
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
