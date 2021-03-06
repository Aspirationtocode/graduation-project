import { Plugin, DefinePlugin, NormalModuleReplacementPlugin } from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { default as CleanWebpackPlugin } from "clean-webpack-plugin";
import { Chunks } from "./types";
import { paths } from "../../common/paths";
import { FRONTEND_ENV_CONFIG } from "./environmentConfig";
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
  new CleanWebpackPlugin(),
  new DefinePlugin({
    FRONTEND_ENV_CONFIG: JSON.stringify(FRONTEND_ENV_CONFIG)
  }),
  // ...here are any other existing plugins that we already have
  new NormalModuleReplacementPlugin(/type-graphql$/, (resource: any) => {
    resource.request = resource.request.replace(
      /type-graphql/,
      "type-graphql/dist/browser-shim"
    );
  })
];
