import * as React from "react";
import { createBrowserHistory, History } from "history";
import { Routing } from "src/routing/routing";
import { syncHistoryWithStore } from "mobx-react-router";
import { Router } from "react-router";
import { inject } from "modelsApi";
import { CMainLayout } from "src/layouts/CMainLayout/CMainLayout";

interface CRouterProps {}

export class CRouter extends React.Component<CRouterProps> {
  @inject private routing: Routing;
  private history: History;
  constructor(props: CRouterProps) {
    super(props);
    const browserHistory = createBrowserHistory();
    this.history = syncHistoryWithStore(browserHistory, this.routing);
  }

  render() {
    return (
      <Router history={this.history}>
        <CMainLayout />
      </Router>
    );
  }
}
