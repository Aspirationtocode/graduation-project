import { Plugin } from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { default as CleanWebpackPlugin } from "clean-webpack-plugin";
import { Chunks } from "./types";
import { paths } from "../../common/paths";

export const webpackPlugins: Plugin[] = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: paths.frontend.INDEX_HTML,
    chunks: [Chunks.INDEX]
  }),
  new CleanWebpackPlugin()
];
