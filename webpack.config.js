const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  mode: "development",
  entry: {
    path: path.join(CURRENT_WORKING_DIR, "client/src/index.js"),
  },
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".json", ".css", ".scss", ".html"],
    alias: {
      app: "client/src",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(CURRENT_WORKING_DIR, "client/public/index.html"),
      inject: true,
    }),
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(CURRENT_WORKING_DIR, "client/public"),
          to: path.join(CURRENT_WORKING_DIR, "dist/public"),
        },
      ],
    }),
  ],
  devServer: {
    port: 8000,
    open: true,

    compress: true,
    hot: true,
    historyApiFallback: true,
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }
  },
  //   devtool: "eval-source-map",
};

module.exports = config;
