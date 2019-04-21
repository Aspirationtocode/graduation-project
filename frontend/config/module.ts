import { Module } from "webpack";
import { paths } from "../../common/paths";

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
  }
];

export const webpackModule: Module = {
  rules
};
