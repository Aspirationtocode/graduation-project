import * as React from "react";
import {
  CContent,
  CContentHeader,
  CContentBody
} from "src/components/layoutComponents/CContent/CContent";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import { inject } from "src/utils/inject";
import { ModalStore } from "src/core/stores/ModalStore";
import { CLoginModal } from "src/components/business/modals/CLoginModal/CLoginModal";
import { LoginRepository } from "src/core/repositories/LoginRepository/loginRepository";
import { observer } from "mobx-react";
import { DecryptedLogin } from "server/src/models/login/types";
import Fab from "@material-ui/core/Fab";
import * as classNames from "classnames/bind";
import { CLogin } from "src/components/business/CLogin/CLogin";

const css = classNames.bind(require("./CLogins.styl"));

@observer
export class CLogins extends React.Component {
  @inject private modalStore: ModalStore;
  @inject private loginRepository: LoginRepository;
  render() {
    return (
      <CContent>
        <CContentHeader title={"User Logins"}>
          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={this.handleAddLoginClick}
          >
            <AddIcon />
          </Fab>
        </CContentHeader>
        <CContentBody>{this.renderLogins()}</CContentBody>
      </CContent>
    );
  }

  private handleAddLoginClick = () => {
    this.modalStore.open(<CLoginModal />);
  };

  private renderLogin(login: DecryptedLogin) {
    const { data } = login;
    return <CLogin data={data} key={login.id} />;
  }

  private renderLogins() {
    const renderedLogins = this.loginRepository.getList().map(login => {
      return this.renderLogin(login);
    });
    return <List className={css("list")}>{renderedLogins}</List>;
  }
}
