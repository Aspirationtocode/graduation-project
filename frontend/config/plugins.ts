import { Plugin } from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { default as CleanWebpackPlugin } from "clean-webpack-plugin";
import { Chunks } from "./types";
import { paths } from "../../common/paths";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export const webpackPlugins: Plugin[] = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: paths.frontend.INDEX_HTML,
    chunks: [Chunks.INDEX]
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  new CleanWebpackPlugin()
];
