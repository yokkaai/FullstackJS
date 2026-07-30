// Встановлення плагінів
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const EslintPlugin = require("eslint-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDevelopment ? "[name].js" : "[name].[contenthash].js",
    clean: true,
  },

  devtool: isDevelopment ? "eval-source-map" : "source-map",

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },

  module: {
    rules: [
      // JS TS React
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              // "@babel/preset-env-react",
            ],
          },
        },
      },
      //   Css
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractkPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      //SCSS/Sass
      {
        test: /\.(scss|sass)$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractkPlugin,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      //   Less
      {
        test: /\.less$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractkPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // img
      {
        test: /\.(png|jpeg|jpg|gif|webp)$/i,
        type: "assets/resource",
      },
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: !isDevelopment && {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCS: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? "[name].css"
        : "styles/[name].[contenthash].css",
      chunkFilename: isDevelopment
        ? "[id].css"
        : "styles/[id].[contenthash].css",
    }),
    new EslintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      fix: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: isDevelopment ? "static" : "disabled",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    }),
  ],
};
