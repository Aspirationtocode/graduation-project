import * as React from "react";
import * as classNames from "classnames/bind";
import { Switch, Route, Redirect } from "react-router";
import { CProtectedRoute } from "src/containers/CRouter/components/CProtectedRoute";
import { CSignInView } from "src/views/CSignInView/CSignInView";
import { CHeader } from "src/components/business/CHeader/CHeader";
import { CSignUpView } from "src/views/CSignUpView/CSignUpView";

const css = classNames.bind(require("./CMainLayout.styl"));

export class CMainLayout extends React.Component {
  render() {
    return (
      <div className={css("main-layout")}>
        <CHeader />
        <div className={css("main-layout__content")}>{this.renderRoutes()}</div>
      </div>
    );
  }

  private renderRoutes() {
    return (
      <Switch>
        <Route path="/signin" component={CSignInView} />
        <Route path="/signup" component={CSignUpView} />
        <CProtectedRoute
          path="/"
          render={props => {
            return <h1>Root</h1>;
          }}
        />
      </Switch>
    );
  }
}
