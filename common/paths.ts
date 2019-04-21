import * as path from "path";

export const paths = {
  frontend: {
    SOURCE: path.resolve(__dirname, "../frontend/src"),
    DIST: path.resolve(__dirname, "../frontend/dist"),
    ENTRY: path.resolve(__dirname, "../frontend/src/index"),
    INDEX_HTML: path.resolve(__dirname, "../frontend/src/index.html")
  }
};
