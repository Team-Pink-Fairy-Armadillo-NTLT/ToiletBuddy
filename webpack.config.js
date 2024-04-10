const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./client/index.js",
  plugins: [new HtmlWebpackPlugin({
    title: 'Development',
    template: './index.html'
  })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [
                    ["@babel/preset-env", { targets: "defaults" }],
                    ["@babel/preset-react"],
                  ],
                },
              },
        ],
      },
      {
        test: /\.[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: '/build/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    proxy: [
      {
        context: [],
        secure: false,
        target: 'http://localhost:3000',
      },
    ],
    hot: true
  },
};
