import { Module } from "webpack";
import { paths } from "../../common/paths";
import { Environment } from "./environment";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { isProd } = Environment;

const rules = [
  {
    test: /\.(ts|tsx|js|jsx)$/,
    use: [
      {
        loader: "babel-loader"
      },
      {
        loader: "ts-loader"
      }
    ],
    include: paths.frontend.SOURCE,
    exclude: /node_modules/
  },
  {
    test: /\.styl$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: true,
          sourceMap: !isProd,
          localIdentName: isProd
            ? "[hash:base64:5]"
            : "[name]__[local]___[hash:base64:5]"
        }
      },
      {
        loader: "stylus-loader"
      }
    ]
  }
];

export const webpackModule: Module = {
  rules
};
