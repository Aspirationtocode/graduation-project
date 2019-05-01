import * as React from "react";
import * as classNames from "classnames/bind";
import { Toolbar, AppBar, Typography, Button } from "@material-ui/core";
const css = classNames.bind(require("./CHeader.styl"));

export class CHeader extends React.Component {
  render() {
    return (
      <div className={css("header")}>
        <AppBar position="static">
          <Toolbar className={css("header-toolbar")}>
            <Typography variant="h6" color="inherit">
              Сorporate information system
            </Typography>
            <Button variant="contained" size="small" color="secondary">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
