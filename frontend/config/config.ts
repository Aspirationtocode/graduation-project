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

  output: {
    filename: "[name].bundle.js",
    path: paths.frontend.DIST,
    publicPath: "./"
  },

  mode: Environment.isDev ? "development" : "production",

  module: webpackModule,

  plugins: webpackPlugins,

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};
