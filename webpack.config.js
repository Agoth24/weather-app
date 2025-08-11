const path = require("path");
const HTMLWebpackPlugin = require(`html-webpack-plugin`);
module.exports = {
  mode: `development`,
  entry: "./src/index.js",
  output: {
    filename: `main.js`,
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: `source-map`,
  plugins: [
    new HTMLWebpackPlugin({
      template: `./src/template.html`,
    }),
  ],
  devServer: {
    watchFiles: [`./src/template.html`],
    static: `./dist`,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
