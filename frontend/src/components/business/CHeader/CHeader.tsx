import * as React from "react";
import * as classNames from "classnames/bind";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Switch, Route, RouteComponentProps, Link } from "react-router-dom";
import { inject } from "modelsApi";
import { AuthRepository } from "src/core/repositories/AuthRepository/authRepository";
import Drawer from "@material-ui/core/Drawer";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { CLeftPanel } from "src/components/business/CLeftPanel/CLeftPanel";
import { observer } from "mobx-react";
const css = classNames.bind(require("./CHeader.styl"));

interface CHeaderState {
  isDrawerOpened: boolean;
}

@observer
export class CHeader extends React.Component<{}, CHeaderState> {
  state = {
    isDrawerOpened: false
  };

  @inject private authRepository: AuthRepository;
  render() {
    const { isDrawerOpened } = this.state;
    const hasAuth = this.authRepository.hasAuth();

    return (
      <div className={css("header")}>
        <Drawer
          open={isDrawerOpened && hasAuth}
          anchor={"left"}
          onClose={this.toggleDrawer}
        >
          <CLeftPanel />
        </Drawer>
        <AppBar position="static">
          <Toolbar className={css("header-toolbar")}>
            {hasAuth && (
              <IconButton color="inherit" onClick={this.toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
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
    return (
      <Switch>
        <Route
          path={"/signup"}
          render={(props: RouteComponentProps) => {
            return (
              <Link className={css("header-link")} to={"/signin"}>
                <Button variant="contained" size="small" color="secondary">
                  Sign In
                </Button>
              </Link>
            );
          }}
        />
        <Route
          path={"/signin"}
          render={(props: RouteComponentProps) => {
            return (
              <Link className={css("header-link")} to={"/signup"}>
                <Button variant="contained" size="small" color="secondary">
                  Sign Up
                </Button>
              </Link>
            );
          }}
        />
        <Route
          path={"*"}
          render={(props: RouteComponentProps) => {
            return (
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={this.logout}
              >
                Logout
              </Button>
            );
          }}
        />
      </Switch>
    );
  }

  private toggleDrawer = () => {
    this.setState(prevState => ({
      isDrawerOpened: !prevState.isDrawerOpened
    }));
  };

  private logout = () => {
    this.authRepository.logout();
  };
}
