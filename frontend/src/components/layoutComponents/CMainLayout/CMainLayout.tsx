import * as React from "react";
import * as classNames from "classnames/bind";
import { Switch, Route, Redirect } from "react-router";
import { CProtectedRoute } from "src/containers/CRouter/components/CProtectedRoute";
import { CSignInView } from "src/views/CSignInView/CSignInView";
import { CHeader } from "src/components/business/CHeader/CHeader";
import { CSignUpView } from "src/views/CSignUpView/CSignUpView";
import { CLogins } from "src/components/business/CLogins/CLogins";
import { CModalDemonstrator } from "src/components/core/CModalDemonstrator/CModalDemonstrator";

const css = classNames.bind(require("./CMainLayout.styl"));

export class CMainLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.renderCoreComponents()}
        <div className={css("main-layout")}>
          <CHeader />

          <div className={css("main-layout__content")}>
            {this.renderRoutes()}
          </div>
        </div>
      </React.Fragment>
    );
  }

  private renderRoutes() {
    return (
      <Switch>
        <CProtectedRoute path="/logins" component={CLogins} />
        <Route path="/signin" component={CSignInView} />
        <Route path="/signup" component={CSignUpView} />
        <CProtectedRoute path="/" component={this.renderRedirect} />
      </Switch>
    );
  }

  private renderRedirect = () => {
    return <Redirect to="/logins" />;
  };

  private renderCoreComponents() {
    return (
      <React.Fragment>
        <CModalDemonstrator />
      </React.Fragment>
    );
  }
}
