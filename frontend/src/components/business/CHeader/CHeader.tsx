import * as React from "react";
import * as classNames from "classnames/bind";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
const css = classNames.bind(require("./CHeader.styl"));

interface NoAuthNavigationLink {
  text: string;
  link: string;
}

export class CHeader extends React.Component {
  private noAuthNavigationLinks: NoAuthNavigationLink[] = [
    {
      text: "Sign Up",
      link: "/signup"
    },
    {
      text: "Sign In",
      link: "/signin"
    }
  ];

  render() {
    return (
      <div className={css("header")}>
        <AppBar position="static">
          <Toolbar className={css("header-toolbar")}>
            <Typography variant="h6" color="inherit">
              Сorporate information system
            </Typography>
            {this.renderNoAuthNavigation()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private renderNoAuthNavigation() {
    const links = this.noAuthNavigationLinks.map((link, index) => {
      return (
        <NavLink
          key={index}
          to={link.link}
          className={css("header-link")}
          activeClassName={css("active")}
        >
          <Button variant="contained" size="small" color="secondary">
            {link.text}
          </Button>
        </NavLink>
      );
    });
    return <div className={css("header-links")}>{links}</div>;
  }
}
