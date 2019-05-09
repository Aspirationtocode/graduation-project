import { Configuration } from "webpack";
import { Environment } from "./environment";
import { Chunks } from "./types";
import { webpackPlugins } from "./plugins";
import { webpackModule } from "./module";
import { paths } from "../../common/paths";

export const config: Configuration = {
  entry: {
    [Chunks.INDEX]: paths.frontend.ENTRY
  },
  target: "web",
  output: {
    filename: "[name].bundle.js",
    path: paths.frontend.DIST,
    publicPath: ""
  },

  mode: Environment.isDev ? "development" : "production",

  module: webpackModule,

  plugins: webpackPlugins,

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".styl"],
    alias: {
      src: paths.frontend.SOURCE,
      server: paths.common.SERVER
    }
  },

  devServer: {
    contentBase: paths.frontend.DIST,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  }
} as Configuration;
