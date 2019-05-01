import { render } from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import * as React from "react";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import "./styles/common";
import { CRouter } from "src/containers/CRouter/CRouter";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: "jss-insertion-point"
});

const rootContainer = document.getElementById("root");

const entryComponent = (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <CRouter />
  </JssProvider>
);

export default function renderRoot() {
  render(entryComponent, rootContainer);
}
