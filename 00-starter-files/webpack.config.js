var path = require("path");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    port: 3000,
    https: true,
    contentBase: path.join(__dirname, "dist")
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJSPlugin()]
  }
};
