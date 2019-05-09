import * as React from "react";
import { observer } from "mobx-react";
import { inject } from "modelsApi";
import { AuthRepository } from "src/core/repositories/AuthRepository/authRepository";

@observer
export class CLeftPanel extends React.Component {
  @inject private authRepository: AuthRepository;
  render() {
    return (
      this.authRepository.profileUser &&
      this.authRepository.profileUser.fullName
    );
  }
}
