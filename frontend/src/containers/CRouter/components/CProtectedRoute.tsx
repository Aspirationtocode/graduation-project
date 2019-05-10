import * as React from "react";
import { Route, Redirect } from "react-router";
import { observer } from "mobx-react";
import { inject } from "src/utils/inject";
import { AuthRepository } from "src/core/repositories/AuthRepository/authRepository";

@observer
export class CProtectedRoute extends Route {
  @inject private authRepository: AuthRepository;

  render() {
    const hasAuth = this.authRepository.hasAuth();

    if (!hasAuth) {
      return <Redirect to="/signin" />;
    }

    return super.render();
  }
}
