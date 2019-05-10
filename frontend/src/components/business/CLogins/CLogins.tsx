import * as React from "react";
import {
  CContent,
  CContentHeader
} from "src/components/layoutComponents/CContent/CContent";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { inject } from "src/utils/inject";
import { ModalStore } from "src/core/stores/ModalStore";
import { CLoginModal } from "src/components/business/modals/CLoginModal/CLoginModal";
import { LoginRepository } from "src/core/repositories/LoginRepository/loginRepository";
import { observer } from "mobx-react";

@observer
export class CLogins extends React.Component {
  @inject private modalStore: ModalStore;
  @inject private loginRepository: LoginRepository;
  render() {
    return (
      <CContent>
        <CContentHeader title={"Logins"}>
          {this.loginRepository.isLoading && (
            <IconButton color="inherit" onClick={this.handleAddLoginClick}>
              <AddIcon />
            </IconButton>
          )}
        </CContentHeader>
        {this.renderLogins()}
      </CContent>
    );
  }

  private handleAddLoginClick = () => {
    this.modalStore.open(<CLoginModal />);
  };

  private renderLogins() {
    return this.loginRepository.getList().map(login => {
      return <div>{login.id}</div>;
    });
  }
}
